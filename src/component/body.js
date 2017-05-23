import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Link } from 'react-router-dom'


import {observer} from 'mobx-react';

import { Spin,Card,Pagination,Badge,Tooltip,Button,Col, Row,notification,Modal,message,Checkbox } from 'antd';
const confirm = Modal.confirm;
import moment from 'moment';
import _ from 'lodash';

@observer
class Body extends Component {
	
	constructor(){
		super();
	}
	
	onChange = (page, pageSize) =>{
		console.log(page+','+pageSize);
	}
	
	completeThis =(idx)=> {
		let index = _.findIndex(this.props.store.test_todo,function(chr){
			return chr.id == idx;
		});
		
		this.props.store.test_todo[index].complete === true ? 
			notification['warning']({
		    message: '这是一个非常重要的提示',
		    description: `<${this.props.store.test_todo[index].title}>已经完成,您不能将其重置!`,
			})
		:
			this.props.store.completethis(idx)
	}
	
	delThis =(idx,title)=> {
		let that = this;
		confirm({
				    title: '这是一个删除信息提示框',
				    content: `是否确认删除<${title}>`,
				    onOk () {
				    		that.props.store.delthis(idx);
			 			message.success('操作成功！');
				    },
				    onCancel() {
				    		message.info('取消操作！');
				    },
				 });		  	
		
	}
	
	onChanged =(item,e)=> {
		//把勾选状态和id传入store
		this.props.store.checkthis(e.target.checked,item.id)
		
	}
	
	render () {
		return (
			
			<div className = "App-body">
				<div className ="App-card-container">
				
				<Row>
				
				{this.props.store.test_todo.length === 0 ?  <div className="App-spin"><Spin size="large" tip="玩命加载中..."/></div> : 
				this.props.store.test_todo.map((item,index) => 
				<Col md={8} sm={12} xs={24}>
				<div className="App-card">
				
				<Card title={item.title} key={index} id={item.id} extra={<span><Checkbox checked={item.checked === true && "checked"} onChange={this.onChanged.bind(this,item)}></Checkbox></span>}>
				  <p className="dd">作者:{item.author}    
				  	<span className="App-status">
				  		{
				  			item.complete === true ?
				  			<Badge status="success" /> : 
				  			<Badge status="processing"/>
				  		}
				  	</span>
				  </p>
			      <p className="App-disc">事件描述:{item.distract}</p>
			      <p> <span className="App-publish">发布时间:{item.publishTime}</span> | <span className="App-finish">结束时间:{item.finishTime}</span> </p>
			      
			      <div className="App-actions">
			      {
			      		item.complete === true ? 
			      		<Tooltip placement="top" title="已完成"><span onClick={this.completeThis.bind(this,item.id)}><Button type="default" shape="circle" icon="smile-o" /></span></Tooltip> : 
			      		<Tooltip placement="top" title="未完成"><span onClick={this.completeThis.bind(this,item.id)}><Button type="default" shape="circle" icon="frown-o" /></span></Tooltip>
			      }
			      <Tooltip placement="top" title="详情"><span><Link to={{pathname:'/article/'+item.id}}><Button type="dashed" shape="circle" icon="file-text" /></Link></span></Tooltip>
			      <Tooltip placement="top" title="删除"><span onClick={this.delThis.bind(this,item.id,item.title)}><Button type="danger" shape="circle" icon="delete" /></span></Tooltip>	      
			  	 </div>
			  	</Card>
			  	</div>
			  	</Col>
				)}
				
				</Row>
				</div>
				<div className = "App-Pagination">
					<Pagination defaultCurrent={1} total={50} onChange={this.onChange} />
				</div>
			</div>
			
		)
	}
}

export default Body