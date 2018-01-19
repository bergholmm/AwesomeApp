# Rewind
Cross platform app for a course project

## Requirements

- Lastest react-native-cli
- Lastest yarn
- Lastest Android Studio (Setup: https://facebook.github.io/react-native/docs/getting-started.html)
- BuildToolsVersion of 25.0.2+ for android simulator
- Lastest xCode (Only macOS)

## Installation

```
git pull https://github.com/bergholmm/AwesomeApp.git
yarn install
```

## Usage

Run the app on iPhone simulator:
```
react-native run-ios
```

Run the app on Android simulator: (The simulator must first be started through Android Virtual Devices)
```
react-native run-android
```



## Troubleshoot

if errors during start process using android simulator:

check :
```
cd android && gradlew clean
cd .. && react-native run-android
```
then
-> Crude way to solve it is move the project to some folder in "C:\".
