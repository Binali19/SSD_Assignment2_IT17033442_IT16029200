# SSD_Assignment2_IT17033442_IT16029200

# In order to build this web application, the machine needs to have npm package installed.

# As the first step, you have to clone or download the repository
# Then login to the Google API console via https://console.developers.google.com/ and create OAuth client credentials for the application
# Set the authorized redirect URI to http://localhost:3000/auth/google/callback
# Open the project
# Open the g-auth.js file inside the api folder in the project directory
# Replace the generated Client ID and Secret values with the previous Client ID and Secret values

---------------------------------------------------------------
There are two separated folders to build. 
1. Go inside api folder and open a command prompt and type
   npm install
   node server.js
   
2. Go inside ui folder and open a command prompt and type
    npm install
    npm run serve
----------------------------------------------------------------  

Open the browser and redirect to http://localhost:8080/
At the top right corner of the homepage click login button
Then click SIGN IN WITH GOOGLE button
Click your Google account
To access Google drive services confirm user consent
Then click uploader button to redirect to the upload item page
Browse an item to upload to Google drive
Finally click the upload button 
