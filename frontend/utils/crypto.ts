// import JSEncrypt from "jsencrypt"
import CryptoJS from "cryptojs"

const runTest = async () => {
  const JSEncrypt = (await import("jsencrypt")).default

  if (typeof window === "undefined") {
    return
  }

  const privKey = `MIICXQIBAAKBgQCxpF/C3h2/gDQ3Tjf6DmDoNIa5EFGVY2ZRlFflufTWICa6kE1j
  sIb+VU/uRNTKqmEAwUxbz9jlr4gO8JBT9yZYI+Zx0vz/qybNf1FYaZc1zHIVpAnL
  XblhmvL2gV5rVhZOUmZ8Ohre8eQJgjJadzeN6OorEKC/lVTxN7jd8zMGNQIDAQAB
  AoGAK06ATfhqVipCEI2QFfT1aQaNJYa17O5rnk3E0+tupdj2uBq/0yLQ9iYEM3ky
  SyoYNd/p5qQYI36Uc9fvx5iEDya5wZG6EHGme9E/chroCmlmoDEhsKiTu+PJh3f0
  eArL2RlNivSmhWg6FEGrO+zrQnion79d2w6SDiWAyfjMrAECQQDd/Q11/teE9bF9
  CT8Ec3kYNnUp7eq7L9mNvhsTkXdMXxeSPCUNsfess6xZOjnL1LaYIrkr+AB57sqe
  EIEDvX8BAkEAzNvxqaMH9qcUWq0uz+5HePJ0yTuGvc1ZdtsLP/nJJ/PxXlWhb+g8
  ziVhYM05dGRffyHXIHrA7URUqFHc8zK7NQJBAKJW59wtpQDICKdu9pXTuG/7i01B
  f1Kq2IduyjBSRhMky4EW2OYeCwlSUCzkhtXIVkwFwLMl53tEJQrY+PB6SQECQDmT
  Ozk1A8DztknB0J1J17aLVf1UiIsBkrpP17qURk+/RMABiwy7lZNOeC7Pnu0yZJCD
  f0W2mlBU2wIvd8y2Hl0CQQCBGnwe9w0odzoqCA2g79CI5H+eS2AlNB+LwcTs2nzb
  LQ95LRvsw0WJl0y6e9l7WZpdvyUoL7LodTIKZmlxu20p`

  const pubKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxpF/C3h2/gDQ3Tjf6DmDoNIa5
EFGVY2ZRlFflufTWICa6kE1jsIb+VU/uRNTKqmEAwUxbz9jlr4gO8JBT9yZYI+Zx
0vz/qybNf1FYaZc1zHIVpAnLXblhmvL2gV5rVhZOUmZ8Ohre8eQJgjJadzeN6Oor
EKC/lVTxN7jd8zMGNQIDAQAB`

  const sign = new JSEncrypt()
  sign.setKey(privKey)

  // const enc = crypt.encrypt(text)
  // // Now decrypt the crypted text with the private key.
  // const dec = crypt.decrypt(enc)

  const signature = sign.sign(privKey, CryptoJS.SHA256, "sha256")

  console.log("signature", signature)

  const verify = new JSEncrypt()
  verify.setPublicKey(pubKey)

  // const verified = verify.verify(pubKey, signature, CryptoJS.SHA256)

  // // Now a simple check to see if the round-trip worked.
  // if (verified) {
  //   alert("It works!!!")
  // } else {
  //   alert("Something went wrong....")
  // }
}
export default runTest
