"use client";

import { useState } from "react";
import PostGrid from "./PostGrid";
import EmptyState from "./EmptyState";

export default function ProfileTabs({ posts }: any) {
  const [tab, setTab] = useState("posts");

  return (
    <div className="mt-10">
      <div className="flex gap-6 border-b pb-2">
        <button
          className={`
            ${tab === "posts" ? "text-foreground" : "text-muted-foreground"}cursor-pointer`}
          onClick={() => setTab("posts")}
        >
          Posts
        </button>
        <button
          className={`
            ${tab === "saved" ? "text-foreground" : "text-muted-foreground"} cursor-pointer`}
          onClick={() => setTab("saved")}
        >
          Saved
        </button>
      </div>

      {tab === "posts" ? (
        posts.length ? (
          <PostGrid posts={posts} />
        ) : (
          <EmptyState />
        )
      ) : (
        <EmptyState title="No saved posts" />
      )}
    </div>
  );
}
