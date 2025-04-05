export const friends = [
  { name: "Uri", category: "Mica, la tana, la nueva, Eva Brown" },
  { name: "Setton", category: "Mica, la tana, la nueva, Eva Brown" },
  { name: "Felix", category: "No son de OnlyChamps" },
  { name: "Vito", category: "No son de OnlyChamps" },
  { name: "Naguito", category: "Mica, la tana, la nueva, Eva Brown" },
  { name: "Suaya", category: "Vive en provincia" },
  { name: "Castre", category: "Vive en provincia" },
  { name: "Panter", category: "No son de OnlyChamps" },
  { name: "Lucacho", category: "Vive en provincia" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
  