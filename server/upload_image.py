import cloudinary
import cloudinary.uploader
import cloudinary.api

# def upload(file,upload_preset, **options):
#     cloudinary.uploader.upload(file,upload_preset)
#     return 

image = r"C:\Users\adams\Pictures\pet-rock.jpg"
upload_preset = r"https://api.cloudinary.com/v1_1/applecider"
result = cloudinary.uploader.unsigned_upload(image, upload_preset)
print(result)