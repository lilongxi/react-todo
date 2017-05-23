import React,{Component} from 'react';

import { Form, Icon, Input, Button, Row, Col,DatePicker,notification} from 'antd';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;

import {observer} from 'mobx-react';
import store from '../mobx/store';

//随机生成id，实际是后台生成。
import uid from 'node-uuid';
//生成时间戳
import moment from 'moment';
//对象重写
import _ from 'lodash';


@observer
class AddItemed extends Component {
	
	constructor(){
		super();
	}
	
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	
	      	//对数据重新整合
	      	const o = {
	      		"id":uid.v4(),
	      		"publishTime":moment().format('YYYY-MM-DD'),
	      		"finishTime":moment(values.finishTime._d).format("YYYY-MM-DD"),
	      		"complete":false,
	      		"checked":false
	      	}
	        const newarr = [];
	        const neww = _.assign(values,o);
	        newarr.push(neww);
//	        ajax,post请求成功后push
	        this.props.store.additem(newarr);
	        
	      }
	    });
	  }
	
	onChange =(date, dateString)=> {
		
		let curTime = moment().format('YYYY-MM-DD');
		moment(dateString).isBefore(curTime) && 
		notification['warning']({
		    message: '这是一个非常重要的提示',
		    description: '我深深的认为,结束时间应该在发布时间之后!',
		 });
		 
		 
		 
		
	}
	render () {
		
		const { getFieldDecorator } = this.props.form;
		
		return (
			
			<div className="App-additem">
				<div className ="App-addpage">
				<Row>
				 <Col md={{ span:12, offset:6}} sm={{span:16, offset:4}} xs={{span:20, offset:2}}>
				  <Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
			          {getFieldDecorator('author', {
			            rules: [{ required: true, message: '请输入您的大名!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="作者" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('title', {
			            rules: [{ required: true, message: '请输入待办事项题目!' }],
			          })(
			            <Input prefix={<Icon type="rollback" style={{ fontSize: 13 }} />} type="text" placeholder="标题" />
			          )}
			        </FormItem>
			         <FormItem>
			          {getFieldDecorator('distract', {
			            rules: [{ required: true, message: '描述,描述...' }],
			          })(
			            <Input prefix={<Icon type="enter" style={{ fontSize: 13 }} />} type="text" placeholder="描述" />
			          )}
			        </FormItem>
			         <FormItem>
			          {getFieldDecorator('content', {
			            rules: [{ required: true, message: '请输入待办事项内容!' }],
			          })(
			            <Input prefix={<Icon type="enter" style={{ fontSize: 13 }} />} rows={8} type="textarea" placeholder="内容" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('finishTime', {
			            rules: [{ required: true, message: '请输入待办事项结束时间!' }],
			          })(
			          	<DatePicker onChange={this.onChange} style={{ fontSize: 13 }} placeholder="请输入结束时间!"/>
			          )}
			        </FormItem>
			        <FormItem>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            确认添加
			          </Button>
			        </FormItem>
			      </Form>
			      </Col>
			      </Row>
				</div>
			</div>
			
		)
		
	}
	
}

const AddItem = Form.create()(AddItemed);
export default AddItem