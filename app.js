const imgPreview = document.getElementById("img-preview");
const imgUploader = document.getElementById("img-uploader");
// const imgUploadBar = document.getElementById('img-upload-bar')
const uploadBarDiv = document.getElementById('progress-bar')

const CLOUDINARY_URL = "";
const CLOUDINARY_UPLOAD_PRESET = "";

imgUploader.addEventListener("change", async e => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  console.log(formData);

  const res = await axios.post(CLOUDINARY_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress(event){
        console.log(Math.round((event.loaded * 100)/ event.total))
        const progress = (event.loaded * 100)/ event.total;
        // imgUploadBar.setAttribute('value',progress)
        uploadBarDiv.style.width = progress+'%'; 
    }
  });
  console.log(res);
  imgPreview.src = res.data.secure_url;
});
