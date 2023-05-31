import React, { useState } from 'react';
import { useDispatch,  } from 'react-redux';
import FacebookLogin from '@greatsumini/react-facebook-login';

import {
  attemptLogin,
  loginWithToken,
  register,
  updateAuth,
  logout
} from '../store/auth';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const onChange = ev => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async ev => {
    ev.preventDefault();
    await dispatch(attemptLogin(credentials));
  };

  const responseFacebook = async response => {
    if (response.status !== 'unknown') {
      const { userID, name, email, picture } = response;
      const auth = {
        userID,
        name,
        email,
        picture
      };
      await dispatch(updateAuth(auth));
    } else {
      await dispatch(logout());
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input
          placeholder='username'
          value={credentials.username}
          name='username'
          onChange={onChange}
        />
        <input
          placeholder='password'
          name='password'
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
      <FacebookLogin
        appId="189486938370592"
        autoLoad={false}
        fields="name,email,picture"
        onClick={responseFacebook}
        callback={responseFacebook}
      />
    </div>
  );
};

export default Login;










// import React, { useState } from 'react';
// import { attemptLogin } from '../store';
// import { useDispatch } from 'react-redux';

// const Login = ()=> {
//   const dispatch = useDispatch();
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: ''
//   });

//   const onChange = ev => {
//     setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
//   };

//   const login = (ev)=> {
//     ev.preventDefault();
//     dispatch(attemptLogin(credentials));
//   };
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={ login }>
//         <input
//           placeholder='username'
//           value = { credentials.username }
//           name = 'username'
//           onChange = { onChange }
//           />
//         <input
//           placeholder='password'
//           name = 'password'
//           value={ credentials.password }
//           onChange = { onChange }
//         />
//         <button>Login</button>
        
//       </form>
//       <div class="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-use-continue-as="true"></div>
//     </div>
//   );
// };

// export default Login;
