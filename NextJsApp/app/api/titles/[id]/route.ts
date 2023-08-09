import { prisma } from "@/config/db";
const { BlobServiceClient } = require("@azure/storage-blob");

export async function DELETE(req: Request,{params}: {params:{id:string}}){
    const id = params.id

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(id);

    const deleteContainer = containerClient.delete();
    const deleteRecord = prisma.messageGroup.delete({
        where:{id}
    })

    try{
        const [deleteContainerRes, deleteRecordRes] = await Promise.all([deleteContainer,deleteRecord])
        return new Response(JSON.stringify('container and record deleted'), { status: 201 })
    }catch(err){
        return new Response('Failed to update todo', { status: 500 })
    }
}