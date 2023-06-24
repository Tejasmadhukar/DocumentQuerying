"use client"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Spacer, Tabs, Tab, Link, Button } from "@nextui-org/react";
import { useState, useMemo, Key } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/features/auth-slice";

interface LoginFormType{
    email: string,
    password: string
}

interface SignupFormType {
    name: string,
    email: string,
    password: string
}

export default function Auth() {
    const [InputValue, setInputValue] = useState("");
    const [PasswordValue, setPasswordValue] = useState("");
    const [Name,setName] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [selected, setSelected] = useState<Key>("login");
    const dispatch = useDispatch();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateEmail = (InputValue:string) => InputValue.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  
    const validationState = useMemo(() => {
      if (InputValue === "") return undefined;
      return validateEmail(InputValue) ? "valid" : "invalid";
    }, [InputValue]);

    async function HandleLogin(data:LoginFormType) {
        console.log(data);    
        const email = data.email ;
        const password = data.password;
    
        const Login:LoginFormType = {
            email,
            password
        };
    
        try {
            const response = await fetch('/auth/api/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Login),
            });
            const res = await response.json();
            console.log(res);
            dispatch(login({
                username: res.user?.name ?? "",
                userID: res.user?.userID ?? -1,
                token: 'goofyaa token'
            }))
        } catch (error) {
            console.log(error);
        }
    }

    async function HandleSignup(data:SignupFormType) {
        console.log(data);
        const name = data.name;
        const email = data.email;
        const password = data.password;

        const Signup:SignupFormType = {
            name, email, password
        }

        try {
            const response = await fetch('/auth/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Signup),
            })
            const res = await response.json();
        } catch (error) {
            console.log(error);
        }
    }


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
                            <Link size="sm" onPress={() => setSelected("sign-up")}>
                                Sign up
                            </Link>
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button type="submit" fullWidth color="primary">
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
                            <Link size="sm" onPress={() => setSelected("login")}>
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
        </>
    )
}