import os 
from dotenv import load_dotenv
from azure.storage.blob import BlobServiceClient

load_dotenv()

connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
blob_service_client = BlobServiceClient.from_connection_string(connect_str)

def download_bucket(bucket_name, download_path):
    global blob_service_client

    container_client = blob_service_client.get_container_client(container=bucket_name)
    blobs = container_client.list_blobs()

    if blobs is None:
        print("No file exsists")
        return

    os.makedirs(download_path, exist_ok=True)

    for blob in blobs:
        key = blob['name'].split('/')[-1]
        blob_client = blob_service_client.get_blob_client(container=bucket_name, blob=blob)

        with open(file=os.path.join(download_path, key), mode="wb") as sample_blob:
            download_stream = blob_client.download_blob()
            sample_blob.write(download_stream.readall())


def upload_folder(local_folder_path, bucket_name):
    global blob_service_client

    if bucket_name not in blob_service_client.list_containers():
        container_name = bucket_name
        blob_service_client.create_container(container_name)
        print(f"Bucket '{bucket_name}' created successfully.")

    file_paths = []

    for uploaded_file in os.listdir(local_folder_path):
        file_path = os.path.join(local_folder_path, uploaded_file)
        file_paths.append(file_path)

    print(file_paths)

    for file_path in file_paths:
        key = os.path.relpath(file_path,local_folder_path)
        blob_client = blob_service_client.get_blob_client(container=bucket_name, blob=key)
        with open(file=file_path, mode="rb") as data:
            blob_client.upload_blob(data)
        print(f"Uploaded: {file_path} with key: {key}")