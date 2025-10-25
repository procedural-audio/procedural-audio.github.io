import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export type DocNavItem = {
  title: string
  slug: string[]
  href?: string
  order: number
  children?: DocNavItem[]
}

const CONTENT_ROOT = path.join(process.cwd(), "content")

function toTitle(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function readFileFrontmatter(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  const title = typeof data.title === "string" ? data.title : toTitle(path.basename(filePath, path.extname(filePath)))
  const order = typeof data.order === "number" ? data.order : 999
  return { title, order, content, data }
}

function buildNav(section: string, sectionDir: string, baseSegments: string[] = []): DocNavItem[] {
  const entries = fs.readdirSync(sectionDir, { withFileTypes: true })

  const items: DocNavItem[] = []

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue
    const fullPath = path.join(sectionDir, entry.name)

    if (entry.isDirectory()) {
      const children = buildNav(section, fullPath, [...baseSegments, entry.name])
      if (children.length === 0) continue
      const title = toTitle(entry.name)
      const order = Math.min(...children.map((child) => child.order))
      items.push({ title, slug: [...baseSegments, entry.name], order, children })
      continue
    }

    if (!entry.isFile() || path.extname(entry.name) !== ".mdx") continue

    const { title, order } = readFileFrontmatter(fullPath)
    const slug = [...baseSegments, path.basename(entry.name, ".mdx")]
    const hrefSegments = slug.join("/")
    items.push({
      title,
      slug,
      href: `/${section}/${hrefSegments}`,
      order,
    })
  }

  return items
    .map((item) =>
      item.children
        ? { ...item, children: item.children.sort(sortNavItems) }
        : item
    )
    .sort(sortNavItems)
}

function sortNavItems(a: DocNavItem, b: DocNavItem) {
  if (a.order !== b.order) return a.order - b.order
  return a.title.localeCompare(b.title)
}

export function getDocNav(section: "learn" | "develop"): DocNavItem[] {
  const sectionDir = path.join(CONTENT_ROOT, section)
  if (!fs.existsSync(sectionDir)) return []
  return buildNav(section, sectionDir, [])
}

function flattenNav(items: DocNavItem[]): DocNavItem[] {
  const result: DocNavItem[] = []
  for (const item of items) {
    if (item.href) {
      result.push(item)
    }
    if (item.children) {
      result.push(...flattenNav(item.children))
    }
  }
  return result
}

export function getAllDocSlugs(section: "learn" | "develop"): string[][] {
  const nav = getDocNav(section)
  return flattenNav(nav).map((item) => item.slug)
}

export function getFirstDocSlug(section: "learn" | "develop"): string[] | null {
  const nav = getDocNav(section)
  const flat = flattenNav(nav)
  return flat[0]?.slug ?? null
}

export function getDocBySlug(section: "learn" | "develop", slugSegments: string[]) {
  const filePath = path.join(CONTENT_ROOT, section, ...slugSegments) + ".mdx"
  if (!fs.existsSync(filePath)) {
    return null
  }
  const { content, data } = readFileFrontmatter(filePath)
  return { content, frontmatter: data }
}
