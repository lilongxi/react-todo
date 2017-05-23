//axios
import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://todolist/data',
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	}
});

let Data = function Request(method, url, params){
	
	const data = instance({
			method:method,
			url: url,
			params:params
		}).then(function(response) {
			
			return response;
			
		})
		.catch(function(error) {
			console.error(error)
			Promise.reject(error)
		});
		
		return data;
		
}
 
export default Data;