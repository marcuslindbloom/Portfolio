# Code of the Developer: The Marcus Chronicles

A simple 2D game built with Kaboom.js that takes you on a journey through the world of Marcus, a developer with a passion for coding and creativity.

## Installation

To get started, follow these steps:

1. **Clone the Repository**:
    ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```

2. **Install Dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:
   ```bash
   npm install
   ```
## Running the App

To run the app locally, use the following command:
```bash
npm run dev
```

This will start a development server and open the game in your default web browser. Any changes you make will automatically refresh the game.

## Adding a New Scene

To add a new scene to the game, follow these steps:

### 1. Create the Scene in Tiled
- Open [Tiled](https://www.mapeditor.org/) and create a new map.
- Set the map's tile size to **16x16 pixels**.
- Use the **exits** layer to define exit points in the scene.
- For each exit, add a custom property called `target` with the value being the name of the target scene (e.g., `garden` or `house`).

### 2. Export the Map and Image
- Export the map as a `.json` file to the `public` folder of the project.
- Export the image of the map (without the object layers) as a `.png` file to the `public` folder.

### 3. Create the Scene in the Code
- Go to the `/src/scenes` folder and create a new scene file based on the `gardenScene.ts` or `houseScene.ts`.
- Modify the new scene file to load the `.json` and `.png` files you exported.

### 4. Update the Constants
- In the `/src/constants.ts` file, add your new scene name to the `SCENES` constant.

### 5. Update the SceneManager
- In the `sceneManager.ts` file, update the `sceneConfig` method to include your new scene in the `switch` statement, ensuring it matches the name you added to the `SCENES` constant.

## Additional Information

- **Dependencies**: This project relies on Kaboom.js, a fun and easy-to-use game programming library.
- **Code Style**: Follow the existing code structure and naming conventions to maintain consistency across the project.
- **Contributions**: Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository and create a pull request.
- **Contact**: For any questions or issues, please open an issue on the GitHub repository or contact me at marcus.lindblom@me.com.

## Troubleshooting

If you encounter any issues:

- Ensure all dependencies are installed correctly.
- Check the browser console for errors and ensure the map and image files are correctly placed in the `public` folder.
- Verify the scene configuration in `sceneManager.ts` and that the scene name matches in the `SCENES` constant.

---

Thank you for playing "Code of the Developer: The Marcus Chronicles"! Enjoy the journey through my coding world.
