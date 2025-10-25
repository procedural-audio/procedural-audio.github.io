import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Procedural Audio
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Enabling the next generation of human composers.
        </p>
      </div>
      <Image
        src="/procedure.png"
        alt="Procedure"
        width={320}
        height={320}
        className="h-auto w-full max-w-xs sm:max-w-sm"
        priority
      />
    </main>
  )
}
