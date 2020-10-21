import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

const Cloudinary = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async e =>{
    const files = e.target.files
    const data = new FormData()
    data.append('file',files[0])
    data.append('upload_preset', 'applecider')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/applecider/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
      const file = await res.json()

      setImage(file.secure_url)
      setLoading(false)
  }

  return (
    <Box>
      <Typography>Hello World!</Typography>
      <Box>
        <input
          type="file"
          name="file"
          placeholder="upload an image"
          onChange={uploadImage}
        />
        {loading?(
          <h3>Loading...</h3>
        ): (
          <img src={image} style={{width:'300px'}} />
        )}
      </Box>
    </Box>
  );
};

export default Cloudinary;


