import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {
    const logInFun = (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        axios
            .post('/users/login', { email, password })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        axios
            .get('/users/')
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
    }, []);
    const logoutFun = () => {
        axios
            .get('/users/logout')
            .then((res) => console.log(res.data))
            .catch((e) => console.log(e));
    };
    return (
        <div>
            <form className='form' onSubmit={logInFun}>
                <h2>User Login</h2>
                <label>
                    <h4>Email</h4>
                </label>
                <input
                    type='email'
                    name='email'
                    placeholder='email..'
                    className='form-control'
                />
                <label>
                    <h4>Password</h4>
                </label>
                <input
                    type='password'
                    name='password'
                    placeholder='password..'
                    className='form-control'
                />
                <div className='text-center upSpace'>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </form>
            <div className='text-center upSpace'>
                <button className='btn btn-danger' onClick={logoutFun}>
                    LogOut
                </button>
            </div>
        </div>
    );
};
export default Login;
