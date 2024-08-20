import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import './AssetMaster.css';

const AssetMaster = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: '',
    dateOfEntry: '',
    value: '',
    amcExpiryDate: ''
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAssets();
    fetchAlerts();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/assets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/assets/alerts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsset)
      });

      if (response.ok) {
        fetchAssets();
        fetchAlerts(); 
        setNewAsset({
          name: '',
          category: '',
          dateOfEntry: '',
          value: '',
          amcYears: '',
          amcMonths: ''
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to add asset');
      }
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Error adding asset');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6}>
          <div className="form-section">
            <h2>Asset Master</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formAssetName">
                <Form.Label>Asset Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter asset name"
                  name="name"
                  value={newAsset.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAssetCategory">
                <Form.Label>Asset Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={newAsset.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Software">Software</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fire Extinguishers">Fire Extinguishers</option>
                  <option value="Biometric">Biometric</option>
                  <option value="IT Equipment">IT Equipment</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDateOfEntry">
                <Form.Label>Date of Entry</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfEntry"
                  value={newAsset.dateOfEntry}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAssetValue">
                <Form.Label>Asset Value</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Enter asset value"
                  name="value"
                  value={newAsset.value}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formAMCExpiryDate">
                <Form.Label>AMC Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="amcExpiryDate"
                  value={newAsset.amcExpiryDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Add Asset
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6}>
          <div className="alert-section">
            <h2>AMC Expiry Alerts</h2>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <Alert key={index} variant="danger">
                  Asset "{alert.name}" (Category: {alert.category}) is expiring on {alert.amcExpiryDate}
                </Alert>
              ))
            ) : (
              <Alert variant="success">No assets are expiring within the next month.</Alert>
            )}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <div className="list-section">
            <h2>Asset List</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Date of Entry</th>
                  <th>Value</th>
                  <th>AMC Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {assets.length > 0 ? (
                  assets.map((asset, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{asset.name}</td>
                      <td>{asset.category}</td>
                      <td>{asset.dateOfEntry}</td>
                      <td>{asset.value}</td>
                      <td>{asset.amcExpiryDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No assets available.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AssetMaster;
