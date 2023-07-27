import React from 'react';

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => <div className="card-border">{children}</div>;
export default Card;
