import ContinueWithGoogleButton from "@/components/Auth/ContinueWithGoogle"
import { authConfig } from "@/config/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AuthForm from "@/components/Auth/AuthForm"
import clsx from "clsx"
import { title } from "@/components/primitives"

export default async function Auth() {
    const session = await getServerSession(authConfig);
    
    if(session) redirect('/chat');

    return (
        <>
            <h1 className={clsx(title(),"mb-6")}>Auth</h1>
            <AuthForm />
            <h1 className="text-2xl font-bold mb-6">OR</h1>
            <ContinueWithGoogleButton />
        </>
    )
}