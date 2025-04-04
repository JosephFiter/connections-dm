import React from 'react';

interface FriendCardProps {
  name: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, image, selected, onSelect }) => {
  return (
    <div 
      className={`friend-card ${selected ? 'selected' : ''}`} 
      onClick={onSelect}
    >
      <img src={image} alt={name} className="friend-image" />
      <p>{name}</p>
    </div>
  );
};

export default FriendCard;