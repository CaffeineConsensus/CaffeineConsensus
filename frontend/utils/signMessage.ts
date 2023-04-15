import { arrayBufferToBase64 } from "./cryptoUtils"

function signMessage(certificateData: ArrayBuffer, message: string) {
  return crypto.subtle
    .importKey(
      "pkcs8",
      // "spki",
      certificateData, // ArrayBuffer containing the certificate
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
      },
      true, // extract the private key
      ["sign"]
    )
    .then(async (key) => {
      console.log("key", key)

      const messageBuffer = new TextEncoder().encode(message)

      const signedMessage = await crypto.subtle.sign(
        { name: "RSASSA-PKCS1-v1_5" },
        key,
        messageBuffer
      )

      console.log("signedMessage", signedMessage)

      console.log(
        "arrayBufferToBase64(signedMessage)",
        arrayBufferToBase64(signedMessage)
      )

      return arrayBufferToBase64(signedMessage)
    })
}

export default signMessage
