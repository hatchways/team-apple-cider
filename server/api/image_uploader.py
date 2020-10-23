import cloudinary.uploader

def image_uploader(image_url, image_preset, cloud_name):
    return cloudinary.uploader.unsigned_upload(image_url, image_preset, cloud_name=cloud_name)['secure_url']
