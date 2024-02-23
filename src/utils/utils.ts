export const generateId = (): number => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export const generateUniqueAddress = (length: number): string => {
  const randomPart = Math.floor(Math.random() * 16 ** length)
    .toString(16)
    .padStart(length, "0");
  return `0x${randomPart}`;
};
