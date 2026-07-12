import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import API from "../services/api";

export default function Home() {
  const [expenses, setExpenses] = useState([]);

  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
       <ExpenseForm
         fetchExpenses={fetchExpenses}
         editingExpense={editingExpense}
         setEditingExpense={setEditingExpense}
        />

        <div className="bg-blue-600 text-white rounded-lg shadow p-6 mt-6">
  <h2 className="text-xl font-semibold">
    Total Expenses
  </h2>

  <p className="text-3xl font-bold mt-2">
    ₹
    {expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0
    )}
  </p>
</div>

       <ExpenseList
        expenses={expenses}
        fetchExpenses={fetchExpenses}
        setEditingExpense={setEditingExpense}
        />
      </div>
    </div>
  );
}