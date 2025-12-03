const XLSX = require('xlsx');
const Income = require('../models/income');


console.log('>>> require("xlsx") returned type:', typeof XLSX);
console.log('>>> XLSX keys (first 20):', Object.keys(XLSX || {}).slice(0, 20));
console.log('>>> XLSX.utils exists?', !!(XLSX && XLSX.utils));
console.log('>>> typeof XLSX.utils.book_new:', XLSX && XLSX.utils && typeof XLSX.utils.book_new);

// add Income
exports.addIncome = async (req, res) => {
    const userId=req.user.id;
    try{
        const {icon,source,amount,date}=req.body;

        //validation check for missimg fileds
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
         await newIncome.save();

        res.status(200).json(newIncome);
        
    }catch (error){
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}


// get all Income
exports.getAllIncome = async (req, res) => {

        try {
        const income = await Income.find({ userId: req.user.id }).sort({ date: -1 }); // newest first

        res.status(200).json(income);
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            message: "Server error"
        });
    }

};


// delete Income
exports.deleteIncome = async (req, res) => {
    
    //  const userId= req.user.id;
     try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({message:"Income deleted successfully"});
     }catch(error){
        res.status(500).json({meassage: "Server Error"})
     }
};



// download excel
exports.downloadIncomeExcel = async (req, res) => {
  try {
    // 1) fetch incomes (adapt query as needed)
    const result = await Income.find({ userId: req.user.id }).sort({ date: -1 }).lean();

    // 2) prepare data for sheet (format date to readable string)
    const data = (result || []).map((item) => ({
      Source: item.source || '',
      Amount: typeof item.amount === 'number' ? item.amount : Number(item.amount) || 0,
      Date: item.date ? new Date(item.date).toLocaleDateString() : '',
      Notes: item.notes || ''
    }));

    // 3) defensive check
    if (!XLSX || !XLSX.utils || typeof XLSX.utils.book_new !== 'function') {
      console.error('XLSX utils not available:', XLSX && Object.keys(XLSX));
      return res.status(500).json({ message: 'Excel library not loaded correctly' });
    }

    // 4) create workbook & worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Optional: set column widths / header order (if needed)
    // const wscols = [{ wch: 20 }, { wch: 12 }, { wch: 15 }, { wch: 30 }];
    // ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, 'Income');

    // 5) write to buffer (in-memory) and send as download
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename="Income_details.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('downloadIncomeExcel error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
