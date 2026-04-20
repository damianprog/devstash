export type ContentType = "TEXT" | "FILE" | "URL";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
};

export type MockItemType = {
  id: string;
  name: string;
  label: string;
  icon: string;
  color: string;
  contentType: ContentType;
  isSystem: boolean;
  itemCount: number;
};

export type MockCollection = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  defaultTypeId: string;
  itemCount: number;
};

export type MockItem = {
  id: string;
  title: string;
  description: string | null;
  contentType: ContentType;
  content: string | null;
  url: string | null;
  fileName: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastUsedAt: string | null;
};

export const mockUser: MockUser = {
  id: "user_1",
  name: "John Doe",
  email: "demo@devstash.io",
  image: null,
  isPro: true,
};

export const mockItemTypes: MockItemType[] = [
  {
    id: "type_snippet",
    name: "snippet",
    label: "Snippets",
    icon: "Code",
    color: "#3b82f6",
    contentType: "TEXT",
    isSystem: true,
    itemCount: 24,
  },
  {
    id: "type_prompt",
    name: "prompt",
    label: "Prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    contentType: "TEXT",
    isSystem: true,
    itemCount: 18,
  },
  {
    id: "type_command",
    name: "command",
    label: "Commands",
    icon: "Terminal",
    color: "#f97316",
    contentType: "TEXT",
    isSystem: true,
    itemCount: 15,
  },
  {
    id: "type_note",
    name: "note",
    label: "Notes",
    icon: "StickyNote",
    color: "#fde047",
    contentType: "TEXT",
    isSystem: true,
    itemCount: 12,
  },
  {
    id: "type_file",
    name: "file",
    label: "Files",
    icon: "File",
    color: "#6b7280",
    contentType: "FILE",
    isSystem: true,
    itemCount: 5,
  },
  {
    id: "type_image",
    name: "image",
    label: "Images",
    icon: "Image",
    color: "#ec4899",
    contentType: "FILE",
    isSystem: true,
    itemCount: 3,
  },
  {
    id: "type_link",
    name: "link",
    label: "Links",
    icon: "Link",
    color: "#10b981",
    contentType: "URL",
    isSystem: true,
    itemCount: 8,
  },
];

export const mockCollections: MockCollection[] = [
  {
    id: "coll_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    defaultTypeId: "type_snippet",
    itemCount: 12,
  },
  {
    id: "coll_python_snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    defaultTypeId: "type_snippet",
    itemCount: 8,
  },
  {
    id: "coll_context_files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    defaultTypeId: "type_file",
    itemCount: 5,
  },
  {
    id: "coll_interview_prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    defaultTypeId: "type_note",
    itemCount: 24,
  },
  {
    id: "coll_git_commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    defaultTypeId: "type_command",
    itemCount: 15,
  },
  {
    id: "coll_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    defaultTypeId: "type_prompt",
    itemCount: 18,
  },
];

export const mockItems: MockItem[] = [
  {
    id: "item_useauth_hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "TEXT",
    content:
      "export function useAuth() {\n  const [user, setUser] = useState(null);\n  // ...\n  return { user, signIn, signOut };\n}",
    url: null,
    fileName: null,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["coll_react_patterns"],
    tags: ["react", "auth", "hooks"],
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-01-15T10:00:00.000Z",
    lastUsedAt: "2026-04-18T12:00:00.000Z",
  },
  {
    id: "item_api_error_handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "TEXT",
    content:
      "async function fetchWithRetry(url, opts, retries = 3) {\n  // exponential backoff ...\n}",
    url: null,
    fileName: null,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["coll_react_patterns", "coll_interview_prep"],
    tags: ["api", "fetch", "retry"],
    createdAt: "2026-01-12T09:00:00.000Z",
    updatedAt: "2026-01-12T09:00:00.000Z",
    lastUsedAt: "2026-04-17T08:00:00.000Z",
  },
  {
    id: "item_git_undo_last_commit",
    title: "Undo last commit (keep changes)",
    description: "Soft reset to unstage the most recent commit",
    contentType: "TEXT",
    content: "git reset --soft HEAD~1",
    url: null,
    fileName: null,
    language: "bash",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: ["coll_git_commands"],
    tags: ["git", "reset"],
    createdAt: "2026-02-02T14:30:00.000Z",
    updatedAt: "2026-02-02T14:30:00.000Z",
    lastUsedAt: "2026-04-15T11:20:00.000Z",
  },
  {
    id: "item_prompt_code_review",
    title: "Thorough Code Review",
    description: "Prompt that asks the model to review a diff with priorities",
    contentType: "TEXT",
    content:
      "You are a senior engineer. Review this diff. Flag: correctness, security, performance. Ignore style.",
    url: null,
    fileName: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["coll_ai_prompts"],
    tags: ["review", "llm"],
    createdAt: "2026-02-20T16:45:00.000Z",
    updatedAt: "2026-03-01T10:10:00.000Z",
    lastUsedAt: "2026-04-19T09:00:00.000Z",
  },
  {
    id: "item_python_list_dedupe",
    title: "Dedupe list preserving order",
    description: "One-liner using dict.fromkeys",
    contentType: "TEXT",
    content: "deduped = list(dict.fromkeys(items))",
    url: null,
    fileName: null,
    language: "python",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["coll_python_snippets"],
    tags: ["python", "list"],
    createdAt: "2026-03-03T08:00:00.000Z",
    updatedAt: "2026-03-03T08:00:00.000Z",
    lastUsedAt: "2026-04-10T13:30:00.000Z",
  },
  {
    id: "item_project_context_readme",
    title: "project-context.md",
    description: "Context file describing the DevStash architecture",
    contentType: "FILE",
    content: null,
    url: null,
    fileName: "project-context.md",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_file",
    collectionIds: ["coll_context_files"],
    tags: ["context", "docs"],
    createdAt: "2026-03-18T11:00:00.000Z",
    updatedAt: "2026-03-18T11:00:00.000Z",
    lastUsedAt: "2026-04-12T14:00:00.000Z",
  },
  {
    id: "item_link_prisma_docs",
    title: "Prisma 7 Migrations Guide",
    description: "Official guide for migrations in dev and prod",
    contentType: "URL",
    content: null,
    url: "https://www.prisma.io/docs/orm/prisma-migrate",
    fileName: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_link",
    collectionIds: [],
    tags: ["prisma", "docs"],
    createdAt: "2026-03-25T12:00:00.000Z",
    updatedAt: "2026-03-25T12:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_note_system_design",
    title: "System design: rate limiting",
    description: "Summary of token bucket vs sliding window",
    contentType: "TEXT",
    content:
      "Token bucket: bursts OK, refill rate r. Sliding window: smoother, costlier to compute.",
    url: null,
    fileName: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["coll_interview_prep"],
    tags: ["system-design", "rate-limit"],
    createdAt: "2026-04-01T19:00:00.000Z",
    updatedAt: "2026-04-01T19:00:00.000Z",
    lastUsedAt: "2026-04-14T20:00:00.000Z",
  },
];
