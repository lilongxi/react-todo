import React,{Component} from 'react';
import Header from './header';
import {observer} from 'mobx-react';
import store from '../mobx/store';
import localStorage from '../mobx/local';

import { Collapse} from 'antd';
const Panel = Collapse.Panel;

@observer
class Article extends Component {
	
	constructor(){
		super();
		this.state = {
			fetch:localStorage.fetch(),
		}
	}
	
	componentWillMount(){
		
		
	}

	render () {
		return (
			<div className = "App-article">
			   <Header store={store}/>
			   <Collapse bordered={false} defaultActiveKey={this.props.match.params.id}>
			   
			   {
			   	this.state.fetch.map((item) => item.id === this.props.match.params.id &&
			   	(
			   		<Panel header={item.title} key={item.id}>
  		 				<p>作者:{item.author}&#12288;&#12288;发布时间:{item.publishTime}&#12288;&#12288;
  		 				完成状态:{item.complete === true ? "已完成" : "未完成"}
  		 				</p>
  		 				<block>描述:{item.distract}</block>
  		 				<p>内容:{item.content}</p>
  					</Panel>
			   	)
			   	)
			   }
			   
			  </Collapse>
				
			</div>
		)
	}
}

export default Article;
