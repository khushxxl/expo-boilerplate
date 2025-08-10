import { CustomButton } from "@/components/custom-button";
import TextWrapper from "@/components/text-wrapper";
import { useRouter } from "expo-router";

import { ChevronRight } from "lucide-react-native";
import { Image, View } from "react-native";
import "./global.css";

export default function App() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center relative bg-white">
      <View className="items-center justify-center absolute bottom-[10%] w-full px-4">
        <Image
          source={require("@/assets/images/logo-black-bg.png")}
          className="w-[64px] h-[64px] "
        />
        <TextWrapper
          weight="bold"
          className="text-[40px] text-center mt-8"
          style={{ lineHeight: 40, letterSpacing: 0.2 }}
        >
          Welcome to{"\n"}Nurecover
        </TextWrapper>
        <TextWrapper
          className="text-center  text-[#121212] my-5"
          style={{ lineHeight: 20, letterSpacing: 0.2 }}
        >
          Track. Recover. Thrive personalised to your body.
        </TextWrapper>
        <CustomButton
          title="Get Started"
          variant="primary"
          size="large"
          style={{ width: "90%", borderRadius: 14, marginTop: 20 }}
          onPress={() => router.push("/screens/welcome-screen")}
          icon={<ChevronRight color="#fff" height={20} width={20} />}
        />
      </View>
    </View>
  );
}
