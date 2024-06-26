import { registerRootComponent } from "expo";
import "react-native-url-polyfill/auto";
import "text-encoding";
import "./src/polyfill/readAsArrayBuffer";

import App from "./src";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
