const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        trim: true, // Remove maxLength as it doesn’t apply to numbers
    },
    type: {
        type: String,
        default: 'expense',
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 200,  // Adjusted maxLength for description
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
