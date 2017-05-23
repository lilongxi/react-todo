import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import App from './App';
import Article from './component/article';

class RouterList extends React.Component {
  render() {
    return (
    	 <Router>
	      <div>
	          <Route exact path='/' component={App}/>
	          <Route path='/article/:id' component={Article}/>
	      </div>
      </Router>
    )
  }
}

export default RouterList