export const friends = [
  { name: "Panter", category: "Golf" },
  { name: "Lucacho", category: "Celular android" },
  { name: "Felix", category: "Futbol Hacoaj" },
  { name: "Burstein", category: "Golf" },
  { name: "Fefo", category: "Golf" },
  { name: "Suaya", category: "Futbol Hacoaj" },
  { name: "Chapu", category: "Celular android" },
  { name: "Jumbo", category: "Celular android " },
  { name: "Juan", category: "Futbol Hacoaj" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
  