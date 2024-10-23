const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    console.log(req.body);  // Log incoming request data for debugging

    // Create a new income instance
    const income = new IncomeSchema({
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

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        // Save the income to the database
        await income.save();
        res.status(200).json({ message: 'Income added successfully', income });
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
