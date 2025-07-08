"use client"

import Link from "next/link"
import {
  Home,
  Package2,
  Briefcase,
  Wrench,
  FileText,
  UserCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
    { href: "/admin/dashboard/personal", icon: UserCircle, label: "Personal Info" },
    { href: "/admin/dashboard/about", icon: FileText, label: "About" },
    { href: "/admin/dashboard/projects", icon: Briefcase, label: "Projects" },
    { href: "/admin/dashboard/skills", icon: Wrench, label: "Skills" },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Portfolio Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.startsWith(link.href) && (link.href !== "/admin/dashboard" || pathname === "/admin/dashboard") ? "bg-muted text-primary" : ""
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
