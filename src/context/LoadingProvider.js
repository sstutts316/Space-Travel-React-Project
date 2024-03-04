// Importing necessary hooks from React to create context and manage state
import { createContext, useState, useCallback } from "react";

// Initial loading state object, with isLoading flag and placeholder functions
const INITIAL_LOADING = {
  isLoading: false,
  enableLoading: function () {}, // Placeholder function for enabling loading
  disableLoading: function () {}, // Placeholder function for disabling loading
};

// Creating a context for loading state, initialized with INITIAL_LOADING
export const LoadingContext = createContext(INITIAL_LOADING);

// Defining the LoadingProvider component, which provides loading state and functions to its children
function LoadingProvider({ children }) {
  // State hook to manage the loading flag
  const [isLoading, setIsLoading] = useState(INITIAL_LOADING.isLoading);

  // useCallback hook to memoize the function for enabling loading, preventing unnecessary re-creations
  const enableLoading = useCallback(() => {
    setIsLoading(true); // Setting isLoading state to true
  }, []); // Empty dependency array means this callback never changes

  // useCallback hook to memoize the function for disabling loading
  const disableLoading = useCallback(() => {
    setIsLoading(false); // Setting isLoading state to false
  }, []); // Empty dependency array means this callback never changes

  // Rendering the LoadingContext.Provider, passing down the loading state and control functions to children
  return (
    <LoadingContext.Provider
      value={{ isLoading, enableLoading, disableLoading }}
    >
      {children} // Rendering child components, which can now access the loading
      context
    </LoadingContext.Provider>
  );
}

// Exporting LoadingProvider for use in wrapping the application or components that need access to loading state
export default LoadingProvider;
