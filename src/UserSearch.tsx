import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchUsers, setSearchTerm } from './store/usersSlice';
import { useDebouncedValue } from './useDebouncedValue';
import { UserRow } from './UserRow';

const DEBOUNCE_MS = 300;

export default function UserSearch() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.users);

  const [inputValue, setInputValue] = useState('');
  const debouncedTerm = useDebouncedValue(inputValue, DEBOUNCE_MS);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedTerm));
  }, [debouncedTerm, dispatch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

 
  // not on every keystroke.
  const searchTerm = useAppSelector((state) => state.users.searchTerm);
  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;
    return items.filter((user) => user.name.toLowerCase().includes(term));
  }, [items, searchTerm]);

  return (
    <div className="user-search">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search users by name..."
        className="user-search__input"
        aria-label="Search users by name"
      />

      {status === 'loading' && <p className="user-search__status">Loading users…</p>}

      {status === 'failed' && (
        <p className="user-search__status user-search__status--error">
          Error: {error}
        </p>
      )}

      {status === 'succeeded' && (
        <>
          <p className="user-search__count">
            {filteredUsers.length} of {items.length} users
          </p>
          <ul className="user-search__list">
            {filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </ul>
          {filteredUsers.length === 0 && (
            <p className="user-search__status">No users match "{searchTerm}".</p>
          )}
        </>
      )}
    </div>
  );
}
