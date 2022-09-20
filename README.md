<!-- @format -->

# **limehome**

Expo SDK version: **46.0.9**

To run this project open cli on your computer and type npm install to install the dependencies. After the installation is complete run expo start to start the project in development. Open up expo on your device or emulator and open expo-go to open the application.

npm start Runs your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the --reset-cache flag to the start script:

npm start --reset-cache

# or

yarn start --reset-cache

Once you open up the application it will open up google maps (Berlin) the specified latitude and longitude, there we are calling the API to get the listings for the application.

# NOTE

Missing is the price value for listings so we added 80 as a default value

Clicking the item will bring up a view with short details of the choosen listing, and clicking the listing will open up a modal with more details about the listing choosed.

