export const friends = [
  { name: "Suaya", category: "Estudiará em usa" },
  { name: "Vito", category: "Foto de perfil con otra persona" },
  { name: "Raizman", category: "Foto de perfil con otra persona" },
  { name: "Castre", category: "Foto de perfil con otra persona" },
  { name: "Fefo", category: "Estudiará em usa" },
  { name: "Burstein", category: "Se creen buenos en futbol" },
  { name: "Lucacho", category: "Se creen buenos en futbol" },
  { name: "Chapu", category: "Se creen buenos en futbol" },
  { name: "Setton", category: "Estudiará em usa" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
  