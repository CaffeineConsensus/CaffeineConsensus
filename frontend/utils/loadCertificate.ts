function readCertificateFile() {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".cer,.crt,.pem,.key"

    input.addEventListener("change", (event) => {
      if (!event.target?.files) return

      const file = event.target.files[0]

      if (!file) {
        reject("No file selected.")
        return
      }

      const reader = new FileReader()
      reader.addEventListener("load", () => {
        resolve(reader.result)
      })

      reader.addEventListener("error", () => {
        reject(reader.error)
      })

      reader.readAsArrayBuffer(file)
    })

    input.click()
  })
}

function onLoadCertificate() {
  return readCertificateFile()
    .then((certificateData) => {
      return certificateData
    })
    .catch((error) => {
      console.error(error)
    })
}

export default onLoadCertificate
