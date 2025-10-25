"use client"

import Link from "next/link"

import type { DocNavItem } from "@/lib/docs"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface DocsShellProps {
  title: string
  navItems: DocNavItem[]
  activeSlug: string[]
  children: React.ReactNode
}

export function DocsShell({ title, navItems, activeSlug, children }: DocsShellProps) {
  return (
    <SidebarProvider>
      <DocsSidebar title={title} navItems={navItems} activeSlug={activeSlug} />
      <SidebarInset>
        <main className="mx-auto w-full max-w-4xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <SidebarTrigger className="text-sm" />
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          </div>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

interface DocsSidebarProps {
  title: string
  navItems: DocNavItem[]
  activeSlug: string[]
}

function DocsSidebar({ title, navItems, activeSlug }: DocsSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <div className="text-lg font-semibold text-sidebar-foreground">{title}</div>
      </SidebarHeader>
      <SidebarContent>
        {navItems.length === 0 ? (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton disabled>No entries yet</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          navItems.map((item) => (
            <DocsSidebarGroup
              key={item.slug.join("/")}
              item={item}
              activeSlug={activeSlug}
            />
          ))
        )}
      </SidebarContent>
    </Sidebar>
  )
}

interface DocsSidebarGroupProps {
  item: DocNavItem
  activeSlug: string[]
}

function DocsSidebarGroup({ item, activeSlug }: DocsSidebarGroupProps) {
  if (item.children && item.children.length > 0) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>{item.children.map((child) => renderMenuNode(child, activeSlug))}</SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  if (item.href) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>{renderMenuNode(item, activeSlug)}</SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return null
}

function renderMenuNode(item: DocNavItem, activeSlug: string[]): React.ReactNode {
  const key = item.slug.join("/")
  const isActive = !!item.href && compareSlug(item.slug, activeSlug)

  if (item.children && item.children.length > 0) {
    return (
      <SidebarMenuItem key={key} className="space-y-1">
        <SidebarMenuButton asChild={!!item.href} isActive={isActive}>
          {item.href ? (
            <Link href={item.href}>
              <span>{item.title}</span>
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
        </SidebarMenuButton>
        <SidebarMenuSub>
          {item.children.map((child) => {
            const childKey = child.slug.join("/")
            const childActive = !!child.href && compareSlug(child.slug, activeSlug)
            return (
              <SidebarMenuSubItem key={childKey}>
                {child.href ? (
                  <SidebarMenuSubButton asChild isActive={childActive} size="sm">
                    <Link href={child.href}>
                      <span>{child.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                ) : (
                  <SidebarMenuSubButton size="sm">{child.title}</SidebarMenuSubButton>
                )}
              </SidebarMenuSubItem>
            )
          })}
        </SidebarMenuSub>
      </SidebarMenuItem>
    )
  }

  return (
    <SidebarMenuItem key={key}>
      <SidebarMenuButton asChild={!!item.href} isActive={isActive}>
        {item.href ? (
          <Link href={item.href}>
            <span>{item.title}</span>
          </Link>
        ) : (
          <span>{item.title}</span>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function compareSlug(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  return a.every((segment, index) => segment === b[index])
}
