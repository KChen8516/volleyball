import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Pass initial state function to useState so logic is only executed once
  const [ storedValue, setStoredValue ] = useState(() => {
    try {
      // Get the item from localStorage via key
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return the initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      // If there's an error still return initialValue
      return initialValue;
    }
  });

  // Return a closed over reference of setStoredValue that
  // persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function to mirror useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save the state
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [ storedValue, setValue ];
};

/**
 * Example
 * 
 * const [ name, setName ] = useLocalStorage('name', 'Bob');
 */
