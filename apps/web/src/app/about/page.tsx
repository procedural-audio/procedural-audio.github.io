export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted-foreground">
          Procedure brings together research-driven security work, thoughtful teaching, and hands-on
          development. This site is a concise hub for the areas I care about most—who I am, how I
          learn, and what I build.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-medium">Profile</h2>
        <p className="text-muted-foreground">
          I&apos;m a security-minded engineer with experience across vulnerability research,
          reverse engineering, and tooling for creative teams. Whether I&apos;m designing course
          material or building software, I focus on making complex topics approachable without
          losing the technical depth.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-medium">Focus Areas</h2>
        <ul className="list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Explaining emerging security topics with clarity and practical examples.</li>
          <li>Creating supportive learning environments for budding researchers and builders.</li>
          <li>Maintaining a feedback loop between academic insight and real-world engineering.</li>
        </ul>
      </section>
    </main>
  )
}
