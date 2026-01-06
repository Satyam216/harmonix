export const uploadToCloudinary = async (file, type = "video") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "harmonix_upload");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dbjugmug6/${type}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
};
