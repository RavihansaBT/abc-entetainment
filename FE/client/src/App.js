import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
// Screens
import AlbumScreen from './screens/AlbumScreen';

function App() {
  return (
    <div className="App">
     <Router>
      <main>
        <Switch>
          <Route exact path='/' component={AlbumScreen} />
        </Switch>
      </main>
    </Router>
    </div>
  );
}

export default App;
