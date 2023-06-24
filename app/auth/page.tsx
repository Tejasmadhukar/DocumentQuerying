"use client"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Spacer, Tabs, Tab, Link, Button } from "@nextui-org/react";

import { useState, useMemo, Key } from "react";

export default function Auth() {
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState<Key>("login");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (value:string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  
    const validationState = useMemo(() => {
      if (value === "") return undefined;
      return validateEmail(value) ? "valid" : "invalid";
    }, [value]);

    return (
        <>
            <Spacer y={3} />
            <h1 className={title()}>Auth</h1>
            <Spacer y={10} />
            <Tabs
                fullWidth
                size="sm"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={(key: Key) => setSelected(key)}
            >
                <Tab key="login" title="Login">
                    <form className="flex flex-col gap-4">  
                        <Input
                            isRequired
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
                        <Input
                            isRequired
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
                        <p className="text-center text-sm">
                            Need to create an account?{" "}
                            <Link size="sm" onPress={() => setSelected("sign-up")}>
                                Sign up
                            </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button fullWidth color="primary">
                                Login
                            </Button>
                        </div>
                    </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                    <form className="flex flex-col gap-4 h-[300px]">
                        <Input isRequired variant="bordered" label="Name" />
                        <Input
                            isRequired
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
                        <Input
                            isRequired
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
                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link size="sm" onPress={() => setSelected("login")}>
                                Login
                            </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button fullWidth color="primary">
                                Sign up
                            </Button>
                        </div>
                    </form>
                </Tab>

            </Tabs>
            
           
        </>
    )
}