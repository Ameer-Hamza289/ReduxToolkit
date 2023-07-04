import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../components/Error';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { registerUser } from '../features/auth/authActions';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state variable

  useEffect(() => {
    if (userInfo) {
      navigate('/user-profile');
    }
  }, [navigate, userInfo]);

  const submitForm = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
    setRegistrationSuccess(true); // Set registration success to true
    reset(); // Reset the form fields
  };

  return (
    <div className="form_container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        {registrationSuccess && <div className="success-message">Registration successful!</div>}
        <div>
          <label htmlFor="firstName">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            {...register('firstName')}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register('email')}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            {...register('password')}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Spinner /> : 'Register'}
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
