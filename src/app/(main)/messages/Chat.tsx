"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MailPlus, MessageSquareX, SearchIcon, X } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">
        <ChatSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ChatChannel open={!sidebarOpen} />
      </div>
    </main>
  );
}

function ChatSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const searchInputDebounced = useDebounce(searchInput);
  void searchInputDebounced;

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <div className="flex items-center gap-3 p-2">
        <div className="h-full md:hidden">
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
        <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
        <Button
          size="icon"
          variant="ghost"
          title="Start new chat"
          onClick={() => setShowNewChatDialog(!showNewChatDialog)}
        >
          <MailPlus className="size-5" />
        </Button>
      </div>

      <div className="group relative">
        <SearchIcon className="absolute left-5 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground group-focus-within:text-primary" />
        <input
          placeholder="Search users..."
          className="h-12 w-full pe-4 ps-14 focus:outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
    </div>
  );
}

function ChatChannel({ open }: { open: boolean }) {
  return (
    <div className={cn("w-full md:block", !open && "hidden")}>
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <p className="text-2xl font-semibold text-muted-foreground">
          No chats here yet
        </p>
        <MessageSquareX className="size-20 text-primary/20" />
      </div>
    </div>
  );
}
