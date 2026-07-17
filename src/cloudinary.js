const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function uploadToCloudinary(file, onProgress) {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

    const formData = new FormData()

    formData.append("file", file)

    formData.append("upload_preset", UPLOAD_PRESET)

    const xhr = new XMLHttpRequest()

    xhr.open("POST", url)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)

        onProgress(percent)
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText)

        resolve(response.secure_url)
      } else {
        reject(new Error("Cloudinary upload failed"))
      }
    }

    xhr.onerror = () => {
      reject(new Error("Network error"))
    }

    xhr.send(formData)
  })
}
