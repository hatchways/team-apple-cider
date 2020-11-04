import cloudinary.uploader
from config import CLOUDINARY_NAME
from config import PRODUCT_IMG_PRESET

def replace_cloudinary_image(image_url, preset=PRODUCT_IMG_PRESET):
    try: return cloudinary.uploader.unsigned_upload(image_url, preset, cloud_name=CLOUDINARY_NAME)['secure_url']
    except: return image_url 
 