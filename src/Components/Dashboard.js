import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCheck, faCogs, faSignOutAlt, faDesktop, faWrench, faBook } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CollapsibleSidebar.css';
import Navbar from './Navbar';
import AssetMaster from './assetmaster';
import Software from './software';
import Readings from './readings';
import Attendance from './attendance';

function Dashboard({ setSelectedOption }) {
  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card card-asset-master" onClick={() => setSelectedOption('AssetMaster')}>
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faDesktop} className="card-icon" />
            <h5 className="card-title">Asset Master</h5>
            </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card card-software" onClick={() => setSelectedOption('Software')}>
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faWrench} className="card-icon" />
            <h5 className="card-title">Software</h5>
            </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card card-readings" onClick={() => setSelectedOption('Readings')}>
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faBook} className="card-icon" />
            <h5 className="card-title">Readings</h5>
           </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card card-attendance" onClick={() => setSelectedOption('Attendance')}>
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faUserCheck} className="card-icon" />
            <h5 className="card-title">Attendance</h5>
           </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSidebar() {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [name, setUserName] = useState('');

  const storedUserData = sessionStorage.getItem('loggedInUser');

  useEffect(() => {
    // Retrieve user's name from sessionStorage
    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserName(userData.name);
    } else {
      console.log('User data not found in sessionStorage');
    }
  }, []);


  let content;
  switch (selectedOption) {
    case 'Dashboard':
      content = <Dashboard setSelectedOption={setSelectedOption} />;
      break;
    case 'AssetMaster':
      content = <AssetMaster />;
      break;
    case 'Software':
      content = <Software />;
      break;
    case 'Readings':
      content = <Readings />;
      break;
    case 'Attendance':
      content = <Attendance />;
      break;
    default:
      content = <Dashboard setSelectedOption={setSelectedOption} />;
  }

  return (
    <>
      <Navbar title={'Oil and Natural Gas Corporation Limited'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="sidebar">
              <div className="offcanvas-md offcanvas-end" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center gap-2 active" onClick={() => setSelectedOption('Dashboard')} href="#">
                        <FontAwesomeIcon icon={faHome} /> Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedOption('AssetMaster')} href="#">
                        <FontAwesomeIcon icon={faDesktop} /> Asset Master
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedOption('Software')} href="#">
                        <FontAwesomeIcon icon={faWrench} /> Software
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedOption('Readings')} href="#">
                        <FontAwesomeIcon icon={faBook} /> Readings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedOption('Attendance')} href="#">
                        <FontAwesomeIcon icon={faUserCheck} /> Attendance
                      </a>
                    </li>
                  </ul>

                  <hr className="my-3" />

                  <ul className="nav flex-column mb-auto">
                    <li className="nav-item">
                     
                    </li>
                    <li className="nav-item">
                     
                      <a className="nav-link d-flex align-items-center gap-2" onClick={() => setSelectedOption('./Login')} href="./">
                        <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10 ml-md-3">
            <div className="content">
              <h2>Welcome, {name}</h2> {/* userName is now defined */}
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollapsibleSidebar;
