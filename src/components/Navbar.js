import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-heading">Diabetes Detection</h1>
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/contact" className="navbar-link">
            Contact
          </Link>
        </div>
      </div>

      <style jsx>{`
        /* Navbar Styles */
        .navbar {
          background-color: #2c3e50;
          color: #ffffff;
          padding: 10px 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-heading {
          font-size: 24px;
          font-weight: bold;
        }

        .navbar-links {
          display: flex;
          gap: 20px;
        }

        .navbar-link {
          text-decoration: none;
          color: #ffffff;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .navbar-link:hover {
          background-color: #34495e;
        }

        @media (max-width: 768px) {
          .navbar-heading {
            font-size: 20px;
          }

          .navbar-link {
            font-size: 14px;
            padding: 6px 12px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
