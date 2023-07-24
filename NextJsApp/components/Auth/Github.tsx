"use client"

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";
import { GithubLightIcon,GithubDarkIcon } from "../icons";
import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const ContinueWithGithubButton = () => {
const { theme, setTheme } = useTheme()
const [mounted, setMounted] = useState(false)

useEffect(() => {
    setMounted(true)
  }, [])

if (!mounted) {
    return <Spinner />
}

const HandleClick = () =>{
    signIn("github");
}

return (
    <Button onPress={HandleClick} size="lg" variant="ghost" color="primary" startContent={theme == 'dark' ? <GithubDarkIcon /> : <GithubLightIcon />}>
        Sign in With Github
    </Button>
  );
};

export default ContinueWithGithubButton;
