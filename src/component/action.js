import React,{Component} from 'react';
import { Icon, Input, Button,notification,Modal,message} from 'antd';
const Search = Input.Search;
const confirm = Modal.confirm;

import moment from 'moment';
import {observer} from 'mobx-react';

@observer
class Action extends Component{
	
	constructor(){
		super();
		this.state = {
			
		}
	}
	
	showItem =()=> {
		this.props.store.showitem()
	}
	
	completeItem =()=> {
		this.props.store.completeitem()
	}
	
	undoneItem =()=> {
		this.props.store.undoneitem()
	}
	
	onSearch =(value)=>{
		this.props.store.searchitem(value)
	}
	
	delItem =()=> {
		this.props.store.delitem();
	}
	
	addItem =()=> {
		this.props.store.status === "none" ? this.props.store.addpage(1) : 
		notification['warning']({
		    message: '这是一个非常重要的提示',
		    description: '过分了啊,不要在点了,你已经在添加页面了!',
		 });
	}
	
	render () {
	
		return (
			<div className="App-action">		
				<div className="App-action-con">
				<Button type="primary" icon="meh-o" onClick={this.showItem.bind(this)}>全部</Button>&#12288;
				<Button type="default" icon="smile" onClick={this.completeItem.bind(this)}>已完成</Button>&#12288;
				<Button type="danger" icon="frown" onClick={this.undoneItem.bind(this)}>未完成</Button>&#12288;
				<Button type="dashed" icon="plus" onClick={this.addItem.bind(this)}>添加</Button>&#12288;
				<Button type="dashed" icon="minus" onClick={this.delItem.bind(this)}>删除</Button>&#12288;
				<Search placeholder="玩命搜索框"  style={{width:360}} onSearch={this.onSearch}/>&#12288;
				</div>
			</div>
		)
	}
	
}



export default Action