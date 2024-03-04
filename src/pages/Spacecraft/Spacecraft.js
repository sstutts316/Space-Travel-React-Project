// Importing necessary hooks and components from React, React Router, and local files
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// Importing CSS module for styling
import styles from "./Spacecraft.module.css";
// Importing context to handle loading state
import { LoadingContext } from "../../context/LoadingProvider";
// Importing API service for fetching spacecraft data
import SpaceTravelApi from "../../services/SpaceTravelApi";

// Defining the Spacecraft functional component
function Spacecraft() {
  // State hook to store spacecraft data
  const [spacecraft, setSpacecraft] = useState();
  // Hook to extract the 'id' parameter from the URL
  const { id } = useParams();
  // Context hook to use loading functions from the LoadingContext
  const { enableLoading, disableLoading } = useContext(LoadingContext);

  // Effect hook to fetch spacecraft data when the component mounts or dependencies change
  useEffect(
    () => {
      // Defining an async function to fetch spacecraft data by ID
      async function getSpacecraft() {
        // Enabling the loading state
        enableLoading();
        // Destructuring the response from the API call to get spacecraft data and error flag
        const { data: spacecraft, isError } =
          await SpaceTravelApi.getSpacecraftById({ id });
        // Setting the spacecraft state if no error occurred
        if (!isError) {
          setSpacecraft(spacecraft);
        }
        // Disabling the loading state
        disableLoading();
      }

      // Calling the async function to fetch data
      getSpacecraft();
    },
    // Specifying dependencies for the useEffect hook
    [enableLoading, disableLoading]
  );

  // Rendering the component UI
  return (
    // Conditional rendering: Only render if 'spacecraft' state is defined
    spacecraft && (
      <div className={styles["spacecraft"]}>
        {/* Container for the spacecraft image */}
        <div className={styles["spacecraft__imageContainer"]}>
          {/* Conditional rendering of spacecraft image or default emoji */}
          {spacecraft.pictureUrl ? (
            <img
              src={spacecraft.pictureUrl}
              alt={`The spacecraft ${spacecraft.name}`}
              className={styles["spacecraft__image"]}
            />
          ) : (
            <span className={styles["spacecraft__image--default"]}>🚀</span>
          )}
        </div>

        {/* Container for spacecraft information */}
        <div className={styles["spacecraft__infoContainer"]}>
          <div className={styles["spacecraft__info"]}>
            {/* Displaying spacecraft name */}
            <div className={styles["spacecraft__infoHeader"]}>
              Name: {spacecraft.name}
            </div>

            {/* Displaying spacecraft capacity */}
            <div className={styles["spacecraft__infoHeader"]}>
              Capacity: {spacecraft.capacity}
            </div>
          </div>

          <div className={styles["spacecraft__info"]}>
            {/* Displaying spacecraft description */}
            <div className={styles["spacecraft__infoHeader"]}>Description:</div>
            <div className={styles["spacecraft__infoText"]}>
              {spacecraft.description}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

// Exporting the Spacecraft component for use in other parts of the application
export default Spacecraft;
