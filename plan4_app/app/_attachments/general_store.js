//User information
var USERNAME = null;

//Remote database address
//var REMOTEDATABASE = "http://X.X.X.X/loreal_app";
var REMOTEDATABASE = "http://46.108.11.13:5984/plan4_app";

//Proxy for CouchDB
webix.proxy.proxyCouchDB = {
    $proxy:true,

    load:function(view, callback){
        //GET JSON Array from list->view  
        webix.ajax(this.source, callback, view);
    },
    save:function(view, update, dp, callback){

        //your saving pattern
        if(update.operation == "update"){
			webix.ajax().header({
			    "Content-type":"application/json"
			}).post(dp.config.url.source+ "\/" + update.data["_id"], 
				JSON.stringify(update.data), 
				[function(text, data, xhr){
			    //response
			    //console.log(text);
				//console.log(data.json());
				//console.log(xhr);
				var msg = data.json()
				if('message' in msg){
					var item = view.getItem(update.data["id"]);
					item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting new property and value for it
					view.updateItem(update.data["id"],item);
					view.refresh();							
				}
				},callback]
			);
		}

		if(update.operation == "insert"){
			webix.ajax().header({
			    "Content-type":"application/json"
			}).post(dp.config.url.source, 
				JSON.stringify(update.data), 
				[function(text, data, xhr){
			    //response
			    //console.log(text);
				//console.log(data.json());
				//console.log(xhr);
				var msg = data.json()
				if('message' in msg){
					var item = view.getItem(update.data["id"]);
					item._id = xhr.getResponseHeader('X-Couch-Id');
					item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting new property and value for it
					view.updateItem(update.data["id"],item);
					view.refresh();
				}
				}, callback]
			);
		}
	}
};

var studentDataStore = {
	url: "",
	studentData: [],

	setURL: function(url){
		studentDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(studentDataStore.url);
		promise.then(function(realdata){
		    //success
		    studentDataStore.studentData = realdata.json();
		    //console.log(userDataStore.userData);
		    callback(null, studentDataStore.studentData);
		}).fail(function(err){
		    //error
		    err.where = "studentData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - studentDataStore!"});
		});
	},

	getStudentMenu: function(){
		var result = ["ALL"];
		for (var i = 0; i< studentDataStore.studentData.length; i++){	 
				result.push(studentDataStore.studentData[i].username);
		}
		return result;	
	},

	getStudentList: function(){
		var result = [];
		for(var i = 0; i < studentDataStore.studentData.length; i ++){

			result.push(studentDataStore.studentData[i]);	

		}
		return result;
	}	


};

var professorDataStore = {
	url: "",
	professorData: [],

	setURL: function(url){
		professorDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(professorDataStore.url);
		promise.then(function(realdata){
		    //success
		    professorDataStore.professorData = realdata.json();
		    //console.log(userDataStore.userData);
		    callback(null, professorDataStore.professorData);
		}).fail(function(err){
		    //error
		    err.where = "professorData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - professorDataStore!"});
		});
	},

	getProfessorMenu: function(){
		var result = ["ALL"];
		for (var i = 0; i< professorDataStore.professorData.length; i++){	 
				result.push(professorDataStore.professorData[i].username);
		}
		return result;	
	},

	getProfessorList: function(){
		var result = [];
		for(var i = 0; i < professorDataStore.professorData.length; i ++){

			result.push(professorDataStore.professorData[i]);	

		}
		return result;
	}	


};

var roomDataStore = {
	url: "",
	roomData: [],

	setURL: function(url){
		roomDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(roomDataStore.url);
		promise.then(function(realdata){
		    //success
		    roomDataStore.roomData = realdata.json();
		    //console.log(userDataStore.userData);
		    callback(null, roomDataStore.roomData);
		}).fail(function(err){
		    //error
		    err.where = "roomData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - roomDataStore!"});
		});
	},

	getRoomMenu: function(){
		var result = ["ALL"];
		for (var i = 0; i< roomDataStore.roomData.length; i++){	 
				result.push(roomDataStore.roomData[i].name);
		}
		return result;	
	},

	getRoomList: function(){
		var result = [];
		for(var i = 0; i < roomDataStore.roomData.length; i ++){

			result.push(roomDataStore.roomData[i]);	

		}
		return result;
	}	


};

var secretaryDataStore = {
	url: "",
	secretaryData: [],

	setURL: function(url){
		secretaryDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(secretaryDataStore.url);
		promise.then(function(realdata){
		    //success
		    secretaryDataStore.secretaryData = realdata.json();
		    //console.log(userDataStore.userData);
		    callback(null, secretaryDataStore.secretaryData);
		}).fail(function(err){
		    //error
		    err.where = "secretaryData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - secretaryDataStore!"});
		});
	},

	getSecretaryMenu: function(){
		var result = ["ALL"];
		for (var i = 0; i< secretaryDataStore.secretaryData.length; i++){	 
				result.push(secretaryDataStore.secretaryData[i].username);
		}
		return result;	
	},

	getSecretaryList: function(){
		var result = [];
		for(var i = 0; i < secretaryDataStore.secretaryData.length; i ++){

			result.push(secretaryDataStore.secretaryData[i]);	

		}
		return result;
	}	


};

var departmentDataStore = {
	url:"",
	departmentData: [],

	cleanUp: function(){
		departmentDataStore.url = "";
		departmentDataStore.departmentData = [];
	},

	setURL: function(url){
		departmentDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(departmentDataStore.url);
		promise.then(function(realdata){
		    //success
		    departmentDataStore.departmentData = realdata.json();
		    //console.log(departmentDataStore.departmentData);
		    callback(null,departmentDataStore.departmentData);
		}).fail(function(err){
		    //error
		    err.where = "departmentData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - departmentsDataStore!"});
		});
	},



	getDepartmentList: function(){
		var result = [];
		for (var i = 0 ; i < departmentDataStore.departmentData.length ; i++) {
			result.push(departmentDataStore.departmentData[i]);
		};
		return result;
	}

};
