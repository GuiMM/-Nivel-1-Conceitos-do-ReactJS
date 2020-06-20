import React, {useState, useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        api.get('/repositories').then(response =>{
          setRepositories(response.data);
        })
    }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: `novo projeto ${Date.now()}`,
      url: 'http://guiguis.com',
      techs: 'teste'
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then();
    
    const newrepo = repositories.filter(x=> x.id!==id);
    setRepositories([...newrepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=> 
          <li key={repository.id}>{repository.title}
            <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
