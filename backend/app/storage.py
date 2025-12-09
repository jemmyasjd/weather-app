import boto3
from botocore.exceptions import ClientError
import json
from app.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME
from datetime import datetime

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def upload_json(file_name: str, data: dict):
    try:
        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=file_name,
            Body=json.dumps(data),
            ContentType='application/json'
        )
    except ClientError as e:
        raise RuntimeError(f"S3 upload failed: {e}")

def list_files():
    try:
        resp = s3_client.list_objects_v2(Bucket=S3_BUCKET_NAME)
        files = []
        for obj in resp.get("Contents", []):
            files.append({
                "name": obj["Key"],
                "size": obj["Size"],
                "created_at": obj["LastModified"].isoformat()
            })
        return files
    except ClientError as e:
        raise RuntimeError(f"S3 list failed: {e}")

def get_file_content(file_name: str):
    try:
        resp = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=file_name)
        return json.loads(resp["Body"].read())
    except ClientError:
        return None
