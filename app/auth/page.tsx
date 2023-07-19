import ContinueWithGoogleButton from "@/components/Auth/ContinueWithGoogle"
import ManualAuth from "@/components/Auth/ManualAuth"
import { authConfig } from "@/config/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
export default async function Auth() {
    const session = await getServerSession(authConfig);
    
    if(session) redirect('/chat');

    return (
        <>
            <ManualAuth />
            <ContinueWithGoogleButton />
        </>
    )
}