import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

import { DocsShell } from "@/components/docs-shell"
import { getAllDocSlugs, getDocBySlug, getDocNav, getFirstDocSlug } from "@/lib/docs"

interface LearnPageProps {
  params: {
    slug?: string[]
  }
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs("learn")
  return [...slugs.map((slug) => ({ slug })), { slug: [] as string[] }]
}

export default function LearnPage({ params }: LearnPageProps) {
  const navItems = getDocNav("learn")
  if (navItems.length === 0) {
    notFound()
  }

  const fallbackSlug = getFirstDocSlug("learn")
  if (!fallbackSlug) {
    notFound()
  }

  const currentSlug = params.slug && params.slug.length > 0 ? params.slug : fallbackSlug
  const doc = getDocBySlug("learn", currentSlug)

  if (!doc) {
    notFound()
  }

  return (
    <DocsShell title="Learn" navItems={navItems} activeSlug={currentSlug}>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <MDXRemote source={doc.content} />
      </article>
    </DocsShell>
  )
}
