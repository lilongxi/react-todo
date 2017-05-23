import {observable, useStrict,action,autorun,computed} from 'mobx';

//http请求模块
import Request from '../http/request';
import _ from 'lodash';
//localstorage存储
import localStorage from './local';

import { notification, Modal, message } from 'antd';
const confirm = Modal.confirm;

useStrict(true);

class Store {
	
	//用做数据视图的渲染
	@observable test_todo = [];
	//用来存放初始化数据
	@observable new_todo = [];
	//批量删除数组
	@observable check_todo = [];
	//控制列表与新增页面
	@observable status = "none";
	
	
	@action getData(){
		
	
	const ReqData = Request('get')
		.then(function(res){
			return res;
		})
		.catch(function(err){
			console.log(err);
		});
		
		
		//由于mobx的原因,无法直接在http中获取被观察的数据,在组件中可正常使用
		ReqData
		.then((res)=>{
			

			if(res.data.data.length !== 0) {
				this.test_todo = res.data.data;
				localStorage.save(res.data.data);
				notification['info']({
				    message: '这是一个数据提示',
				    description: '小的已经为您mock好一些数据,它们会在页面中展示.您可以随意使用并且在localStorage中查看!',
				    duration: 6
				})
			}else{
				notification['error']({
				    message: '这是一个数据提示',
				    description: '数据获取出错,请刷新试试!',
				    duration: 6
				})
				return false;
			}
			
		})
		.catch(function(err){
			console.log(err);
		});
		
	}
	
	@action DataReady(){
		
		notification['info']({
		message: '这是一个数据提示',
		description:`我们检测到您的localStorage中已经存在${localStorage.fetch().length}条数据,`,
		duration: 6
		});
		this.test_todo = localStorage.fetch();
	
	}
	
	//点击添加按键,添加方法
	@action addpage(i){
		this.status = "block";
	}
	
	@action additem(item){
		const newData = item.concat(localStorage.fetch());
		localStorage.save(newData);
		this.test_todo = newData;
		this.status = "none";
	}
	
	@action completeitem(){
		this.test_todo = localStorage.fetch().filter((item) => item.complete);
	}
	
	@action undoneitem(){
		this.test_todo = localStorage.fetch().filter((item) => !item.complete);
	}
	
	@action showitem(){
		//数据整合后去重
		this.test_todo = localStorage.fetch();
	}
	
	@action completethis(idx){
	
		//要同时修改local和this.test_todo;
		let index = _.findIndex(this.test_todo,function(chr){
			return chr.id == idx;
		});
		this.test_todo[index].complete = !this.test_todo[index].complete;
		
		const local_todo = localStorage.fetch();
		local_todo[index].complete = true;
		localStorage.save(local_todo)
		
	}
	
	@action delthis(idx){
		//要同时修改local和this.test_todo;
		let evens = _.remove(this.test_todo,function(chr){
			return chr.id === idx;
		});
		
		const local_todo = localStorage.fetch();
		_.remove(local_todo,function(chr){
			return chr.id === idx;
		});
		localStorage.save(local_todo)
		
		
	}
	
	@action searchitem(value){
		
		
		let index = _.findIndex(localStorage.fetch() , function(chr){
			return chr.title == value || chr.author == value || chr.distract == value;
		});
		
		if(index == -1){
			notification['error']({
			message: '这是一个数据提示',
			description:`暂无此数据`,
			duration: 6
			});
		}else{
			const search_todo = [];
			search_todo.push(localStorage.fetch()[index]);
			this.test_todo = search_todo;
		}
	 
	}
	
	
	//批量选择数据
	@action checkthis(check,idx){
	
		let index = _.findIndex(this.test_todo, function(chr){
			return chr.id === idx;
		})
		this.test_todo[index].checked = check;
		
	}
	
	@action delitem(){
		this.test_todo.map((item) => item.checked === true && this.check_todo.push(item))
		let that = this;
		this.check_todo.length === 0 ? 
		notification['error']({
			message: '这是一个数据提示',
			description:`请选择将要删除的数据!`,
			duration: 6
			})
		: 
		confirm({
		    title: '这是一个删除信息提示框',
		    content: `是否确认删除<${this.check_todo.map((item) => item.title)}>`,
		    onOk () {
		    		let difference = _.difference(that.test_todo,that.check_todo);
		    		that.test_todo = difference;
		    		localStorage.save(difference);
	 			message.success('操作成功！');
	 			that.check_todo = [];
		    },
		    onCancel() {
		    		message.info('取消操作！');
		    		that.check_todo = [];
		    },
		 });		
		
		
	}
	
}


const store = new Store();

localStorage.fetch().length === 0 ? autorun(() => store.getData()) : autorun(() => store.DataReady())


export default store
