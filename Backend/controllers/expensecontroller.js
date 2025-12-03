const XLSX= require('xlsx');
const Expense = require('../models/expense');



// add expense
exports.addExpense = async (req, res) => {
    const userId=req.user.id;
    try{
        const {icon,category,amount,date}=req.body;

        //validation check for missimg fileds
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
         await newExpense.save();

        res.status(200).json(newExpense);
        
    }catch (error){
        res.status(500).json({message:"Server Error"})
    }
}


// get all get Expense
exports.getAllExpense= async (req, res) => {

        try {
        const expense = await Expense.find({ userId: req.user.id }).sort({ date: -1 }); // newest first

        res.status(200).json(expense);
        
    } catch (error) {
               console.log(error)

        res.status(500).json({
            message: "Server error"
        });
    }

};


// delete Expense
exports.deleteExpense = async (req, res) => {
    
    //  const userId= req.user.id;
     try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense deleted successfully"});
     }catch(error){
        res.status(500).json({meassage: "Server Error"})
     }
};


// dwonoload excel
exports.downloadExpenseExcel = async (req, res) => {
  try {
    // 1) fetch user id from request (adjust according to your auth middleware)
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    // 2) fetch expenses for the logged-in user
    const expenses = await Expense.find({ userId }).sort({ date: -1 }).lean();

    // 3) prepare array for the sheet (format date string)
    const data = (expenses || []).map(item => ({
      Category: item.category || '',
      Amount: typeof item.amount === 'number' ? item.amount : Number(item.amount) || 0,
      Date: item.date ? new Date(item.date).toLocaleDateString() : '',
      Notes: item.notes || ''
    }));

    // 4) defensive check for XLSX utils
    if (!XLSX || !XLSX.utils || typeof XLSX.utils.book_new !== 'function') {
      console.error('XLSX utils unavailable:', XLSX && Object.keys(XLSX || {}).slice(0,50));
      return res.status(500).json({ message: 'Excel library not loaded' });
    }

    // 5) create workbook & worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Optional: set column widths for nicer output
    ws['!cols'] = [{ wch: 20 }, { wch: 12 }, { wch: 15 }, { wch: 30 }];

    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');

    // 6) write workbook to an in-memory buffer and send as attachment
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename="Expense_details.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('downloadExpenseExcel error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};