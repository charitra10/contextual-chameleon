import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, ThumbsUp, Clock, Scale } from "lucide-react"


function PointCard({ point, side }: { point: Point; side: "left" | "right" }) {
  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={point.author.avatar || "/placeholder.svg"} alt={point.author.name} />
            <AvatarFallback className="text-xs">
              {point.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{point.author.name}</p>
            {point.author.credentials && <p className="text-xs text-muted-foreground">{point.author.credentials}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{point.timestamp}</span>
        </div>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-foreground">{point.content}</p>

      {point.sources && point.sources.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Sources:</p>
          <div className="flex flex-wrap gap-1">
            {point.sources.map((source, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-normal">
                {source}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <button className="flex items-center gap-1 transition-colors hover:text-foreground">
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>{point.upvotes}</span>
        </button>
        <button className="flex items-center gap-1 transition-colors hover:text-foreground">
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Reply</span>
        </button>
      </div>
    </div>
  )
}

function ArgumentColumn({ argument, side }: { argument: Argument; side: "left" | "right" }) {
  const borderColor = side === "left" ? "border-l-chart-2" : "border-l-chart-1"

  return (
    <div className="flex flex-col">
      <div className={`mb-4 border-l-4 ${borderColor} pl-4`}>
        <Badge
          variant="secondary"
          className={`mb-2 ${side === "left" ? "bg-chart-2/10 text-chart-2" : "bg-chart-1/10 text-chart-1"}`}
        >
          {argument.position}
        </Badge>
        <h3 className="text-lg font-semibold text-foreground">{argument.title}</h3>
      </div>

      <div className="flex flex-col gap-4">
        {argument.points.map((point) => (
          <PointCard key={point.id} point={point} side={side} />
        ))}
      </div>
    </div>
  )
}

export default function DebateThread({ thread }: any) {
const safeThread = {
  topic: thread.title,
  summary: thread.content,
  status: "active",
  createdAt: "Just now",
  participantCount: 2,
  totalPoints: 4,

  argumentA: {
    title: "In Favor",
    position: "Pro",
    color: "left",
    points: [
      {
        id: "a1",
        content: thread.content,
        author: { name: "User A" },
        timestamp: "Just now",
        upvotes: 3,
      },
    ],
  },

  argumentB: {
    title: "Against",
    position: "Con",
    color: "right",
    points: [
      {
        id: "b1",
        content: "An opposing viewpoint could be presented here.",
        author: { name: "User B" },
        timestamp: "Just now",
        upvotes: 2,
      },
    ],
  },
};


  const statusStyles = {
    active: "bg-chart-2/10 text-chart-2",
    concluded: "bg-muted text-muted-foreground",
    archived: "bg-muted text-muted-foreground",
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <Badge className={statusStyles[safeThread.status]}>
            {safeThread.status.charAt(0).toUpperCase() + safeThread.status.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">{safeThread.createdAt}</span>
        </div>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">{safeThread.topic}</h1>
      </div>

      {/* Neutral Summary */}
      <Card className="mb-8 border-2 border-border bg-muted/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Scale className="h-5 w-5 text-muted-foreground" />
            Neutral Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{safeThread.summary}</p>
          <Separator className="my-4" />
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>{safeThread.participantCount} participants</span>
            <span>{safeThread.totalPoints} points raised</span>
          </div>
        </CardContent>
      </Card>

      {/* Two-Column Debate Layout */}
      <div className="grid gap-8 md:grid-cols-2">
        <ArgumentColumn argument={safeThread.argumentA} side="left" />
        <ArgumentColumn argument={safeThread.argumentB} side="right" />
      </div>
    </div>
  )
}
