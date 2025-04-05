import React, { useState } from 'react';
import { friends } from './FriendsData';
import FriendCard from './FriendCard';
import './Game.css';

interface Group {
  category: string;
  members: { name: string; image: string }[];
  isPlayerCorrect?: boolean; // Nueva propiedad para distinguir grupos del jugador
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
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const getAllCorrectGroups = () => {
    const categories = [...new Set(friends.map(f => f.category))];
    return categories.map(category => {
      const isPlayerCorrect = correctGroups.some(g => g.category === category);
      return {
        category,
        members: friends
          .filter(f => f.category === category)
          .map(f => ({ name: f.name, image: f.image })),
        isPlayerCorrect: isPlayerCorrect // Marcamos si el jugador lo acertó
      };
    });
  };

  const checkGroup = () => {
    if (selected.length === 3) {
      const category = friends.find(f => f.name === selected[0])?.category;
      if (selected.every(name => friends.find(f => f.name === name)?.category === category)) {
        const newGroup = {
          category: category || "Desconocido",
          members: selected.map(name => ({
            name,
            image: friends.find(f => f.name === name)?.image || ""
          })),
          isPlayerCorrect: true // Marcamos como correcto del jugador
        };
        const updatedGroups = [...correctGroups, newGroup];
        setCorrectGroups(updatedGroups);
        if (updatedGroups.length === 3) {
          setMessage("🎉 ¡Ganaste! 🎉");
        } else {
          setMessage("✅ ¡Grupo correcto!");
        }
      } else {
        const remainingLives = lives - 1;
        setLives(remainingLives);
        if (remainingLives <= 0) {
          setMessage("💀 ¡Perdiste! Sin vidas restantes.");
          setGameOver(true);
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
          {friends.filter(f => !correctGroups.some(g => g.members.some(m => m.name === f.name))).map((friend) => (
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