import { useState, useEffect } from "react";
import API from "../services/api";

export default function ExpenseForm({
  fetchExpenses,
  editingExpense,
  setEditingExpense,
}) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  // Fill the form when editing an expense
  useEffect(() => {
    if (editingExpense) {
      setExpense({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        // Update existing expense
        await API.put(`/expenses/${editingExpense._id}`, expense);
        alert("Expense Updated Successfully!");
      } else {
        // Add new expense
        await API.post("/expenses", expense);
        alert("Expense Added Successfully!");
      }

      fetchExpenses();

      // Clear the form
      setExpense({
        title: "",
        amount: "",
        category: "",
      });

      // Exit edit mode
      setEditingExpense(null);

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Expense Name"
        value={expense.title}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={expense.amount}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={expense.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}