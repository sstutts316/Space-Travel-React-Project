// Importing the CSS module for styling the Home component
import styles from "./Home.module.css";

// Defining the Home functional component
function Home() {
  // Rendering the component content
  return (
    // React fragment to group multiple elements without adding extra nodes to the DOM
    <div>
      {/* Section for the main heading */}
      <section className={styles["section__container"]}>
        <h1>Space Travel: Expanding Horizons Beyond Earth</h1>
      </section>

      {/* Section for introducing the concept of futuristic space travel */}
      <section className={styles["section__container"]}>
        <h2>🌌 Journey into the Future</h2>
        <p>
          In a world where the impossible has become reality, where the stars
          are no longer out of reach, welcome to the future of humanity's
          survival and exploration. Witness the evolution of technology as it
          transforms barren planets into thriving havens, all made possible by
          the wonders of innovation and human determination.
        </p>
      </section>

      {/* Section discussing the transition from Earth's neglect to space innovation */}
      <section className={styles["section__container"]}>
        <h2>🌍 From Neglect to Innovation</h2>
        <p>
          Once the cradle of civilization, Earth now stands as a solemn reminder
          of the consequences of neglect and environmental decline. But fear
          not, for the ingenuity of mankind has soared to new heights. With our
          relentless pursuit of advancement, we have not only healed our scars
          but extended our reach across the cosmos.
        </p>
      </section>

      {/* Section about the space travel web application */}
      <section className={styles["section__container"]}>
        <h2>🚀 Enter Space Travel: Where Dreams Take Flight</h2>
        <p>
          Embark on an extraordinary journey with our groundbreaking web
          application, aptly named "Space Travel." As a commander engineer, the
          fate of humanity's exodus rests in your capable hands. Prepare to face
          the ultimate challenge: evacuating humankind from their birthplace and
          guiding them towards a future among the stars.
        </p>
      </section>

      {/* Section highlighting the role of the user in the space travel narrative */}
      <section className={styles["section__container"]}>
        <h2>🔧 Engineer, Explorer, Leader</h2>
        <p>
          Space Travel empowers you to engineer, design, and even dismantle
          spacecraft. Craft vessels that defy the boundaries of imagination,
          envisioning a future where life flourishes beyond the stars. But
          remember, your role extends beyond construction – you are a leader, an
          explorer, a commander steering humanity's destiny.
        </p>
      </section>

      {/* Section describing the exploration possibilities within the application */}
      <section className={styles["section__container"]}>
        <h2>🌠 A Universe of Possibilities Awaits</h2>
        <p>
          Immerse yourself in the thrill of exploration as you chart
          interplanetary courses within our solar system. Seamlessly navigate
          your fleet of spacecraft, hurtling through the cosmic void from one
          celestial body to another. The universe becomes your playground, and
          every planet a potential new home.
        </p>
      </section>
    </div>
  );
}

// Exporting the Home component for use in other parts of the application
export default Home;
