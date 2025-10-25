import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { DocsShell } from "@/components/docs-shell"
import { getAllDocSlugs, getDocBySlug, getDocNav, getFirstDocSlug } from "@/lib/docs"

interface DevelopPageProps {
  params: {
    slug?: string[]
  }
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs("develop")
  return [...slugs.map((slug) => ({ slug })), { slug: [] as string[] }]
}

export default function DevelopPage({ params }: DevelopPageProps) {
  const navItems = getDocNav("develop")
  if (navItems.length === 0) {
    notFound()
  }

  const fallbackSlug = getFirstDocSlug("develop")
  if (!fallbackSlug) {
    notFound()
  }

  const currentSlug = params.slug && params.slug.length > 0 ? params.slug : fallbackSlug
  const doc = getDocBySlug("develop", currentSlug)

  if (!doc) {
    notFound()
  }

  return (
    <DocsShell title="Develop" navItems={navItems} activeSlug={currentSlug}>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote source={doc.content} />
      </article>
    </DocsShell>
  )
}
