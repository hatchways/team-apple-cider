import cloudinary.uploader
from config import CLOUDINARY_NAME

def replace_cloudinary_image(image_url, preset):
    try: return cloudinary.uploader.unsigned_upload(image_url, preset, cloud_name=CLOUDINARY_NAME)['secure_url']
    except: return image_url 
