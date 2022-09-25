import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './router/Router';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;
