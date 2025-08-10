import AuthModal from "@/components/auth-modal";
import { CustomButton } from "@/components/custom-button";
import TextWrapper from "@/components/text-wrapper";
import {
  Calendar,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const Appfeatures = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/man-tub.png")}
        className="w-full h-[450px]"
      />

      <View className="items-center justify-center absolute bottom-[5%] w-full px-4">
        <TextWrapper
          weight="bold"
          className="text-center text-[#0070DE] my-5"
          style={{ lineHeight: 20, letterSpacing: 0.2 }}
        >
          INTRODUCING
        </TextWrapper>
        <TextWrapper
          weight="bold"
          className="text-[30px] text-center max-w-sm"
          style={{ lineHeight: 40, letterSpacing: -0.8 }}
        >
          Why Users Trust Nurecover
        </TextWrapper>

        <View className="w-full gap-6 my-5 items-center mt-10">
          <View className="flex-row items-center gap-3  max-w-sm">
            <Sparkles size={20} color="#0070DE" />

            <TextWrapper
              className="flex-1 text-[#121212] text-lg"
              style={{ lineHeight: 20 }}
            >
              Personalized recovery routines crafted by smart AI
            </TextWrapper>
          </View>

          <View className="flex-row items-center gap-3 max-w-sm">
            <Calendar size={20} color="#0070DE" />

            <TextWrapper
              className="flex-1 text-[#121212] text-lg"
              style={{ lineHeight: 20 }}
            >
              Track your daily readiness with smart check-ins
            </TextWrapper>
          </View>

          <View className="flex-row items-center gap-3 max-w-sm">
            <TrendingUp size={20} color="#0070DE" />
            <TextWrapper
              className="flex-1 text-[#121212] text-lg"
              style={{ lineHeight: 20 }}
            >
              Measure your progress & optimize long-term health
            </TextWrapper>
          </View>
        </View>

        <CustomButton
          title="Get Started"
          variant="primary"
          size="large"
          style={{ width: "95%", marginTop: 20 }}
          onPress={() => setIsModalVisible(true)}
          icon={<ChevronRight color="#fff" height={20} width={20} />}
        />
      </View>
      <AuthModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default Appfeatures;

const styles = StyleSheet.create({});
