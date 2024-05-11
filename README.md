# Getting Started with Screen time application

First clone this repository before running application make sure you have node.js installed 

## Running the application 

To Run backend go to cd windowChecker

### `npm install`
### `npm run start-server`
### `npm run start-recording`

To Run front-end 

cd screen_time_app

### `npm install`
### `npm start`



Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### Features of this application

Mainly this application focus on screen time and you can see your most used apps and a report based on your usage.

You will get notifications once you reach any application more than 2hrs of limit.



## Process of this application

Let the backend run and you can use whatever applications you want and it will capture the screen time of the applications

## Limitations of this application

This application captures screen time for every minute and if you are on the same application it keeps on counting time so to see your screen time you need to switch the application and wait for the backend to capture that the application is changed and then you can view in webpage.

### OPenAI integration

This application is integrated with openAI to get personalized suggestions based on your screen time and the apps you use but to make it work you need to have an OpenAI api key I am not linking my API key in this project but you can get the API key I will be providing the resouces to do that.

Follow the below source to get OpenAI API Key.

Source: https://medium.com/gopenai/creating-chatbot-with-express-js-react-js-and-openai-api-fff4e260dc7e



### Tech stack used

## React JS
## Node.js for backend
## WebSockets for notifications
## Tailwind and Antd for UI
