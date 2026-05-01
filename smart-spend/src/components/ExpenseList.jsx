import { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ExpenseForm from './ExpenseForm';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Debounce Logic: Wait 300ms after the user stops typing before filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredAndSortedExpenses = expenses
    .filter(exp => exp.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'highest') return b.amount - a.amount;
      if (sortOrder === 'lowest') return a.amount - b.amount;
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="page-container list-layout">
      <div className="sidebar">
        <ExpenseForm />
      </div>
      
      <div className="expense-list-container">
        <div className="card controls-card">
          <input 
            type="text" 
            placeholder="🔍 Search expenses..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
          />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
            <option value="newest">Newest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>
        </div>

        <div className="expenses-wrapper">
          {filteredAndSortedExpenses.length === 0 ? (
            <div className="empty-state">No expenses found.</div>
          ) : (
            filteredAndSortedExpenses.map(exp => (
              <div key={exp.id} className="card expense-card">
                <div className="expense-details">
                  <div className="expense-icon">
                    {exp.category === 'Food' ? '🍔' : exp.category === 'Transport' ? '🚗' : exp.category === 'Utilities' ? '💡' : '📦'}
                  </div>
                  <div>
                    <h4>{exp.title}</h4>
                    <span className="badge">{exp.category}</span>
                  </div>
                </div>
                <div className="expense-actions">
                  <span className="amount">${exp.amount.toFixed(2)}</span>
                  <button onClick={() => deleteExpense(exp.id)} className="btn delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;