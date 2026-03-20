import Image from "next/image";

export default function PostGrid({ posts }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {posts.map((post: any) => (
        <div key={post._id} className="relative aspect-square">
          <Image
            src={post.image}
            alt="post"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
