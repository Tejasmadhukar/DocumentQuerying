import ContinueWithGoogleButton from "@/components/Auth/Google"
import ContinueWithGithubButton from "@/components/Auth/Github"
import { authConfig } from "@/config/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import clsx from "clsx"
import { title } from "@/components/primitives"
import { useTheme } from "next-themes"

export default async function Auth() {
    const session = await getServerSession(authConfig);
    if(session) redirect('/chat');

    return (
        <>
        <div className=" flex flex-col h-screen items-center  justify-center">
            <section className="flex-1 flex flex-col items-center justify-center mb-40 ">
                <h1 className={clsx(title(),"")}>Auth</h1>
                <div className="max-w-lg  justify-center gap-4 mt-28  my-2">
                    <ContinueWithGoogleButton />
                </div>
                <div className="max-w-lg  justify-center gap-4 mb-12 my-2 ">
                    <ContinueWithGithubButton />
                </div>
            </section>
        </div>
        </>
    )
}