"use client"
import { useRouter } from "next/navigation";
import { Key, useMemo, useState,Suspense } from "react";
import { Button, Divider, Link, Progress, Spacer, Tab, Tabs } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { signIn } from "next-auth/react";

interface LoginFormType{
    email: string,
    password: string
}

interface SignupFormType extends LoginFormType{
    name: string,
}

export default function AuthForm () {
    const router = useRouter();

    const [InputValue, setInputValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState("");
    const [Name,setName] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState<Key>("login");
    const [message, setMessage] = useState<string | null>(null)

    const toggleVisibility = () => setIsVisible(!isVisible);
    const validateEmail = (InputValue:string) => InputValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const validationState = useMemo(() => {
        if (InputValue === "") return undefined;
        return validateEmail(InputValue) ? "valid" : "invalid";
    }, [InputValue]);

    async function HandleLogin(data:LoginFormType) {
        const email = data.email ;
        const password = data.password;
        
        setMessage("Loading");

        const signInResponse = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if(signInResponse && !signInResponse.error){
            router.push('/chat')
        }else{
            console.log("Error: ", signInResponse);
            setMessage("Invalid Username or Password");
        }
    }

    async function HandleSignup(data:SignupFormType) {
        const name = data.name;
        const email = data.email;
        const password = data.password;
    
        const Signup:SignupFormType = {
            name, email, password
        }
        setMessage("Loading");
        try {
            const response:any = await fetch('/auth/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Signup),
            });
            const res = await response.json();
            if(response.ok){
                setMessage("Signup Successful. Please Login!"); 
                setSelected("login");
            }else{
                setMessage(res.message);
            }
        } catch (error) {
            console.log(error);
            setMessage(error as string);
        }
    }

    return (
        <>
         <Tabs
                className="  mt-14"
                fullWidth
                size="sm"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={(key: Key) => setSelected(key)}
            >
                <Tab key="login" title="Login">
                    <form onSubmit={(e)=>{e.preventDefault(); HandleLogin({email: InputValue,password: PasswordValue});}} className="flex flex-col gap-4">  
                        <Input
                            isRequired
                            value={InputValue}
                            type="email"
                            name="email"
                            label="Email"
                            variant="bordered"
                            color={validationState === "invalid" ? "danger" : "success"}
                            errorMessage={validationState === "invalid" && "Please enter a valid email"}
                            validationState={validationState}
                            onValueChange={setInputValue}
                            className="max-w-xs"
                        />
                        <Input
                            isRequired
                            color = 'secondary'
                            name="password"
                            label="Password"
                            value={PasswordValue}
                            onValueChange={setPasswordValue}
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
                            <Link className="cursor-pointer" size="sm" onPress={() => setSelected("sign-up")}>
                                Sign up
                            </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button  type="submit" fullWidth color="primary">
                                Login
                            </Button>
                        </div>
                    </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                    <form onSubmit={(e)=>{e.preventDefault(); HandleSignup({name: Name,email: InputValue,password: PasswordValue});}} className="flex flex-col gap-4 h-[300px]">
                        <Input isRequired value={Name} onValueChange={setName} variant="bordered" label="Name" />
                        <Input
                            isRequired
                            value={InputValue}
                            type="email"
                            label="Email"
                            variant="bordered"
                            color={validationState === "invalid" ? "danger" : "success"}
                            errorMessage={validationState === "invalid" && "Please enter a valid email"}
                            validationState={validationState}
                            onValueChange={setInputValue}
                            className="max-w-xs"
                        />
                        <Input
                            isRequired
                            color = 'secondary'
                            label="Password"
                            value={PasswordValue}
                            onValueChange={setPasswordValue}
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
                            <Link className="cursor-pointer" size="sm" onPress={() => setSelected("login")}>
                                Login
                            </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button type="submit" fullWidth color="primary">
                                Sign up
                            </Button>
                        </div>
                    </form>
                </Tab>
            </Tabs>
            <Divider />
        </>
    )
}