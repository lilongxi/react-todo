import React, {Component} from 'react';

import {observer} from 'mobx-react';

@observer
class Header extends Component {
	render () {
		return (
			  <div className="App-header">
          		<h1 className="App-title"> ☢ mobx-todo-list ☢ </h1>
          		<h3 className="App-subtitle">react+mobx+sass+antd+axios+....</h3>
          		
	          		<div className="App-display">
	          			<span>共有{this.props.store.test_todo.length === 0 ? "?" : this.props.store.test_todo.length}条</span> | 
	          			<span>已完成{this.props.store.test_todo.filter((item) => item.complete).length === 0 && this.props.store.test_todo.length === 0 ? "?" : this.props.store.test_todo.filter((item) => item.complete).length}条</span> | 
	          			<span>未完成{this.props.store.test_todo.filter((item) => !item.complete).length === 0 && this.props.store.test_todo.length === 0 ? "?" : this.props.store.test_todo.filter((item) => !item.complete).length}条</span>
	          		</div>
          		
          		
        		  </div>
		)
	}
}

export default Header