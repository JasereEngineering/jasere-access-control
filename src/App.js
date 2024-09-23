import Button from './components/Button';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import { AppContext } from './CreateUserContext';
import AnotherPage from './pages/AnotherPage';
import Home from './pages/Home';

function App({children}) {
  return (
    <Home />
  );
}

export default App;
