import axios from "axios";
const preset = "socialmedia";
const cloudName = "ddljgckmy";

export const uploadCloudinary = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", preset);
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      data,
    );
    const url = res.data.secure_url;
    return url.replace("/upload", "/upload/w_400/");
  } catch (error) {
    return error;
  }
};
