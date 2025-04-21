export const friends = [
  { name: "Jumbo", category: "Fueron al casino en pinamar" },
  { name: "Vito", category: "Pelo caracteristico" },
  { name: "Raizman", category: "Fueron al casino en pinamar" },
  { name: "Setton", category: "Universidad en usa" },
  { name: "Uri", category: "Fueron al casino en pinamar" },
  { name: "Naguito", category: "Pelo caracteristico" },
  { name: "Suaya", category: "Universidad en usa" },
  { name: "Chapu", category: "Pelo caracteristico" },
  { name: "Felix", category: "Universidad en usa" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
