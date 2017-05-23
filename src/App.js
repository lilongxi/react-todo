import React, {Component} from 'react';
//import logo from './logo.svg';

//styles
import './App.css';
import 'antd/dist/antd.css';

//mock
import './mock/mock';
import store from './mobx/store';

//mobx
import {useStrict} from 'mobx';
import {observer} from 'mobx-react';
import Header from './component/header';
import Body from './component/body';
import Action from './component/action';
import AddItem from './component/addItem';


useStrict(false);
@observer
class App extends Component {

	contructor(){
		
	}
	
	componentDidMount(){
		
	}

  render() {
    return (
      <div className="App">
      	<Header store={store} />
      	<div className="App-inner">
      		<Action store={store} />
      		{store.status === "none" ?
	      		(<div className="App-inner-list App-animate">
	    				<Body store={store} />
	      		</div>)
	      	:
    			(<div className="App-inner-add App-animate">
    				<AddItem store={store} />
    			</div>)
    			}
    		</div>
      </div>
    )
  }
}

export default App;
