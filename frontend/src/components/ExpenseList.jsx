import API from "../services/api";

export default function ExpenseList({
  expenses,
  fetchExpenses,
  setEditingExpense,
}) {
  const handleDelete = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Expenses
      </h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">{expense.title}</h3>

              <p className="text-gray-500">
                {expense.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-blue-600">
                ₹{expense.amount}
              </span>

              <button
                onClick={() => setEditingExpense(expense)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(expense._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}