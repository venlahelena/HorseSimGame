import React from "react";
import type { Horse } from "../../../services/api";

interface CardProps {
  children: React.ReactNode;
  horse?: Horse;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, horse, className = "", onClick }) => (
  <div className={`shared-card ${className}`} onClick={onClick}>
    {horse && (
      <div className="card-horse-info">
        <div><strong>{horse.name}</strong></div>
        <div>{horse.breed} · {horse.age} y/o · {horse.gender}</div>
        <div>Speed: {horse.stats?.speed ?? "?"}</div>
        <div>Stamina: {horse.stats?.stamina ?? "?"}</div>
        <div>Agility: {horse.stats?.agility ?? "?"}</div>
        <div>Coat: {horse.traits?.coatColor ?? "?"}, Markings: {horse.traits?.markings ?? "?"}</div>
      </div>
    )}
    {children}
  </div>
);

export default Card;