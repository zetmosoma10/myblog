/*
 * Given the content we calculate average reading speed by dividing all counted words by 200. An average person can read 200 word per minute
 */

const getWordCount = (content?: string) => {
  const wordCount = content?.trim().split(" ").length;
  return Math.ceil((wordCount as number) / 200);
};

export default getWordCount;
