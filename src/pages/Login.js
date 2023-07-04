import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../features/auth/authActions';
import Error from '../components/Error';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Login = () => {
  const { loading, userInfo, userToken, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (userToken) {
      navigate('/user-profile');
    }
  }, [userToken, dispatch, navigate]);

  const submitForm = (data) => {
    console.log(data.email);
    dispatch(userLogin(data));
  };

  return (
    <div className='form_container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(submitForm)}>
        {error && <Error>{error}</Error>}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' className='form-input' {...register('email')} required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-input' {...register('password')} required />
        </div>
        <button type='submit' className='button' disabled={loading}>
          {loading ? <Spinner /> : 'Login'}
        </button>
        <span>
          Don't have an account? <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
