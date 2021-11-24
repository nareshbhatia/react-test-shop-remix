import React from 'react';
import { NavLink } from 'remix';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar__brand">React Test Shop</span>

      <ul className="flex-1">
        <li>
          <NavLink className="navbar__link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar__link" to="/orders">
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
