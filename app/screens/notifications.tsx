import CustomButton from "@/components/custom-button";
import TextWrapper from "@/components/text-wrapper";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

const NotificationPreview = () => {
  return (
    <View className="flex-1 items-center bg-white justify-center">
      <Image
        source={require("@/assets/images/notification-preview.png")}
        className="w-[386px] h-[414.3px] mt-[50px]"
      />

      <View className="w-full justify-center items-center">
        <TextWrapper
          weight="bold"
          className="text-[30px] text-center mt-8"
          style={{ lineHeight: 40, letterSpacing: -0.8 }}
        >
          Don’t miss anything
        </TextWrapper>
        <TextWrapper
          className="text-center  text-[#121212] my-5 max-w-sm"
          style={{ lineHeight: 20, letterSpacing: 0.2 }}
        >
          We’ll remind you when it’s time for your daily check-in and
          personalized routine.
        </TextWrapper>
        <CustomButton
          title="Allow Notifications"
          variant="primary"
          size="large"
          style={{ width: "90%", borderRadius: 14, marginTop: 20 }}
          onPress={() => router.push("/screens/app-features")}
        />
        <CustomButton
          title="Not right now"
          variant="primary"
          size="large"
          textColor="#2A2C2C"
          backgroundColor="#ECECEC"
          style={{ width: "90%", borderRadius: 14, marginTop: 20 }}
          onPress={() => router.push("/screens/app-features")}
        />
      </View>
    </View>
  );
};

export default NotificationPreview;

const styles = StyleSheet.create({});
