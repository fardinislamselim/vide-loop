export default function EmptyState({ title = "No posts yet" }: any) {
  return (
    <div className="text-center py-20 text-muted-foreground">
      <p>{title}</p>
    </div>
  );
}
