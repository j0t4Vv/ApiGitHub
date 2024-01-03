import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState("");
  const [perfil, setPerfil] = useState(null);
  const [repositorios, setRepositorios] = useState([]);

  function handleBuscar() {
    axios.get(`https://api.github.com/users/${usuario}`)
      .then(response => setPerfil(response.data));
    axios.get(`https://api.github.com/users/${usuario}/repos`)
      .then(response => setRepositorios(response.data));
  }

  return (
    <div className='main'>

      <div className='App'>
        <h1>GitHub Finder</h1>
      </div>
      
      <div className='search'> 
        <h2>Search for a user:</h2>

        <div className='search-container'>
          <input type="text" placeholder='Type the username: ' value={usuario} onChange={e => setUsuario(e.target.value)} />
          <button onClick={handleBuscar}>Search</button>
        </div>


      </div>

      {perfil && (
        <div className='User'>
          <h2>User Profile</h2>
          <img src={perfil.avatar_url} alt={perfil.login} />
          
          <div className='name'>
          <h2>{perfil.name}</h2>
          <p>Username: {perfil.login}</p>
          </div>

          <div className='stats'>
          <div><p>Followers: {perfil.followers}</p></div>
          <div><p>Following: {perfil.following}</p></div>
          </div>
          
        </div>
      )}
      {perfil && repositorios && (
        <div className='repos'>
          <h2>Repositories</h2>
            {repositorios.map(repo => (
              <div 
                key={repo.id}>
                <div className='repo'>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                </div>
              </div>
            ))}
          
        </div>
      )}     
    </div>
  );
}

export default App;