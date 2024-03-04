// Importing NavLink from react-router-dom for navigation links
import { NavLink } from "react-router-dom";

// Importing CSS module for styling the NavigationBar component
import styles from "./NavigationBar.module.css";

// Defining the NavigationBar functional component
function NavigationBar() {
  // Array of route objects, each with a 'to' path and display 'text'
  const routes = [
    { to: "/", text: "🌎 Home" },
    { to: "/spacecrafts", text: "🚀 Spacecrafts" },
    { to: "/planets", text: "🪐 Planets" },
  ];

  // Rendering the component
  return (
    // Navigation container with a class from the CSS module
    <nav className={styles["navigation"]}>
      {/* Mapping over the routes array to render NavLink components for each route */}
      {routes.map((route, index) => (
        // NavLink component for routing with key, className, and to props
        <NavLink
          key={index} // Using index as key (consider using a more unique identifier if possible)
          className={({ isActive }) =>
            `${styles["navigation__item"]} ${
              isActive ? styles["navigation__item--active"] : ""
            }`
          } // Conditional class for active navigation item
          to={route.to} // Route path
        >
          {route.text} // Display text for the route
        </NavLink>
      ))}
    </nav>
  );
}

// Exporting the NavigationBar component for use elsewhere in the application
export default NavigationBar;
