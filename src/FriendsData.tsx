export const friends = [
  { name: "Pava", category: "Hinchas de river" },
  { name: "Vito", category: "No vienen a las juntadas" },
  { name: "Raizman", category: "Hinchas de river" },
  { name: "Castre", category: "No vienen a las juntadas" },
  { name: "Fefo", category: "Hinchas de river" },
  { name: "Naguito", category: "Baja estatura" },
  { name: "Suaya", category: "Baja estatura" },
  { name: "Chapu", category: "No vienen a las juntadas" },
  { name: "Burstein", category: "Baja estatura" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
  