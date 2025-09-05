import React from 'react';

type FooterProps = {
  onTechStackClick: () => void;
};

export const Footer = ({ onTechStackClick }: FooterProps) => (
  <footer className="footer">
    <p>&copy; 2024 FreshCart. All rights reserved.</p>
    <button onClick={onTechStackClick} className="footer-link">
      View Project Info
    </button>
  </footer>
);
