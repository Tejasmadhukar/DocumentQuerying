"use client"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Spacer } from "@nextui-org/react";

import { useState, useMemo } from "react";

export default function Auth() {
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  
    const validationState = useMemo(() => {
      if (value === "") return undefined;
      return validateEmail(value) ? "valid" : "invalid";
    }, [value]);

    return (
        <>
            
            <h1 className={title()}>Auth</h1>
            <Spacer y={6} />
            <Input
                value={value}
                type="email"
                label="Email"
                variant="bordered"
                color={validationState === "invalid" ? "danger" : "success"}
                errorMessage={validationState === "invalid" && "Please enter a valid email"}
                validationState={validationState}
                onValueChange={setValue}
                className="max-w-xs"
            />
            <Spacer  />
            <Input
                color = 'secondary'
                label="Password"
                variant="bordered"
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
            />
        </>
    )
}