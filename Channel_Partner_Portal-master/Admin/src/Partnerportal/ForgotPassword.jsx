import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import necessary functions from Firebase auth module
import { auth } from '../firebase'; // Assuming you've initialized Firebase elsewhere
import backgroundImg from '../images/3.png';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email); // Use sendPasswordResetEmail function with initialized auth and email
      setResetPasswordSuccess(true);
      setResetPasswordError('');
    } catch (error) {
      setResetPasswordSuccess(false);
      setResetPasswordError(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <MDBContainer className="my-5" style={{ maxWidth: '550px', padding: '5px' }}>
        <MDBCard
          style={{
            border: '2px solid orange',
            backgroundColor: '#f9f9f9',
            borderRadius: '20px',
            boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MDBCardBody className="d-flex flex-column align-items-center">
            <h1
              style={{
                marginTop: '40px',
                marginBottom: '25px',
                textAlign: 'center',
                fontSize: '28px',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
              }}
            >
              Forgot Password
            </h1>
            <form onSubmit={handleResetPassword} style={{ width: '80%' }}>
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    color: '#555',
                  }}
                  htmlFor="email"
                >
                  <b>Email</b>
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="email"
                  type="email"
                  size="lg"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    color: '#333',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                type="submit"
                required
                style={{
                  width: '100%',
                  minWidth: '200px',
                  height: '50px',
                }}
              >
                Reset Password
              </MDBBtn>
            </form>
            {resetPasswordSuccess && (
              <p
                style={{
                  color: 'green',
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                Password reset email sent successfully!
              </p>
            )}
            {resetPasswordError && (
              <p
                style={{
                  color: 'red',
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                }}
              >
                {resetPasswordError}
              </p>
            )}
            <div className="text-center mt-4">
              <Link to="/portal" style={{ fontSize: '16px', color: '#000' }}>
                Back to Login
              </Link>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default ForgotPassword;
