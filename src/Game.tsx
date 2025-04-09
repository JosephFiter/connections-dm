import React, { useState } from 'react';
import { friends } from './FriendsData';
import FriendCard from './FriendCard';
import './Game.css';

interface Group {
  category: string;
  members: { name: string; image: string }[];
  isPlayerCorrect?: boolean;
}

const Game: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [correctGroups, setCorrectGroups] = useState<Group[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lives, setLives] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleSelect = (name: string) => {
    if (gameOver) return;
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const getAllCorrectGroups = () => {
    const categories = [...new Set(friends.map((f) => f.category))];
    return categories.map((category) => {
      const isPlayerCorrect = correctGroups.some((g) => g.category === category);
      return {
        category,
        members: friends
          .filter((f) => f.category === category)
          .map((f) => ({ name: f.name, image: f.image })),
        isPlayerCorrect: isPlayerCorrect,
      };
    });
  };

  const checkGroup = () => {
    if (selected.length === 3) {
      // Obtener las categorías de los elementos seleccionados
      const categories = selected.map((name) => friends.find((f) => f.name === name)?.category);

      // Contar cuántos elementos pertenecen a la categoría más común
      const categoryCounts: { [key: string]: number } = {};
      categories.forEach((cat) => {
        if (cat) categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      const maxMatches = Math.max(...Object.values(categoryCounts));
      const dominantCategory = Object.keys(categoryCounts).find(
        (cat) => categoryCounts[cat] === maxMatches
      );

      if (maxMatches === 3) {
        // Grupo completamente correcto
        const newGroup = {
          category: dominantCategory || "Desconocido",
          members: selected.map((name) => ({
            name,
            image: friends.find((f) => f.name === name)?.image || "",
          })),
          isPlayerCorrect: true,
        };
        const updatedGroups = [...correctGroups, newGroup];
        setCorrectGroups(updatedGroups);
        if (updatedGroups.length === 3) {
          setMessage("🎉 ¡Ganaste! 🎉");
        } else {
          setMessage("✅ ¡Grupo correcto!");
        }
      } else {
        // Grupo parcial o incorrecto
        const remainingLives = lives - 1;
        setLives(remainingLives);
        if (remainingLives <= 0) {
          setMessage("💀 ¡Perdiste! Sin vidas restantes.");
          setGameOver(true);
        } else if (maxMatches === 2) {
          setMessage(`⚠️ Tienes 2 bien. Te quedan ${remainingLives} vidas.`);
        } else {
          setMessage(`❌ Grupo incorrecto. Te quedan ${remainingLives} vidas.`);
        }
      }
      setSelected([]);
    }
  };

  const allGroups = gameOver ? getAllCorrectGroups() : correctGroups;

  return (
    <div className="game-container">
      <h1 className="champions-title">Champions Connections</h1>
      {message && <h2 className="game-message">{message}</h2>}
      {!gameOver && <h3 className="lives-display">Vidas restantes: {lives}</h3>}
      <div className="correct-groups">
        {allGroups.map((group, index) => (
          <div
            key={index}
            className={`group-container ${group.isPlayerCorrect ? 'correct' : 'incorrect'}`}
          >
            <h3>{group.category}</h3>
            <div className="group-members">
              {group.members.map((member) => (
                <FriendCard
                  key={member.name}
                  name={member.name}
                  image={member.image}
                  selected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {!gameOver && (
        <div className="friends-grid">
          {friends
            .filter((f) => !correctGroups.some((g) => g.members.some((m) => m.name === f.name)))
            .map((friend) => (
              <FriendCard
                key={friend.name}
                name={friend.name}
                image={friend.image}
                selected={selected.includes(friend.name)}
                onSelect={() => handleSelect(friend.name)}
              />
            ))}
        </div>
      )}
      {!gameOver && (
        <button
          onClick={checkGroup}
          disabled={selected.length !== 3}
          className="confirm-button"
        >
          Confirmar Grupo
        </button>
      )}
    </div>
  );
};

export default Game;