'use client'
import { Button, Spacer } from "@nextui-org/react"
import { title } from "../primitives"
import { FileIcon } from "../icons"
import { FC, useRef, useState } from "react"

interface ChatMessageProps {
    onSendMessage: (message: string) => void;
}

const Upload:FC<ChatMessageProps> = ({onSendMessage}) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const Handleclick = () => {
        hiddenFileInput.current?.click();
    }

    const HandleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files) {
            setSelectedFile(event.target.files[0]);
            Handleupload().then(()=>{
                onSendMessage('Embeddings Done !!');
                onSendMessage('Now you can ask me any question from your document that you would like !!')
            });
        }
    }

    const Handleupload = async () =>{

    }

    return (
        <>  
            <section className="flex-1 flex flex-col items-center justify-center mb-40 ">
                <div className="max-w-lg  justify-center gap-4 ">
                    <h1 className={title({ color: "violet" })}>Upload&nbsp;</h1>
                    <h1 className={title()}>your files here&nbsp;</h1>
                </div>
                <Spacer y={10}/>
                <Button onPress={Handleclick} className="" variant="bordered" color="secondary" endContent={<FileIcon />}>Upload</Button>
                <input type="file" onChange={HandleInputChange} ref={hiddenFileInput} multiple style={{display:'none'}} className="mt-3 border-0" />
            </section>
            
        </>
    )
}

export default Upload;