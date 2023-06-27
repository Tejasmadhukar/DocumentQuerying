import ContinueWithGoogleButton from "@/components/AuthPageComponents/ContinueWithGoogle"
import ManualAuth from "@/components/AuthPageComponents/ManualAuth"
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