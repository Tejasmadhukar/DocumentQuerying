import ManualAuth from "@/components/ManualAuth"
import ContinueWithGoogleButton from "@/components/ContinueWithGoogle"
export default function Auth() {
    return (
        <>
            <ManualAuth />
            <ContinueWithGoogleButton />
        </>
    )
}