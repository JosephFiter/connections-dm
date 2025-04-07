export const friends = [
  { name: "Suaya", category: "Foto de perfil haciendo deporte" },
  { name: "Pava", category: "Reconocidos por su apodo" },
  { name: "Felix", category: "Foto de perfil haciendo deporte" },
  { name: "Castre", category: "Reconocidos por su apodo" },
  { name: "Fefo", category: "Federico" },
  { name: "Saban", category: "Federico" },
  { name: "Panter", category: "Reconocidos por su apodo" },
  { name: "Raizman", category: "Federico" },
  { name: "Ian", category: "Foto de perfil haciendo deporte" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
  