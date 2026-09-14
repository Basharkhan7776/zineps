export type MockUser = {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "invited" | "suspended"
  createdAt: string
}

export type MockPost = {
  id: string
  title: string
  excerpt: string
  tag: string
  likes: number
  publishedAt: string
}

export const mockUsers: MockUser[] = [
  {
    id: "u_01",
    name: "Ava Carter",
    email: "ava@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-01-12",
  },
  {
    id: "u_02",
    name: "Liam Novak",
    email: "liam@example.com",
    role: "editor",
    status: "active",
    createdAt: "2026-02-03",
  },
  {
    id: "u_03",
    name: "Mia Chen",
    email: "mia@example.com",
    role: "viewer",
    status: "invited",
    createdAt: "2026-03-21",
  },
  {
    id: "u_04",
    name: "Noah Patel",
    email: "noah@example.com",
    role: "editor",
    status: "suspended",
    createdAt: "2026-04-09",
  },
  {
    id: "u_05",
    name: "Sofia Reyes",
    email: "sofia@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2026-05-17",
  },
]

export const mockPosts: MockPost[] = [
  {
    id: "p_01",
    title: "Getting started with shadcn + Tailwind v4",
    excerpt: "How the nova preset wires up CSS variables, fonts and dark mode.",
    tag: "guide",
    likes: 128,
    publishedAt: "2026-08-01",
  },
  {
    id: "p_02",
    title: "Mock-first UI development with Bun",
    excerpt: "Build pages with local mock data before wiring up a real API.",
    tag: "bun",
    likes: 96,
    publishedAt: "2026-08-14",
  },
  {
    id: "p_03",
    title: "Vite + React 19 patterns",
    excerpt: "Server-state free demo using useState and useMemo for filtering.",
    tag: "react",
    likes: 74,
    publishedAt: "2026-09-02",
  },
]

export const mockStats = [
  { label: "Total users", value: "1,284", delta: "+12%" },
  { label: "Active posts", value: "326", delta: "+8%" },
  { label: "Likes", value: "9,412", delta: "+20%" },
] as const
