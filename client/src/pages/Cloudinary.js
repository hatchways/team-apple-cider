import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";

const Cloudinary = () => {
  const [image, setImage] = useSate("");
  const [loading, setLoading] = useState(false);
  return (
    <Box>
      <Typography>Hello World!</Typography>
      <Box>
        <input
          type="file"
          name="file"
          placeholder="uplaod na image"
          onChange={uploadImage}
        />
      </Box>
    </Box>
  );
};

export default Cloudinary;
