'use server'

const Handleupload = async (file: File): Promise<any> =>{
    // try {
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     const response = await axios.post('https://backend-test-58bq.onrender.com/upload',formData)
    //     return response
    // } catch (error) {
    //     console.log(error);
    //     throw error;
    // }
    return 'this runs on server'
}

export default Handleupload;