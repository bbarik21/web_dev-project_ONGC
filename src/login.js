import { Link } from 'react-router-dom'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

function Login() {
    const [verified,setVerified] = useState(false);
    
    function onChange(){
        setVerified(true);    
    }
    
    return (    
        <div className='d-flex justify-content-center align-items-center vh-100 vw-100 bg-primary'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' className='form-control rounded-2'></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' className='form-control rounded-2'></input>
                    </div>
                    <div>
                        <ReCAPTCHA className='d-flex justify-content-center' sitekey="6Lf3sOQpAAAAAGFNy_gwr9uXKlE1zbnvu1FZ12Xa" onChange={onChange}/>
                        <button className='btn btn-success w-100 rounded-2' disabled={!verified}><strong>Log In</strong></button><br></br>
                        <p>For existing accounts</p>
                        <Link to="/signup" button className='btn btn-default border w-100 bg-light rounded-2 text-decoration-none'><strong>Sign Up</strong></Link>
                        <p>New user?</p>
                    </div>
                </form>           
            </div>
        </div>
    );
}

export default Login
