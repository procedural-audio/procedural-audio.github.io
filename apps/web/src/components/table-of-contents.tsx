"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Extract headings from the page (exclude h1 post title)
    const headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"))
      .map((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
        return {
          id,
          title: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        }
      })
      .filter((item) => item.id && item.title)

    setToc(headings)

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className={cn("w-64", className)}>
      <div className="sticky top-24">
        <h3 className="text-sm font-semibold text-foreground mb-3">Table of Contents</h3>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  "block w-full text-left text-sm transition-colors hover:text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm",
                  item.level === 2 && "font-medium",
                  item.level === 3 && "ml-3",
                  item.level === 4 && "ml-6",
                  item.level === 5 && "ml-9",
                  item.level === 6 && "ml-12",
                  activeId === item.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
