import verifyMessage from "@/utils/verifyMessage"
import runTest from "../utils/cryptoPlayground"
import onLoadCertificate from "../utils/loadCertificate"
import signMessage from "../utils/signMessage"

export default function Home() {
  if (typeof window !== "undefined") {
    runTest()
  }

  async function onTx() {
    const certificate = await onLoadCertificate()

    console.log("certificate", certificate)

    if (!(certificate instanceof ArrayBuffer)) {
      console.error("Something went wrong reading the certificate file.")
    }

    const message = "Hello, world!"

    const signedMessage = signMessage(certificate, message)

    // const isVerified = await verifyMessage(signedMessage)

    // console.log("isVerified", isVerified)
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-center text-2xl">
          Hi, we&apos;re caffeine consensus
        </h1>

        <button onClick={onTx}>Read certificate</button>
      </div>
    </main>
  )
}
