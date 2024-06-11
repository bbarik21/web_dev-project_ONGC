import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    countryCode: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(formValues.password === value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/signup', formValues);
      alert(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 vw-100 bg-secondary'>
      <div className='bg-white rounded p-3 w-75'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="w-100"><strong>Name</strong></label>
            <input 
              type="text" 
              placeholder='Enter Name' 
              className='form-control rounded-2' 
              id="name" 
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="w-100"><strong>Email</strong></label>
            <input 
              type="email" 
              placeholder='Enter Email' 
              className='form-control rounded-2' 
              id="email" 
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 d-flex">
            <div className="me-2 w-25">
              <label htmlFor="countryCode" className="w-100"><strong>Country Code</strong></label>
              <select 
                className='form-control rounded-2' 
                id="countryCode" 
                name="countryCode"
                value={formValues.countryCode}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
              </select>
            </div>
            <div className="flex-grow-1">
              <label htmlFor="phone" className="w-100"><strong>Phone Number</strong></label>
              <input 
                type="tel" 
                placeholder='Enter Phone Number' 
                className='form-control rounded-2' 
                id="phone" 
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="w-100"><strong>Password</strong></label>
            <input 
              type="password" 
              placeholder='Enter Password' 
              className='form-control rounded-2' 
              id="password" 
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="w-100"><strong>Confirm Password</strong></label>
            <input 
              type="password" 
              placeholder='Confirm Password' 
              className='form-control rounded-2' 
              id="confirmPassword" 
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
            {!passwordsMatch && (
              <div className="text-danger mt-1">Passwords do not match</div>
            )}
          </div>
          <div className="mb-3 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="terms" 
              onChange={handleCheckboxChange} 
              checked={isAgreed} 
            />
            <label className="form-check-label text-start" htmlFor="terms">
              I agree to the terms and conditions
            </label>
          </div>
          <button type="submit" className='btn btn-submit w-100 rounded-2 border-dark' disabled={!isAgreed || !passwordsMatch}>
            <strong>Submit</strong>
          </button>
        </form>           
      </div>
    </div>
  );
}

export default Signup;
