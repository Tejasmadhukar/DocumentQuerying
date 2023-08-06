import os 
import boto3
from dotenv import load_dotenv

load_dotenv()

session = boto3.session.Session()
client = session.client('s3',
                        region_name='blr1',
                        endpoint_url='https://blr1.digitaloceanspaces.com',
                        aws_access_key_id=os.getenv('SPACES_KEY'),
                        aws_secret_access_key=os.getenv('SPACES_SECRET'))


def download_bucket(bucket_name, download_path):
    global client
    s3 = client
    response = s3.list_objects_v2(Bucket=bucket_name)

    if 'Contents' not in response:
        return

    os.makedirs(download_path, exist_ok=True)

    for obj in response['Contents']:
        key = obj['Key']
        file_name = os.path.join(download_path, key)
        s3.download_file(bucket_name, key, file_name)

def upload_folder(local_folder_path, bucket_name):
    global client
    s3 = client

    if bucket_name not in s3.list_buckets()['Buckets']:
        s3.create_bucket(Bucket=bucket_name)
        print(f"Bucket '{bucket_name}' created successfully.")

    file_paths = []

    for uploaded_file in os.listdir(local_folder_path):
        file_path = os.path.join(local_folder_path, uploaded_file)
        file_paths.append(file_path)

    print(file_paths)

    for file_path in file_paths:
        key = os.path.relpath(file_path,local_folder_path)
        s3.upload_file(file_path, bucket_name, key)
        print(f"Uploaded: {file_path} with key: {key}")