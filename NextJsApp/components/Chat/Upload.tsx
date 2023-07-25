'use client'
import { useRouter } from "next/navigation"
import { Button, Spacer } from "@nextui-org/react"
import { FC, useRef, useState } from "react"
import { FileIcon } from "../icons"
import { revalidatePath } from "next/cache"
import { backendUrl } from "@/config/site";
import { createChatgroup } from "./FileUpload"
import { Getsession } from "./FileUpload"
import { title } from "process"


const Upload:FC = () => {
    const router = useRouter();
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [Loading,setLoading] = useState(false);

    const Handleclick = () => {
        hiddenFileInput.current?.click();
    }

    async function UploadFile (id: string, file: File) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('file', file)
    
        const response = await fetch(`${backendUrl}/upload`, {
            method: 'POST',
            body: formData,
            cache: "no-store"
        })
    
        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.status} - ${response.body}`);
        }
        return response.text();
    }

    async function Handleupload(file: File) {
        const session = await Getsession();

        if(!session) {alert('Not logged in'); return}

        try {
            const [group, fileStatus] = await Promise.all([createChatgroup(session.user.id, title), UploadFile(session.user.id, file)]);
            return group.id
        } catch (error) {
            throw error;
        }
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!event.target.files) {alert('Select Files !!'); return}

        setLoading(true);
        Handleupload(event.target.files[0]).then((data)=>{
            revalidatePath('/chat');
            router.push(`/chat/${data}`);
        }).catch((Error)=>alert(Error)).finally(()=>setLoading(false))

    }

    return (
        <>  
            <Spacer y={10}/>
            <Button onPress={Handleclick} isLoading={Loading} className="" variant="bordered" color="secondary" endContent={<FileIcon />}>Upload</Button>
            <input type="file" onChange={HandleInputChange} ref={hiddenFileInput} multiple style={{display:'none'}} className="mt-3 border-0" />
        </>
    )
}

export default Upload;