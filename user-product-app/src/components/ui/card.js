// card.js
import React from 'react';

export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="card-title">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className="card-footer">{children}</div>;
};
