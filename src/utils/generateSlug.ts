function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // * remove special chars
    .replace(/\s+/g, "-") // * spaces → hyphens
    .replace(/-+/g, "-"); // * collapse multiple hyphens
}

export default generateSlug;
