"use client"
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "./icons";
const ContinueWithGoogleButton = () => {

  const HandleClick = () =>{
      signIn("google");
  }

  return (
    <Button onPress={HandleClick} size="lg" variant="ghost" color="primary" startContent={<GoogleIcon />}>
        Sign in With Google
    </Button>
  );
};

export default ContinueWithGoogleButton;
