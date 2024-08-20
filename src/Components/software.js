import React, { useState } from 'react';
import axios from 'axios';

const SoftwareForm = () => {
  const [softwareData, setSoftwareData] = useState({
    name: '',
    licenseType: '',
    amc: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSoftwareData({
      ...softwareData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/software', softwareData);
      alert('Software details submitted successfully');
      console.log('Software details submitted successfully:', response.data);
      // Handle success scenario (e.g., show success message)
    } catch (error) {
      console.error('Error submitting software details:', error);
      // Handle error scenario (e.g., show error message)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow rounded">
            <h2 className="text-center mb-4"><strong>Software Details</strong></h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={softwareData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="licenseType" className="form-label">License Type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="licenseType"
                  name="licenseType"
                  value={softwareData.licenseType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amc" className="form-label">AMC (in years):</label>
                <input
                  type="number"
                  className="form-control"
                  id="amc"
                  name="amc"
                  value={softwareData.amc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareForm;
