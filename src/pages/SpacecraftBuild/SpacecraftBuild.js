// Importing necessary React hooks and utilities
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Importing CSS module for styling
import styles from "./SpacecraftBuild.module.css";
// Importing the LoadingContext for managing loading states
import { LoadingContext } from "../../context/LoadingProvider";
// Importing API service for spacecraft operations
import SpaceTravelApi from "../../services/SpaceTravelApi";

function SpacecraftBuild() {
  // Initial state for a new spacecraft object
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: "",
  };

  // State hooks for spacecraft data, form errors, and navigation
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  // useContext hook to access loading state and functions from LoadingContext
  const { enableLoading, disableLoading } = useContext(LoadingContext);

  // Function to handle changes in form inputs, updating the spacecraft state
  function handleChangeOfFormInput(event) {
    const { name, value } = event.target;
    setSpacecraft((prevSpacecraft) => ({
      ...prevSpacecraft,
      [name]: value,
    }));
  }

  // Function to handle the form submission, validating input and calling the API to create a spacecraft
  async function handleSubmitOfForm(event) {
    event.preventDefault();

    let { name, capacity, description, pictureUrl } = spacecraft;

    let isFormError = false;
    setErrors([]);

    // Validating form inputs and updating errors state as needed
    if (name.length === 0) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Name is required!"]);
    }

    if (!capacity) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Capacity is required!"]);
    }

    capacity = Number(capacity);
    if (!Number.isInteger(capacity)) {
      isFormError = true;
      setErrors((prevErrors) => [
        ...prevErrors,
        "Capacity should be an integer number!",
      ]);
    }

    if (!description) {
      isFormError = true;
      setErrors((prevErrors) => [...prevErrors, "Description is required!"]);
    }

    // If there are no form errors, proceed with API call to create the spacecraft
    if (!isFormError) {
      enableLoading();
      const { isError } = await SpaceTravelApi.buildSpacecraft({
        name,
        capacity,
        description,
        pictureUrl,
      });
      if (!isError) {
        setSpacecraft(INITIAL_SPACECRAFT); // Resetting the form on successful creation
      }
      disableLoading();
    }
  }

  // Function to navigate back to the previous page
  function handleClickOfBack(event) {
    navigate(-1);
  }

  // Rendering the component
  return (
    <>
      <button className={styles["button__back"]} onClick={handleClickOfBack}>
        Back 👈
      </button>
      <div>
        <form onSubmit={handleSubmitOfForm}>
          <div className={styles["form"]}>
            {/* Form inputs for spacecraft details */}
            <div className={styles["form__inputs"]}>
              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={spacecraft.name}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacity"
                  value={spacecraft.capacity}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={spacecraft.description}
                  onChange={handleChangeOfFormInput}
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="pictureUrl"
                  placeholder="Picture URL"
                  value={spacecraft.pictureUrl}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Submit button and error messages display */}
            <div className={styles["submitContainer"]}>
              <div className={styles["errorContainer"]}>
                {errors.map((error, index) => (
                  <div key={index} className={styles["error"]}>
                    {error}
                  </div>
                ))}
              </div>

              <div className={styles["button__submit"]}>
                <button type="submit" onClick={handleSubmitOfForm}>
                  Build 🏗️
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

// Exporting the component for use in other parts of the application
export default SpacecraftBuild;
