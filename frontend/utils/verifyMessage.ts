async function verifyMessage(
  message: string,
  signature: Uint8Array,
  certificate: ArrayBuffer
): Promise<boolean> {
  // Step 1: Extract the public key from the certificate
  const publicKey = await crypto.subtle.importKey(
    "spki",
    certificate,
    { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
    true,
    ["verify"]
  )

  const messageBuffer = new TextEncoder().encode(message)

  // Step 2: Convert the signature data to an ArrayBuffer
  const signatureData = signature.buffer

  // Step 3: Verify the signature
  const isVerified = await crypto.subtle.verify(
    { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } },
    publicKey,
    signatureData,
    messageBuffer
  )

  return isVerified
}

export default verifyMessage
