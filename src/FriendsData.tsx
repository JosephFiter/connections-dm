export const friends = [
  { name: "Castre", category: "Tienen auto propio" },
  { name: "Vito", category: "Llegaron tarde al partido de hoy" },
  { name: "Ian", category: "Tienen auto propio" },
  { name: "Setton", category: "Llegaron tarde al partido de hoy" },
  { name: "Felix", category: "Tienen auto propio" },
  { name: "Fefo", category: "Ocuparon el cuarto en Pinamar" },
  { name: "Mauri", category: "Ocuparon el cuarto en Pinamar" },
  { name: "Pava", category: "Llegaron tarde al partido de hoy" },
  { name: "Burstein", category: "Ocuparon el cuarto en Pinamar" },
].map(friend => ({
  ...friend,
  image: `${friend.name.toLowerCase()}.png`
}));
