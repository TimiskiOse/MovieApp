import React, { useState } from "react";
import { Redirect } from "expo-router";

const Page = () => {
  const [signedIn, setSignedIn] = useState(false);

  if (signedIn) return <Redirect href="/(tabs)" />;

  return <Redirect href="/(auth)/signIn" />;
};

export default Page;
