import CustomButton from "@/components/custom-button";
import TextWrapper from "@/components/text-wrapper";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const welcomeStates = [
  {
    title: "Daily Routines",
    subtitle:
      "Get personalized recovery routines using NuRecover's science-backed products.",
  },
  {
    title: "Track Progress",
    subtitle:
      "Monitor your recovery journey and see improvements over time with detailed analytics.",
  },
  {
    title: "Expert Guidance",
    subtitle:
      "Access professional advice and customized recommendations for optimal recovery.",
  },
];

const ProgressDots = ({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) => {
  return (
    <View className="flex-row gap-2 mb-8 items-center justify-center">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={` w-[4px] rounded-full ${
            index === currentIndex
              ? "bg-[#0070DE] h-[15px]"
              : "bg-gray-300 h-[10px]"
          }`}
        />
      ))}
    </View>
  );
};

const Welcomescreen = () => {
  const [currentState, setCurrentState] = useState(0);

  const handleNext = () => {
    if (currentState < welcomeStates.length - 1) {
      setCurrentState(currentState + 1);
    } else {
      router.push("/screens/onboarding-questions"); // Update this to your next screen
    }
  };

  return (
    <View className="flex-1 items-center justify-center relative bg-white">
      <View className="items-center justify-center absolute bottom-[10%] w-full px-4">
        <ProgressDots
          currentIndex={currentState}
          total={welcomeStates.length}
        />
        <TextWrapper
          weight="bold"
          className="text-[30px] text-center mt-8"
          style={{ letterSpacing: -0.5 }}
        >
          {welcomeStates[currentState].title}
        </TextWrapper>
        <TextWrapper
          className="text-center text-[#121212] my-5 max-w-xs"
          style={{ lineHeight: 20, letterSpacing: -0.5 }}
        >
          {welcomeStates[currentState].subtitle}
        </TextWrapper>
        <CustomButton
          title={
            currentState === welcomeStates.length - 1 ? "Get Started" : "Next"
          }
          variant="primary"
          size="large"
          style={{ width: "90%", borderRadius: 14, marginTop: 20 }}
          onPress={handleNext}
          icon={<ChevronRight color="#fff" height={20} width={20} />}
        />
      </View>
    </View>
  );
};

export default Welcomescreen;

const styles = StyleSheet.create({});
