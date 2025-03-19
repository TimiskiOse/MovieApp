import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { account } from "@/services/appwrite";
import OAuth from "@/components/OAuth";
import InputField from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import React, { useState } from "react";

const signUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Data Collection
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await account.create(
        "unique()",
        form.email,
        form.password,
        form.username
      );
      Alert.alert("Success", "User created successfully");
      router.replace('/(tabs)');

    } catch (error: any) {
      // Type the error as 'any' or a more specific type
      Alert.alert("Error", error.message);
      console.log(error.message)
    }
    setLoading(false);
    console.log("Signed Up");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Text className="text-white text-center text-3xl">
          Create Your Account!
        </Text>
        <View>
          <InputField
            label="Username"
            value={form.username}
            icon={icons.person}
            placeholder="Enter username"
            textContentType="username"
            onChangeText={(value: any) => setForm({ ...form, username: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value: any) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            textContentType="password"
            secureTextEntry={true}
            value={form.password}
            icon={icons.lock}
            onChangeText={(value: any) => setForm({ ...form, password: value })}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#C06E59" className="mt-6" />
          ) : (
            <CustomButton
              title="Sign Up"
              bgVariant="outline"
              onPress={handleSignUp}
              className="mt-6"
            />
          )}

          <OAuth />

          <Link
            href="/signUp"
            className="text-lg text-center text-general-200 mt-10 text-white"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default signUp;
