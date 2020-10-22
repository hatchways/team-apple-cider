import cloudinary
import cloudinary.uploader
import cloudinary.api


def imageUploader(image_url,image_preset,cloud_name):
    return cloudinary.uploader.unsigned_upload(image_url,image_preset,cloud_name=cloud_name)['secure_url']



