//Object toString override
//Object.prototype.toString = function(){return JSON.stringify(this)};

//auxiliary function - display message or error
function showErrMsg (err, msg) {
	if(err){
		webix.message({type:"error", text:err});
	}else{
		if(typeof msg == 'string' || msg instanceof String || Object.prototype.toString.call(msg) == '[object String]')
			webix.message(msg);
		else
			webix.message(JSON.stringify(msg));
	}
}