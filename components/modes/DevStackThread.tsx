
"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, MessageSquare, ThumbsUp, Clock, Code } from "lucide-react"











function CodeBlockComponent({ language, code }: CodeBlock) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax highlighting simulation
  const highlightCode = (code: string, language: string) => {
    const keywords = [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "import",
      "export",
      "from",
      "async",
      "await",
      "class",
      "extends",
      "new",
      "this",
      "try",
      "catch",
      "throw",
      "interface",
      "type",
      "public",
      "private",
      "protected",
    ]
    const types = ["string", "number", "boolean", "void", "null", "undefined", "any", "never", "unknown"]
    const builtins = ["console", "Array", "Object", "Promise", "Error", "Map", "Set", "JSON", "Math", "Date"]

    return code.split("\n").map((line, lineIndex) => {
      const result: React.ReactNode[] = []
      const remaining = line
      let key = 0

      // Process the line character by character for better highlighting
      const tokens = remaining.split(/(\s+|[{}()[\];:,.<>=!+\-*/&|?'"`])/g).filter(Boolean)

      tokens.forEach((token) => {
        if (keywords.includes(token)) {
          result.push(
            <span key={key++} className="text-pink-400">
              {token}
            </span>,
          )
        } else if (types.includes(token)) {
          result.push(
            <span key={key++} className="text-cyan-400">
              {token}
            </span>,
          )
        } else if (builtins.includes(token)) {
          result.push(
            <span key={key++} className="text-yellow-400">
              {token}
            </span>,
          )
        } else if (/^['"`].*['"`]$/.test(token) || /^['"`]/.test(token)) {
          result.push(
            <span key={key++} className="text-green-400">
              {token}
            </span>,
          )
        } else if (/^\d+$/.test(token)) {
          result.push(
            <span key={key++} className="text-orange-400">
              {token}
            </span>,
          )
        } else if (token.startsWith("//") || token.startsWith("#")) {
          result.push(
            <span key={key++} className="text-muted-foreground italic">
              {token}
            </span>,
          )
        } else if (/^[A-Z][a-zA-Z]*$/.test(token)) {
          result.push(
            <span key={key++} className="text-yellow-400">
              {token}
            </span>,
          )
        } else {
          result.push(<span key={key++}>{token}</span>)
        }
      })

      return (
        <div key={lineIndex} className="flex">
          <span className="w-8 text-muted-foreground text-right pr-4 select-none opacity-50 text-xs leading-6">
            {lineIndex + 1}
          </span>
          <span className="flex-1">{result}</span>
        </div>
      )
    })
  }

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-border bg-[#1e1e2e]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-border">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-[#313244]"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-6 text-[#cdd6f4]">
        <code>{highlightCode(code, language)}</code>
      </pre>
    </div>
  )
}

function PostContent({ content, codeBlocks }: { content: string; codeBlocks?: CodeBlock[] }) {
  // Split content by code block placeholders and render
  const parts = content.split(/(\[code:\d+\])/g)

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      {parts.map((part, index) => {
        const codeMatch = part.match(/\[code:(\d+)\]/)
        if (codeMatch && codeBlocks) {
          const codeIndex = Number.parseInt(codeMatch[1])
          const block = codeBlocks[codeIndex]
          if (block) {
            return <CodeBlockComponent key={index} {...block} />
          }
        }
        return (
          <p key={index} className="text-foreground leading-relaxed whitespace-pre-wrap">
            {part}
          </p>
        )
      })}
    </div>
  )
}

function AuthorInfo({ author, timestamp }: { author: Author; timestamp: string }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-border">
        <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
        <AvatarFallback className="bg-muted text-muted-foreground font-medium">
          {author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{author.name}</span>
          {author.role && (
            <Badge variant="secondary" className="text-xs font-normal">
              {author.role}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {timestamp}
        </div>
      </div>
    </div>
  )
}

function ReplyCard({ reply }: { reply: Reply }) {
  return (
    <Card className={`${reply.isAccepted ? "border-green-500/50 bg-green-500/5" : ""}`}>
      {reply.isAccepted && (
        <div className="px-4 py-2 bg-green-500/10 border-b border-green-500/20 flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">Accepted Answer</span>
        </div>
      )}
      <CardHeader className="pb-3">
        <AuthorInfo author={reply.author} timestamp={reply.timestamp} />
      </CardHeader>
      <CardContent className="pt-0">
        <PostContent content={reply.content} codeBlocks={reply.codeBlocks} />
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {reply.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <MessageSquare className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DevStackThread({ thread }: any) {
const safeThread = {
  author: { name: "Anonymous" },
  timestamp: "Just now",
  likes: 0,
  replies: [],
  tags: [],
  codeBlocks: [],
  ...thread,
};



  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Main Post */}
      <Card className="border-border">
        <CardHeader className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground leading-tight text-balance">{safeThread.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <AuthorInfo author={safeThread.author} timestamp={safeThread.timestamp} />
            {safeThread.tags && safeThread.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {safeThread.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <PostContent content={safeThread.content} codeBlocks={safeThread.codeBlocks} />
          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {safeThread.likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              {safeThread.replies.length} Replies
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Replies Section */}
      {safeThread.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {safeThread.replies.length} {safeThread.replies.length === 1 ? "Reply" : "Replies"}
          </h2>
          <div className="space-y-4">
            {safeThread.replies.map((reply) => (
              <ReplyCard key={reply.id} reply={reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
