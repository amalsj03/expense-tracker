const express=require('express');
const { protect } = require("../middleware/authmiddleware");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel

}= require("../controllers/incomecontroller");


const router = express.Router();

// Define routes
router.post('/add',protect, addIncome);
router.get('/get',protect, getAllIncome);
router.delete('/:id',protect, deleteIncome);
router.get('/downloadexcel',protect, downloadIncomeExcel);

module.exports = router;