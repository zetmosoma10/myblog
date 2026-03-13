const getWordCount = (content?: string) => {
  // * Average reading speed 200 word per minute
  const wordCount = content?.trim().split(" ").length;
  return Math.ceil((wordCount as number) / 200);
};

export default getWordCount;
