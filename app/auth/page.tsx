import ManualAuth from "@/components/ManualAuth"
import ContinueWithGoogleButton from "@/components/ContinueWithGoogle"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authConfig } from "@/config/auth"
export default async function Auth() {
    const session = await getServerSession(authConfig);
    
    if(session) return redirect('/chat');

    return (
        <>
            <ManualAuth />
            <ContinueWithGoogleButton />
        </>
    )
}