import React, { useState } from 'react';
import { friends } from './FriendsData';
import FriendCard from './FriendCard';
import './Game.css';
// Si tienes una imagen local, descomenta y ajusta la ruta:
// import logo from './path/to/your/logo.png'; // Ajusta la ruta según tu estructura

const Game: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [correctGroups, setCorrectGroups] = useState<Group[]>([]);
  const [message, setMessage] = useState<string>("");
  const [lives, setLives] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  interface Group {
    category: string;
    members: { name: string; image: string }[];
    isPlayerCorrect?: boolean;
  }

  const handleSelect = (name: string) => {
    if (gameOver || lives === null) return;
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const startGame = (mode: 'easy' | 'normal' | 'hard') => {
    switch (mode) {
      case 'easy':
        setLives(Infinity);
        break;
      case 'normal':
        setLives(5);
        break;
      case 'hard':
        setLives(3);
        break;
    }
    setShowModal(false);
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
    if (selected.length === 3 && lives !== null) {
      const categories = selected.map((name) => friends.find((f) => f.name === name)?.category);
      const categoryCounts: { [key: string]: number } = {};
      categories.forEach((cat) => {
        if (cat) categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      const maxMatches = Math.max(...Object.values(categoryCounts));
      const dominantCategory = Object.keys(categoryCounts).find(
        (cat) => categoryCounts[cat] === maxMatches
      );

      if (maxMatches === 3) {
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
        if (lives === Infinity) {
          if (maxMatches === 2) {
            setMessage("⚠️ Tienes 2 bien. ¡Sigue intentando!");
          } else {
            setMessage("❌ Grupo incorrecto. ¡Sigue intentando!");
          }
        } else {
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
      }
      setSelected([]);
    }
  };

  const allGroups = gameOver ? getAllCorrectGroups() : correctGroups;

  return (
    <div className="game-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {/* Logo arriba del modal */}
            <img
              src="logo2.png" // URL de ejemplo, reemplaza con tu logo
              // Si usas una imagen local: src={logo}
              alt="Game Logo"
              className="modal-logo"
            />
            <h2>Elige el modo de juego</h2>
            <button onClick={() => startGame('easy')} className="mode-button">
              Fácil (Vidas ilimitadas)
            </button>
            <button onClick={() => startGame('normal')} className="mode-button">
              Normal (5 vidas)
            </button>
            <button onClick={() => startGame('hard')} className="mode-button">
              Difícil (3 vidas)
            </button>
          </div>
        </div>
      )}
      {!showModal && (
        <>
          <h1 className="champions-title">Champions Connections</h1>
          {message && <h2 className="game-message">{message}</h2>}
          {lives !== Infinity && !gameOver && (
            <h3 className="lives-display">Vidas restantes: {lives}</h3>
          )}
          {lives === Infinity && !gameOver && (
            <h3 className="lives-display">Modo Fácil: Vidas ilimitadas</h3>
          )}
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
        </>
      )}
    </div>
  );
};

export default Game;