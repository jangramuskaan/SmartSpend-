import { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom Validation
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than $0.');
      return;
    }

    setError(''); // Clear errors
    addExpense({ title, amount: parseFloat(amount), category, date: new Date().toISOString() });
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="card expense-form">
      <div className="form-header">
        <h3>Add New Expense</h3>
        <p className="subtitle">Track a new transaction</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      <div className="input-group">
        <label>Title</label>
        <input type="text" placeholder="e.g. Groceries" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="input-group">
        <label>Amount ($)</label>
        <input type="number" step="0.01" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>

      <div className="input-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food & Dining</option>
          <option value="Transport">Transportation</option>
          <option value="Utilities">Bills & Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <button type="submit" className="btn primary-btn full-width">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;