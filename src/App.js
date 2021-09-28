import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Detail from './views/Detail';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:id">
            <Detail />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
