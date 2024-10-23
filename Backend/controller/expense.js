const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    // Create a new Expense instance using 'new'
    const Expense = new ExpenseSchema({
        title,
        amount: Number(amount),  // Ensure amount is converted to a number
        category,
        description,
        date
    });

    try {
        // Validation checks
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        // Save the Expense to the database
        await Expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Error in adding expense', error: error.message });
    }

    console.log(Expense);
};

exports.getExpense = async (req,res) => {
    try {
        const Expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(Expenses)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}

exports.deleteExpense = async (req,res) => {
    const {id} = req.params;
    //console.log(req.params)
    ExpenseSchema.findByIdAndDelete(id)
    .then((Expense) => {
        res.status(200).json({message:'Expense Deleted'})
    })
    .catch((err)=>{
        res.status(500).json({message:'Expense Error'})
    })
}
