import React from 'react';

const SideNavbar = () => {
  const navItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div className="side-navbar" style={{ position: '', top: '20px', left: '20px' }}>
      <ul className="nav flex-column">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a href="#" className="nav-link">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
