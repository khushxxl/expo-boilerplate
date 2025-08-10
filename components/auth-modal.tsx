import { Ionicons } from "@expo/vector-icons";
import { X } from "lucide-react-native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./custom-button";
import TextWrapper from "./text-wrapper";

const AuthModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      isVisible={isVisible}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        className="flex-1 max-h-[85%] bg-white p-4 pt-20"
      >
        <TouchableOpacity className="absolute top-5 right-6" onPress={onClose}>
          <X size={20} color="black" />
        </TouchableOpacity>
        <View className="ml-1">
          <Image
            source={require("@/assets/images/logo-black-bg.png")}
            className="w-[64px] h-[64px] "
          />
          <TextWrapper weight="bold" className="text-4xl mt-10">
            Join Nurecover
          </TextWrapper>
          <TextWrapper className=" text-lg mt-2 text-[#121212]">
            Sign up in seconds and start your personalized recovery journey
          </TextWrapper>
        </View>

        <View className="absolute bottom-10 w-full px-2 items-center self-center">
          <CustomButton
            title="Continue with Google"
            variant="primary"
            size="large"
            style={{ width: "100%", marginTop: 20 }}
            onPress={() => {}}
            iconPosition="left"
            icon={
              <Image
                source={require("@/assets/images/google-logo.png")}
                style={{ width: 20, height: 20 }}
              />
            }
            backgroundColor="#E2E2E2"
            textColor="black"
          />

          <CustomButton
            title="Continue with Apple"
            variant="primary"
            size="large"
            style={{ width: "100%", marginTop: 20 }}
            onPress={() => {}}
            iconPosition="left"
            icon={<Ionicons name="logo-apple" size={20} color="white" />}
          />

          <TouchableOpacity className="mt-5">
            <TextWrapper
              weight="bold"
              className="text-lg mt-5 text-blue-600 text-center"
              style={{ lineHeight: 20, letterSpacing: 0.2 }}
            >
              Skip for now
            </TextWrapper>
          </TouchableOpacity>

          <TextWrapper
            className=" text-sm mt-5 text-gray-500 text-center"
            style={{ lineHeight: 20, letterSpacing: 0.2 }}
          >
            By continuing, you agree to Nurecover’s Terms of Service and Privacy
            Policy.
          </TextWrapper>
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;

const styles = StyleSheet.create({});
