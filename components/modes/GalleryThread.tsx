"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"


// Define varying heights for masonry effect
const heightVariants = [
  "row-span-2",
  "row-span-3",
  "row-span-2",
  "row-span-4",
  "row-span-3",
  "row-span-2",
  "row-span-3",
  "row-span-2",
]

function GalleryCard({ post, index }: { post: ThreadPost; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg cursor-pointer group",
        heightVariants[index % heightVariants.length],
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={post.imageUrl || "/placeholder.svg"}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark overlay gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content revealed on hover */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        )}
      >
        <h3 className="text-sm font-medium text-foreground leading-tight mb-3 line-clamp-2">{post.title}</h3>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            {post.commentCount}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5" />
            {post.likeCount}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" />
            {post.viewCount}
          </span>
        </div>
      </div>

      {/* Subtle border on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg border border-accent/40 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}

export default function GalleryThread({ thread }: any) {
// Derive fake gallery posts from content
const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/gi;

const images =
  thread.content?.match(imageRegex) ?? [
    "https://picsum.photos/400/600",
    "https://picsum.photos/500/700",
    "https://picsum.photos/450/650",
    "https://picsum.photos/480/680",
  ];

const safeThread = {
  title: thread.title,
  description: "Community showcase derived from this discussion.",
  createdAt: "Just now",

  creator: {
    name: "Anonymous",
    avatarUrl: "",
    handle: "@anonymous",
  },

  posts: images.map((url: string, index: number) => ({
    id: `post-${index}`,
    imageUrl: url,
    title: `Artwork ${index + 1}`,
    commentCount: Math.floor(Math.random() * 10),
    likeCount: Math.floor(Math.random() * 100),
    viewCount: Math.floor(Math.random() * 500),
  })),
};


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{safeThread.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{safeThread.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-accent/20">
                <AvatarImage src={safeThread.creator.avatarUrl || "/placeholder.svg"} alt={safeThread.creator.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {safeThread.creator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-foreground">{safeThread.creator.name}</p>
                <p className="text-muted-foreground text-xs">{safeThread.creator.handle}</p>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground/70">{safeThread.createdAt}</p>
        </div>
      </header>

      {/* Masonry Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] gap-3">
          {safeThread.posts.map((post, index) => (
            <GalleryCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}
