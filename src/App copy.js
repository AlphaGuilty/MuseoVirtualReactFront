import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Texture } from './components';
import { AdminPage } from './components';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          {/* Componente para la página /admin */}
          <AdminPage />
        </Route>
        <Route path="/">
          {/* Componente para la página principal */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
