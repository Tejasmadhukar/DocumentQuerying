'use client'
import { useRouter } from "next/navigation"
import { Button, Spacer } from "@nextui-org/react"
import { FC, useRef, useState } from "react"
import { FileIcon } from "../icons"
import Handleupload from "./FileUpload"

const Upload:FC = () => {
    const router = useRouter();
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [Loading,setLoading] = useState(false);

    const Handleclick = () => {
        hiddenFileInput.current?.click();
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setLoading(true);
            Handleupload(event.target.files[0]).then((data)=>{
                // onSendMessage({message:'Embeddings Done !!', user:'bot'});
                // onSendMessage({message:'Now you can ask me any question from your document that you would like !!', user:'bot'})
                router.push('/chat/randomId')
            }).catch((Error)=>alert(Error)).finally(()=>setLoading(false))
        }
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