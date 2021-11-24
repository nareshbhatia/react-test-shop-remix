import React from 'react';
import { Link } from 'remix';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar__brand">React Test Shop</span>

      <ul className="flex-1">
        <li>
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="navbar__link" to="/orders">
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};
