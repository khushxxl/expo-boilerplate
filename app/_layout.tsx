import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "helvetica-neue-roman": require("../assets/fonts/HelveticaNeueRoman.otf"),
    "helvetica-neue-bold": require("../assets/fonts/HelveticaNeueBold.otf"),
    "helvetica-neue-medium": require("../assets/fonts/HelveticaNeueMedium.otf"),
    "helvetica-neue-light": require("../assets/fonts/HelveticaNeueLight.otf"),
    "helvetica-neue-thin": require("../assets/fonts/HelveticaNeueThin.otf"),
    "helvetica-neue-ultra-light": require("../assets/fonts/HelveticaNeueUltraLight.otf"),
    "helvetica-neue-black": require("../assets/fonts/HelveticaNeueBlack.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />

        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="screens/splash-screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/welcome-screen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/onboarding-questions"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/notifications"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/app-features"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
