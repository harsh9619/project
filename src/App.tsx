import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserSearch from './UserSearch';
import './styles.css';

export default function App() {
  return (
    <Provider store={store}>
      <main className="app">
        <h1>User Directory</h1>
        <UserSearch />
      </main>
    </Provider>
  );
}
