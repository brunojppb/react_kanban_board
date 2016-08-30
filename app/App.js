import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import About from './About';
import Home from './Home';
import Repos from './Repos';
import RepoDetails from './RepoDetails';

class App extends Component {

  render() {
    return(
      <div>
        <header>App</header>
        <menu>
          <ul>
            <li>
              <Link to="/about" activeClassName="active">About</Link>
            </li>
            <li>
              <Link to="/repos" activeClassName="active">Repos</Link>
            </li>
          </ul>
        </menu>
        {/*
          the children prop will render the nested component based
          on the component that was injected by React Router
          */}
        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About} title="About Us"/>
      <Route path="repos" component={Repos}>
        <Route path="details/:repo_name" component={RepoDetails} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));












//
