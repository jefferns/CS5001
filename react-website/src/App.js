import './App.css';
import Login from './components/Login'
import { fetchAccessTokens } from './components/Login';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';



function App() {
  const [token, setToken] = useState('');

  const loadToken = (code) => {
    fetchAccessTokens(code)
    .then(response => response.json())
    .then(response => {
      if(!response.access_token) return;
      setToken(response.access_token);
    });
  };

  useEffect(()=> {
    if(token) return;
    const queryString = window.location.search;
    if(!queryString) return;
    const urlParams = new URLSearchParams(queryString);
    const code_param = urlParams.get('code');
    if(!code_param) return;
    loadToken(code_param);
  }, []);

  return (
    <div className="App">
      { token
        ? <Dashboard token={token}/>
        : <Login/>
      }
    </div>
  );
}

export default App;
