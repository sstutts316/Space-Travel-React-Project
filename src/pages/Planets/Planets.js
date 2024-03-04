// Importing React hooks and CSS module for styling
import { useState, useEffect, useContext } from "react";
import styles from "./Planets.module.css";

// Importing the LoadingContext for managing loading states and SpaceTravelApi for data fetching
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Planets() {
  // State hooks for storing planets with spacecrafts, and for tracking selected planet and spacecraft IDs
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  // useContext hook to access loading state and functions from LoadingContext
  const { isLoading, enableLoading, disableLoading } =
    useContext(LoadingContext);

  // Function to fetch planets and their associated spacecrafts from the API
  async function getPlanetsWithSpacecrafts() {
    // Fetching planets and spacecrafts data from the API
    const { data: planets, isError: isErrorPlanets } =
      await SpaceTravelApi.getPlanets();
    const { data: spacecrafts, isError: isErrorSpacecrafts } =
      await SpaceTravelApi.getSpacecrafts();

    // Checking for no errors in the fetched data
    if (!isErrorPlanets && !isErrorSpacecrafts) {
      // Associating spacecrafts with their current planet based on location
      for (const planet of planets) {
        planet.spacecrafts = [];

        for (const spacecraft of spacecrafts) {
          if (planet.id === spacecraft.currentLocation) {
            planet.spacecrafts.push(spacecraft);
          }
        }
      }

      // Updating the state with the fetched and processed planets data
      setPlanetsWithSpacecrafts(planets);
    }
  }

  // useEffect hook to fetch planets and spacecrafts data when the component mounts
  useEffect(() => {
    async function runGetPlanetsWithSpacecrafts() {
      enableLoading(); // Enabling loading state
      await getPlanetsWithSpacecrafts(); // Fetching data
      disableLoading(); // Disabling loading state
    }

    runGetPlanetsWithSpacecrafts();
  }, [enableLoading, disableLoading]); // Dependency array includes loading state functions

  // Function to handle click events on planets, setting the selected planet ID
  function handleClickOfPlanet(event, id) {
    if (!isLoading) {
      setSelectedPlanetId(id);
    }
  }

  // Function to handle click events on spacecrafts, potentially sending a spacecraft to a selected planet
  async function handleClickOfSpacecraft(event, spacecraftId, planetId) {
    if (
      !isLoading &&
      Number.isInteger(selectedPlanetId) &&
      selectedPlanetId !== planetId
    ) {
      setSelectedSpacecraftId(spacecraftId);
      enableLoading();

      const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId: selectedPlanetId,
      });
      if (!isError) {
        await getPlanetsWithSpacecrafts(); // Refreshing the planets data after a successful operation
        setSelectedPlanetId(null); // Resetting the selected planet and spacecraft IDs
        setSelectedSpacecraftId(null);
      }

      disableLoading();
    }
  }

  // Rendering the component
  return (
    <section>
      {planetsWithSpacecrafts.map((planet, index) => (
        <div key={index} className={styles["planetWithSpacecrafts"]}>
          {/* Rendering each planet with its associated spacecrafts */}
          <div
            className={`${styles["planet"]} ${
              selectedPlanetId === planet.id && styles["planet--selected"]
            }`}
            onClick={(event) => handleClickOfPlanet(event, planet.id)}
          >
            {/* Planet image and information */}
            <div className={styles["planet__imageContainer"]}>
              <img
                src={planet.pictureUrl}
                alt={`The planet ${planet.name}`}
                className={styles["planet__image"]}
              />
            </div>
            <div className={styles["planet__info"]}>
              <div>{planet.name}</div>
              <div>{planet.currentPopulation}</div>
            </div>
          </div>

          {/* Container for spacecrafts associated with the planet */}
          <div className={styles["planet__spacecrafts"]}>
            {planet.spacecrafts.map((spacecraft, index) => (
              <div
                key={index}
                className={`${styles["planet__spacecraft"]} ${
                  selectedSpacecraftId === spacecraft.id &&
                  styles["planet__spacecraft--selected"]
                }`}
                onClick={(event) =>
                  handleClickOfSpacecraft(event, spacecraft.id, planet.id)
                }
              >
                {/* Spacecraft image and information */}
                <div className={styles["planet__spacecraft__imageContainer"]}>
                  {spacecraft.pictureUrl ? (
                    <img
                      src={spacecraft.pictureUrl}
                      alt={`The spacecraft ${spacecraft.name}`}
                      className={styles["planet__spacecraft__image"]}
                    />
                  ) : (
                    <span
                      className={styles["planet__spacecraft__image--default"]}
                    >
                      🚀
                    </span>
                  )}
                </div>
                <div className={styles["planet__spacecraft__info"]}>
                  <div>{spacecraft.name}</div>
                  <div>{spacecraft.capacity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// Exporting the Planets component for use in other parts of the application
export default Planets;
