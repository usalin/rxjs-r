import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Pokemon from './components/Pokemon';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/:id' element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
