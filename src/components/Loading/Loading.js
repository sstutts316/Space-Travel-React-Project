// Importing useState and useEffect hooks from React
import { useState, useEffect } from "react";

// Importing CSS module for styling the Loading component
import styles from "./Loading.module.css";

// Defining the Loading functional component
function Loading() {
  // State to keep track of the dots displayed during loading
  const [dots, setDots] = useState([]);

  // useEffect hook to handle the logic of adding dots over time
  useEffect(() => {
    // Setting a timeout to add a dot every 200 milliseconds
    const timer = setTimeout(() => {
      // Condition to limit the number of dots to 5
      if (dots.length < 5) {
        // Updating the dots state by adding a new dot to the array
        setDots((prevDots) => [...prevDots, "."]);
      }
    }, 200);

    // Clearing the timeout when the component unmounts or dots array changes
    return () => clearTimeout(timer);
  }, [dots]); // Adding dots as a dependency, so the effect runs when dots state changes

  // Rendering the component
  return (
    // Container div with a class from the CSS module
    <div className={styles["loading"]}>
      {/* Static text indicating loading */}
      <span>Loading</span>
      {/* Mapping over the dots array to render each dot */}
      {dots.map((dot, index) => (
        // Rendering each dot with a unique key
        <span key={index}>{dot}</span>
      ))}
    </div>
  );
}

// Exporting the Loading component for use elsewhere in the application
export default Loading;
