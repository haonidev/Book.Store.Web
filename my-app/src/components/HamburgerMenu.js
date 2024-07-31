import React, { useState } from 'react';
import { FaBars, FaBook, FaUser, FaVideo, FaShoppingCart, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <FaBars className="menu-icon" onClick={toggleMenu} />
      <div className={`menu-content ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/assunto"><FaTags /> Assunto</Link></li>
          <li><FaUser /> Autor</li>
          <li><FaVideo /> Canal</li>
          <li><FaBook /> Livros</li>
          <li><FaShoppingCart /> Venda</li>
        </ul>
      </div>
    </div>
  );
}

export default HamburgerMenu;