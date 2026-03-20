"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfileHeader({ user }: any) {
  return (
    <div className="flex flex-col md:flex-row gap-10 items-center">
      <Avatar className="w-32 h-32">
        <AvatarImage src={user.image} />
        <AvatarFallback>{user.username[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold">{user.username}</h1>
        <p className="text-muted-foreground">{user.name}</p>
        <p>{user.bio}</p>

        <div className="flex gap-6 justify-center md:justify-start">
          <span>
            <b>{user.posts?.length || 0}</b> posts
          </span>
          <span>
            <b>{user.followers?.length || 0}</b> followers
          </span>
          <span>
            <b>{user.following?.length || 0}</b> following
          </span>
        </div>

        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
