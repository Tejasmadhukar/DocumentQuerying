import Link from "next/link"
import Upload from "@/components/Chat/Upload"
import { title } from "@/components/primitives"
export default function Chat() {

    return (
        <>
            <section className="flex-1 flex flex-col items-center justify-center mb-40 ">
                <div className="max-w-lg  justify-center gap-4 ">
                    <h1 className={title({ color: "violet" })}>Upload&nbsp;</h1>
                    <h1 className={title()}>your files here&nbsp;</h1>
                </div>
                <Upload />
            </section>
        </>
    )
}