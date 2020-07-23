
import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const Home = React.lazy(() => import('./pages/home'));
const RepositoryDetails = React.lazy(() => import('./pages/repoDetails'))

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/repository/:login/:name" name="Test" render={props => <RepositoryDetails {...props}/>} />
              <Route exact path="/" name="Home" render={props => <Home {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
      </div>
    );
  }
}

export default App;
