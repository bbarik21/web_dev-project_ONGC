// Navbar.js
import React from 'react';
import PropTypes from 'prop-types';
import logo from '../ongc_logo2.png';
import './Navbar.css'; 

const titleStyle = {
  fontSize: '1.5rem', 
  verticalAlign: 'middle', 
  marginLeft: '10px', 
  fontWeight: 'bold',
  color: 'maroon',
};

const subtitleStyle = {
  fontSize: '0.8rem',
  color: 'black',
  fontStyle: 'italic',
  display: 'block',
};
const imageStyle = {
  verticalAlign: 'middle',
  marginTop: '3px', 
};

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary" style={{ padding: '10px 20px', display: 'flex', justifyContent: 'center' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="/dashboard">
            <img src={logo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" style={imageStyle} />
            <span style={titleStyle}>{props.title}</span>
            <div style={subtitleStyle}>A Maharatna Company</div>
          </a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Oil and Natural Gas Corporation Limited'
}
