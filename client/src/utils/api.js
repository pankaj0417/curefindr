const VITE_API = import.meta.env.VITE_BASE_API_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${VITE_API}/api/data/upload-image`, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export default VITE_API;
