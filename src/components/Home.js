import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ name: '', balance: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/accounts.json'); // This path is correct if accounts.json is in public/
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccount = () => {
    if (newAccount.name && newAccount.balance) {
      const newId = accounts.length ? accounts[accounts.length - 1].id + 1 : 1;
      const accountToAdd = {
        id: newId,
        name: newAccount.name,
        balance: parseFloat(newAccount.balance),
      };
      setAccounts([...accounts, accountToAdd]);
      setNewAccount({ name: '', balance: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleManageAccount = (account) => {
    navigate('/manage-account', { state: { account } });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Bank Management</h2>
      <h3>Add New Account</h3>
      <input
        type="text"
        placeholder="Account Holder Name"
        value={newAccount.name}
        onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Initial Balance"
        value={newAccount.balance}
        onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
      />
      <button onClick={handleAddAccount}>Add Account</button>

      <h3>Accounts List</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Balance</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{account.balance.toFixed(2)}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleDeleteAccount(account.id)}>Delete</button>
                <button onClick={() => handleManageAccount(account)}>Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
