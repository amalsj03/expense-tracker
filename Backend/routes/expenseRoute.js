const express=require('express');
const { protect } = require("../middleware/authmiddleware");
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel

}= require("../controllers/expensecontroller");


const router = express.Router();

// Define routes
router.post('/add',protect, addExpense);
router.get('/get',protect, getAllExpense);
router.delete('/:id',protect, deleteExpense);
router.get('/downloadexcel',protect, downloadExpenseExcel);

module.exports = router;