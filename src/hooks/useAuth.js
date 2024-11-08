import { useState, useEffect } from 'react';
import axios from 'axios';
import useNotification from './useNotification';

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { notification } = useNotification();
  const loginfn = (credentials) => {
    axios.post('login', {
      email: credentials.username,
      password: credentials.password
    }).then((response) => {
      let getdata = response.data;
      if (getdata.success) {
        let data = getdata.data;
        localStorage.setItem('soliapp_Access_key', data.token);
        localStorage.setItem('soliapp_User', data.name);

        axios.defaults.headers.common = {
          Authorization: `Bearer ${data.token}`
        };
        setIsAuth(true);
        window.location = '/';
        notification("Success", "Sesion iniciada con exito");
      } else {
        notification("Error", "Credenciales incorrectas");
      }
    })
      .catch((error) => {
        notification('Error', "Error ah ocurrido un error al tratar de iniciar sesion");
        console.log(error);

      });
  }
  const logoutfn = () => {
    localStorage.removeItem('soliapp_Access_key');
    setIsAuth(false);
    window.location = '/';
  }
  const verifiyingAuth = () => {
    let isAuthtk = localStorage.getItem('soliapp_Access_key');
    if (isAuthtk) {
      setIsAuth(true)
    }
  }
  const getTkKey = () => {
    let tk = localStorage.getItem('soliapp_Access_key');
    return tk;
  }

  useEffect(() => {
    verifiyingAuth();
  }, [])

  return { isAuth, loginfn, getTkKey, logoutfn }
}

export default useAuth
