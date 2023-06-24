"use client"
import { subtitle, title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { useState, useMemo } from "react";

export default function Auth() {
    const [value, setValue] = useState("");

    const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  
    const validationState = useMemo(() => {
      if (value === "") return undefined;
  
      return validateEmail(value) ? "valid" : "invalid";
    }, [value]);

    return (
        <>

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
        </>
    )
}