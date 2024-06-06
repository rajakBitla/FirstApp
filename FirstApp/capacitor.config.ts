import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'FirstApp',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      // launchFadeOutDuration: 3000,
      // backgroundColor: "#fff",
      androidSplashResourceName: "bitla",
      androidScaleType: "CENTER",
      // showSpinner: true,
      // androidSpinnerStyle: "large",
      // iosSpinnerStyle: "small",
      // spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};
export default config;