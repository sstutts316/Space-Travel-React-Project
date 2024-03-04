# Space Travel : React Project

Welcome to the React Space Travel project! If you are looking for a fun way to apply your newfound React Skills and build something interesting, this is just the thing for you. Let's get started, and learn a little more about what you have to do!

# Overview

In the not-so-distant future, where technology has evolved by leaps and bounds, humanity has achieved the unimaginable: they have successfully transformed other planets in the solar system into habitable environments. Once the cradle of humanity, Earth had become a shadow of its former self due to centuries of neglect and environmental degradation. As a result, the focus of humankind had shifted beyond Earth's boundaries, and the key to their interplanetary exploration lay in a cutting-edge web application called "Space Travel."

The web application's users are commanders who will use it to evacuate humankind from the Earth. Our ingenious web application is planned to enable users to list all spacecraft, view the details of a spacecraft, build a new one, and destroy the old one. But the capabilities of it continue beyond that as well; it is planned to enable users to view planets with the spacecraft on it and send spacecraft from one planet to another to transfer people.

We have added everything you will need to complete the project, below, in the format of a typical software development life cycle, involving analysis, design, implementation and testing. This will give you an insight into how things work IRL!

# Analysis

## API

For this project, you will find a mock API in the starter code that stores the data in the local storage.

<aside>
💡 Hint: You can clear the local storage to start from scratch.

</aside>

## Data Structures

Below are a list of components and their data structures that you will be using for this project; make sure you have read through and understood all of these before starting. 

### Response

```jsx
{
  isError: <boolean>,
  data: <any>
}
```

### Planet

```
{
  id: <int>, // means data type is an integer
  name: <string>,
  currentPopulation: <int>,
  pictureUrl: [<string>] // means optional
}
```

### Spacecraft

```
{
  id: <string>,
  name: <string>,
  capacity: <int>,
  description: <string>,
  pictureUrl: [<string>],
  currentLocation: <int>
}
```

## Methods

The following are methods you will be using throughout the project. The table below specifies what each method will be used for.

| getPlanets | getPlanets (): Array<planet> | Fetches all planets. |
| --- | --- | --- |
| getSpacecrafts | getSpacecrafts (): Array<spacecraft> | Fetches all spacecraft. |
| getSpacecraftById | getSpacecraftById ({id: <string>}): <spacecraft> | Fetches a spacecraft by its ID. |
| buildSpacecraft

 | createSpacecraft ({name: <string>, capacity: <int>, description <string>, pictureUrl: [<string>]}): void // means pictureUrl is optional | Builds a spacecraft on the Earth by generating an ID. |
| destroySpacecraftById | destroySpacecraftById ({id: <int>}): void | Deletes a spacecraft by its ID. |
| sendSpacecraftToPlanet

 | sendSpacecraftToPlanet ({spacecraftId: <string>, targetPlanetId: <int>}): void | Transfers people by sending the spacecraft from its currently located planet to the target planet.
• If the capacity is greater than the current population of the currently located planet, it fills as much as it gets.
• Throws an error if the target planet is the same as the currently located planet. |

# Design

## Pages

You have to build a total of 5 pages, all of which are listed below with their purposes. You will also find screenshots of an actual functional mockup of the project!

**Home**

- Displays general information about the application.

![Home.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d325654b-dfcb-45df-8d67-ec517d4aa4e7/Home.png)

**Spacecrafts** (Not to be confused with “Spacecraft”, which is a separate page)

- Lists all spacecraft.
- Enable users to navigate to view the details of a spacecraft on a new page.
- Enable users to navigate to build a new spacecraft on a new page.
- Enable users to destroy an old spacecraft.

![Spacecrafts.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13737537-37be-471c-a732-4c1fe3811b08/Spacecrafts.png)

**Spacecraft**

- Displays the information about the related spacecraft.

![Spacecraft.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c8170e6f-ab4c-49fb-b8be-23c34f045e64/Spacecraft.png)

**Build a Spacecraft**

- Enable users to go back to the previous page.
- Enable users to build a new spacecraft.
- Displays error for the required fields (name, capacity, description).

![SpacecraftBuild.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/819319a6-a0fe-4703-b5bd-7388da7e6f16/SpacecraftBuild.png)

The below page displays the error messages

![SpacecraftBuildError.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/49d01e70-d8d1-4296-b8f7-a113c6c80523/SpacecraftBuildError.png)

**Planets**

- Lists all planets with all spacecraft on it.
- Enable users to select a planet to send a spacecraft.
    - The planet should be selected first before the spacecraft.
- Enable users to select a spacecraft to be sent to a planet.
    - The selected planet should be different than the planet on which the spacecraft is currently located.

![Planets.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f9eba656-79f3-453a-b957-a46f74b7a9a4/Planets.png)

Aside from the above, the below is how the loading page is expected to look.

![Loading.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0f3e4cda-8b0a-4407-a41b-5600b4bbde3f/Loading.png)

## Layout

Based on the above designs, the layout should have 3 main sections, all wrapped with a loading component.

- **Header:** Displays the navigation items.
- **Footer:** Displays the motto.
- **Main:** Renders the navigated page.

## Flow and Components

Read to understand more about the flow and the components that are reflected in the above designs. Also treat this as a checklist of things you have to do.

- The entry point (`index.js`), which renders the App component, should be wrapped with a loading provider. The loading provider creates a context for loading.
- The App component should be responsible for the layout and routing. Therefore, for the sake of the layout, in the header, it should render the NavigationBar component, which has the navigation links (from React Router); in the footer, it should render the Motto component; and in between, it should render the AppRoute component which renders the routes (using React Router). Last, it should also render the loading component based on its condition.

```jsx
BrowserRouter (Router)
	header
		NavigationBar (Component)
	main
		AppRoute (Component)
	footer
		Motto (Component)

Loading (Component)
```

- The routes are indicated in the AppRoute component. Each route renders a page designed previously which should also be a component. The path-page matches are identified below.

```jsx
/ -> Home (Component)
/spacecrafts -> Spacecrafts (Component)
/spacecraft/build -> SpacecraftBuild (Component)
/spacecraft/:id -> Spacecraft (Component)
/planets -> Planets (Component)
```

- All non-matching routes should be redirected to "/".

<aside>
💡 **Note: Components could be differently designed due to the design decision. Some could be divided more and put into smaller components. You should know that design decisions are based on the use case, and no single correct design exists.**

</aside>

### Demo

Click on the play button to view a working demo of the above described steps!

[Demo.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/80836d1e-6f43-4dba-b95d-c70693605f10/Demo.mp4)

# Implementation

## Folder Structure

Please adhere to the following folder structure to ensure that the best practices are applied by you. 

| components | Contains components that are used as building blocks for pages. |
| --- | --- |
| context | Contains providers which enable consuming components to subscribe to context changes. |
| pages | Contains components that are used as a page. Pages are the components used to be rendered by a route. |
| routes | Contains components that have route rendering logic. |
| services | Contains services to reach external APIs. |

## Starter Code

[space-travel-starter-code-guided.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2236411c-a5c3-4f9d-b524-029f09807b8d/space-travel-starter-code-guided.zip)

[space-travel-starter-code-from-scratch.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6514f5ba-e980-4347-9d8a-abc1d22b0f6d/space-travel-starter-code-from-scratch.zip)

<aside>
💡 There are 2 different starter code options, the guided one and the from-scratch one. If you choose to proceed with the guided one, in order to complete this project, your mission is to follow the todos in the starter code to create the web application's front-end. However, if you choose the from-scratch one, your mission is to implement the entire front-end code from scratch.

</aside>

Please keep the following things in mind:

- You shouldn't touch the `/services/SpaceTravelMockApi.js` file, which mimics the back-end. Instead, you should use `/services/SpaceTravelApi.js`, which uses the API. In real life, you should create such a file that uses the `axios` library to use an API.
- In this project, we are using CSS modules (`<Component>.module.css`) that only apply to the component it belongs. It is a React best practice, and we should suggest you learn this approach. It is demonstrated in the App component. We are also using the BEM methodology in class names. If you want to learn more, please take a look at it.
