// apps/web/src/lib/posts.ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'


export type PostMeta = { slug: string; title: string; date?: string; tags?: string[] }


const blogRoot = path.join(process.cwd(), 'posts')


export function getPosts(): PostMeta[] {
const files = fs.readdirSync(blogRoot).filter((name) => {
return name.endsWith('.mdx')
})
  return files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const file = fs.readFileSync(path.join(blogRoot, filename), 'utf8')
    const { data: frontmatter } = matter(file)
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date,
      tags: frontmatter.tags || []
    }
  }).sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}