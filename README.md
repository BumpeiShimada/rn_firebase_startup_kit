## Purpose

This is a start-up kit for a Firebase web project, which uses React Native, Material-UI and TypeScript.   
You only need **15 minutes** to start up!

After finishing an instruction below, you'll see an app which has:
- Header and bottom tabs with page navigations
- Routing function by react-navigation
- Register/Login function by Firebase
- Global user login state implemented with Hooks and Context API
- Form & its validations with Formik and Yup
- Global alert function with snackbar: https://material.io/components/snackbars#usage

## Screen Shots

### Routing
![routing](https://raw.githubusercontent.com/wiki/BumpeiShimada/rn_firebase_startup_kit/images/routing.gif)

### Register/Login
![auth](https://raw.githubusercontent.com/wiki/BumpeiShimada/rn_firebase_startup_kit/images/auth.gif)

### Validation/Error handling
![validation](https://raw.githubusercontent.com/wiki/BumpeiShimada/rn_firebase_startup_kit/images/validation.gif)

## Instruction

1. Git clone this repository
2. Run "npm install firebase-tools -g" to install firebase tools. 
3. Run "yarn install" once to get necessary node modules.
4. Open the firebase console (from https://firebase.google.com) and add a project
5. From the dashboard of this project, add an app and choose "web" (</>).
6. From the setting of this app, choose "Config" (in Firebase SDK snippet)
7. Copy the config file, and paste into src/firebaseConfig.ts file.
8. Run "yarn start" to start a server
9. Run "yarn ios" to open the app on the ios emulator

## Acknowledgment

This is the React Native version of [firebase-startup-kit](https://github.com/snakajima/firebase-startup-kit).  
Thank you very much [@snakajima](https://github.com/snakajima)!