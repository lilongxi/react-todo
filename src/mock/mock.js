let Mock = require('mockjs');

Mock.setup({ timeout: '1200-2600' });

Mock.mock('http://todolist/data', {
	"data|5": [{
		"author": '@cname',
		"id":'@guid',
		"complete":'@boolean',
		"content":'@cparagraph',
		"title":'@ctitle',
		"distract":'@cparagraph(1)',
		"publishTime":'@date',
		"finishTime":'@date',
		"checked":false
	}]
})