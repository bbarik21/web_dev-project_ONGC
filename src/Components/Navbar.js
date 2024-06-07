import React from 'react'
import logo from '../logo.svg'
import PropTypes from 'prop-types'


export default function Navbar(props)
{
    return(
        <nav className="navbar navbar-expand-md bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Logo" width="40" height="30" className="d-inline-block align-text-top"/>
              {props.title}
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav me-auto mb-lg-0">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                <a className="nav-link" href="/">Features</a>
                <a className="nav-link" href="/">Pricing</a>
                <a className="nav-link disabled me-3" aria-disabled="true">Disabled</a>
            </div>
            
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> 
          </div>
        </div>
      </nav>
    );
}

Navbar.propTypes = {
  title: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'Set Title here'
}