import cloudinary
import cloudinary.uploader
import cloudinary.api
from config import CLOUDINARY_PRESET, CLOUDINARY_NAME
from flask import jsonify, Blueprint, request,  current_app
from image_uploader import image_uploader

image_handler = Blueprint('image_handler', __name__)

@image_handler.route('/images',methods=['GET']) 
def imageUpload():
    result = imageUploader()
    
image = r"C:\Users\adams\Pictures\pet-rock.jpg"
upload_preset = r"https://api.cloudinary.com/v1_1/applecider/image/upload"
name = "applecider"

# upload_preset= cloudinary.api.create_upload_preset(
#   unsigned = True, 
#   folder = "applecider")

# print(upload_preset)

print(CLOUDINARY_PRESET)
print(CLOUDINARY_NAME)

result = cloudinary.uploader.unsigned_upload(image, "xnxitkef",
  cloud_name = 'applecider')
print(result['secure_url'])