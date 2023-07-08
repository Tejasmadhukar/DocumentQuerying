'use client'
import { Button, Spacer } from "@nextui-org/react"
import axios from "axios"
import { FC, useRef, useState } from "react"
import { FileIcon } from "../icons"
import { title } from "../primitives"

interface ChatMessageProps {
    onSendMessage: (message: string) => void;
}

const Upload:FC<ChatMessageProps> = ({onSendMessage}) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [Loading,setLoading] = useState(false);

    const Handleclick = () => {
        hiddenFileInput.current?.click();
    }

    const Handleupload = async (file: File): Promise<any> =>{
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post('http://localhost:80/upload',formData)
            return response
        } catch (error) {
            console.log(error) ;
        }
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setLoading(true);
            Handleupload(event.target.files[0]).then(()=>{
                onSendMessage('Embeddings Done !!');
                onSendMessage('Now you can ask me any question from your document that you would like !!')
            }).catch((Error)=>alert(Error)).finally(()=>setLoading(false))
        }
    }

    return (
        <>  
            <section className="flex-1 flex flex-col items-center justify-center mb-40 ">
                <div className="max-w-lg  justify-center gap-4 ">
                    <h1 className={title({ color: "violet" })}>Upload&nbsp;</h1>
                    <h1 className={title()}>your files here&nbsp;</h1>
                </div>
                <Spacer y={10}/>
                <Button onPress={Handleclick} isLoading={Loading} className="" variant="bordered" color="secondary" endContent={<FileIcon />}>Upload</Button>
                <input type="file" onChange={HandleInputChange} ref={hiddenFileInput} multiple style={{display:'none'}} className="mt-3 border-0" />
            </section>
            
        </>
    )
}

export default Upload;