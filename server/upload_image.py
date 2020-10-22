import cloudinary
import cloudinary.uploader
import cloudinary.api

# def upload(file,upload_preset, **options):
#     cloudinary.uploader.upload(file,upload_preset)
#     return 

image = r"C:\Users\adams\Pictures\pet-rock.jpg"
upload_preset = r"https://api.cloudinary.com/v1_1/applecider/image/upload"
name = "applecider"

# cloudinary.config( 
#   cloud_name = "applecider", 
#   api_key = "713319321679623", 
#   api_secret = "dpvCJ7wXZFhBy0wTNUjkRkjXDUs" 
# )


# upload_preset= cloudinary.api.create_upload_preset(
#   unsigned = True, 
#   folder = "applecider")

# print(upload_preset)

result = cloudinary.uploader.unsigned_upload(image, "xnxitkef",
  cloud_name = 'applecider')
print(result['secure_url'])