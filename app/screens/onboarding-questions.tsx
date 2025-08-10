import CustomButton from "@/components/custom-button";
import TextWrapper from "@/components/text-wrapper";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { Check, ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface Product {
  id: number;
  name: string;
  image: any; // Using any for now since we're using require() for images
  description: string;
}

interface Question {
  id: number;
  question: string;
  options?: string[];
  type?: "products";
}

interface ProductCardProps {
  item: Product;
  isSelected: boolean;
  onSelect: (productName: string) => void;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Portable Ice Bath",
    image: {
      uri: "https://nurecover.com/cdn/shop/files/Untitled-1copynew.jpg?v=1753316008&width=1080",
    }, // Replace with actual product image
    description: "The original portable ice bath for cold water therapy",
  },
  {
    id: 2,
    name: "Home Sauna",
    image: {
      uri: "https://nurecover.com/cdn/shop/files/srt.png?v=1748206246&width=1524",
    },
    description: "The ultimate at-home infrared sauna experience",
  },
  {
    id: 3,
    name: "Sauna Heater",
    image: {
      uri: "https://nurecover.com/cdn/shop/files/Top.jpg?v=1745884366&width=1512",
    },
    description: "Infrared sauna heating element",
  },
  {
    id: 4,
    name: "Sauna Speaker",
    image: {
      uri: "https://nurecover.com/cdn/shop/files/SPEAKER-WEB-IMAGERY-1.jpg?v=1737989552&width=1512",
    },
    description: "Premium sauna speaker system",
  },
];

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What's your primary wellness goal?",
    options: ["Recovery", "Energy", "Longevity", "Pain Relief"],
  },
  {
    id: 2,
    question: "How often do you exercise?",
    options: [
      "Rarely",
      "1-2 times a week",
      "3-4 times a week",
      "5+ times a week",
    ],
  },
  {
    id: 3,
    question: "What's your typical stress level?",
    options: ["Low", "Moderate", "High", "Very High"],
  },
  {
    id: 4,
    question: "How would you rate your sleep quality?",
    options: ["Excellent", "Good", "Fair", "Poor"],
  },
  {
    id: 5,
    question: "Which Nurecover products do you use?",
    type: "products",
  },
];

const ProductCard = ({ item, isSelected, onSelect }: ProductCardProps) => {
  const cardWidth = (Dimensions.get("window").width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

  return (
    <View
      style={[
        { width: cardWidth },
        isSelected && {
          shadowColor: "#0070DE",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 10,
        },
      ]}
      className="mb-4"
    >
      <TouchableOpacity
        onPress={() => onSelect(item.name)}
        className={`rounded-2xl overflow-hidden bg-[#F1F1F1] ${
          isSelected ? "border-2 border-[#0070DE]" : "border border-gray-200"
        }`}
      >
        <Image
          source={item.image}
          className=" h-32 w-full"
          resizeMode="cover"
        />
        <View className="p-3">
          <TextWrapper weight="bold" className="text-base">
            {item.name}
          </TextWrapper>
          <TextWrapper className="text-sm text-gray-600 mt-1">
            {item.description}
          </TextWrapper>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const OnboardingQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const handleBack = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.back();
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle completion - navigate to next screen
      router.push("/screens/notifications");
    }
  };

  const currentQuestionData = QUESTIONS[currentQuestion - 1];
  const selectedOption = answers[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length;

  const handleProductSelect = (productName: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const currentSelected = (answers[currentQuestion] as string[]) || [];
    const newSelected = currentSelected.includes(productName)
      ? currentSelected.filter((name) => name !== productName)
      : [...currentSelected, productName];
    setAnswers({ ...answers, [currentQuestion]: newSelected });
  };

  const renderContent = () => {
    if (currentQuestionData.type === "products") {
      return (
        <ScrollView className="px-4">
          <FlatList
            data={PRODUCTS}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                isSelected={(
                  (answers[currentQuestion] as string[]) || []
                ).includes(item.name)}
                onSelect={handleProductSelect}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            className="mt-6"
          />
          <View className="h-[100px]" />
        </ScrollView>
      );
    }

    return (
      <View className="w-full px-4 mt-10 gap-4">
        {currentQuestionData.options?.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setAnswers({ ...answers, [currentQuestion]: option });
            }}
            className={`flex-row items-center p-4 rounded-2xl mb-3 ${
              selectedOption === option
                ? "border-blue-500 border bg-blue-50"
                : " bg-[#F9F9F9]"
            }`}
          >
            <View
              className={`w-7 h-7 rounded-full border-2 mr-4 items-center justify-center ${
                selectedOption === option
                  ? "border-blue-500 bg-[#0070DE]"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === option && (
                <Check size={13} color="#FFFFFF" strokeWidth={3} />
              )}
            </View>
            <TextWrapper
              weight={selectedOption === option ? "bold" : "medium"}
              className={`text-lg ${
                selectedOption === option
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              {option}
            </TextWrapper>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 pt-24 pb-4">
        <TouchableOpacity onPress={handleBack}>
          <ChevronLeft color="#000" size={24} />
        </TouchableOpacity>
        <View className="flex-1 flex-row items-center justify-center">
          {/* Progress Bar */}
          <View className="h-1 flex-1 bg-gray-200 rounded-full mx-4">
            <View
              className="h-1 bg-black rounded-full"
              style={{
                width: `${(currentQuestion / QUESTIONS.length) * 100}%`,
              }}
            />
          </View>
          {/* Question Counter */}
          <TextWrapper weight="medium" className="text-sm">
            {currentQuestion} of {QUESTIONS.length}
          </TextWrapper>
        </View>
      </View>

      {/* Questions Content */}
      <View className="flex-1">
        <View className="items-center justify-center mt-10 mb-10">
          <TextWrapper
            weight="bold"
            className="text-[28px] max-w-sm text-center"
          >
            {currentQuestionData.question}
          </TextWrapper>
        </View>

        {renderContent()}
      </View>

      {/* Next Button */}
      <View className=" absolute bottom-10 w-full items-center">
        <CustomButton
          onPress={handleNext}
          disabled={
            !selectedOption ||
            (currentQuestionData.type === "products" &&
              (!selectedOption || (selectedOption as string[]).length === 0))
          }
          title={isLastQuestion ? "Complete" : "Next"}
          variant="primary"
          size="large"
          style={{
            width: "90%",
            backgroundColor: selectedOption ? "#2A2C2C" : "#E5E5E5",
          }}
          icon={<ChevronRight size={24} color="#FFFFFF" />}
        />
      </View>
    </View>
  );
};

export default OnboardingQuestions;

const styles = StyleSheet.create({});
