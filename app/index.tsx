import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function IndexPage() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-4xl font-bold mb-5">Welcome to Expo</Text>
      <Text className="text-center mb-5">
        This is a boilerplate project built with Expo and React Native. It
        includes:
      </Text>
      <View className="mb-5">
        <Text className="text-center mb-2">• Expo Router for navigation</Text>
        <Text className="text-center mb-2">
          • Supabase for authentication & database
        </Text>
        <Text className="text-center mb-2">
          • RevenueCat for in-app purchases
        </Text>
        <Text className="text-center mb-2">• TailwindCSS for styling</Text>
      </View>
      <TouchableOpacity className="bg-blue-500 px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
