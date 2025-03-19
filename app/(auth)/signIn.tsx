import { View, Text, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { account } from "@/services/appwrite";
import OAuth from "@/components/OAuth";
import InputField from "@/components/Inputfield";
import CustomButton from "@/components/CustomButton";
import React, { useState } from "react";

const signIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Data Collection
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const session = await account.createEmailPasswordSession(form.email, form.password);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)');
      console.log(session)
      return session;
    } catch (error: any) {
      Alert.alert('Error', error.message);
      console.log(error.message)
    }
    setLoading(false);
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
        <Text className="text-white text-center text-3xl">Welcome Back!</Text>
        <View>
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
              title="Sign In"
              bgVariant="outline"
              onPress={handleSignIn}
              className="mt-6"
            />
          )}

          <OAuth />

          <Link
            href="/signUp"
            className="text-lg text-center text-general-200 mt-10 text-white"
          >
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default signIn;
