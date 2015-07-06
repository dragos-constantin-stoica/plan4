//User information
var USERNAME = null;

//Remote database address

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
	},	

	getProfessorNames: function(){
		var result = [];
		for(var i = 0; i < professorDataStore.professorData.length; i ++){

			result.push(professorDataStore.professorData[i].name + " " + professorDataStore.professorData[i].surname );	

		}
		return result;
	},

	getProfessorByName: function(name){
		var result = {};

		for(var i = 0; i < professorDataStore.professorData.length; i ++){
			var fullname = professorDataStore.professorData[i].name + " " + professorDataStore.professorData[i].surname;
			if( fullname == name){

				result = {
					"degree" : professorDataStore.professorData[i].grad_didactic,
					"title" : professorDataStore.professorData[i].titlu_stiintific,
					"emails" : professorDataStore.professorData[i].emails,
					"telephone" : professorDataStore.professorData[i].telephone,
					"department" : professorDataStore.professorData[i].department,
					"faculty" : professorDataStore.professorData[i].faculty

				};	


			}


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

var courseDataStore = {
	url: "",
	courseData: [],

	setURL: function(url){
		courseDataStore.url = url;
	},
	
	loadData: function(callback){
		var promise = webix.ajax().get(courseDataStore.url);
		promise.then(function(realdata){
		    //success
		    courseDataStore.courseData = realdata.json();
		    //console.log(userDataStore.userData);
		    callback(null, courseDataStore.courseData);
		}).fail(function(err){
		    //error
		    err.where = "courseData";
		    callback(err,null);
		    webix.message({type:"error", text:"Datele nu au fost încărcate corect - courseDataStore!"});
		});
	},

	getCourseMenu: function(){
		var result = ["ALL"];
		for (var i = 0; i< courseDataStore.courseData.length; i++){	 
				result.push(courseDataStore.courseData[i].name);
		}
		return result;	
	},

	getCourseList: function(){
		var result = [];
		for(var i = 0; i < courseDataStore.courseData.length; i ++){

			result.push(courseDataStore.courseData[i]);	

		}
		return result;
	},

	getCoursesPIV:function(faculty,specialization){
		
		
		var total_course_hours = [0,0,0,0,0,0,0,0];
		var total_seminar_hours = [0,0,0,0,0,0,0,0];
		var total_lab_hours = [0,0,0,0,0,0,0,0];
		var total_project_hours = [0,0,0,0,0,0,0,0];
		var total_teaching_hours=[0,0,0,0,0,0,0,0];
		var total_etcs = [0,0,0,0,0,0,0,0];
		var total_individual_hours = [0,0,0,0,0,0,0,0];

	
		var results_by_semester = [			
			{"sem":"1", "data":[['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"2","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"3","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"4","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"5","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"6","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"7","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]},
			{"sem":"8","data": [['Cod', 'Denumire Curs', 'Denumire Ro', 'Titular', 'Grad did.', "","Ver","C","S","L","P","ECTS","Ore did.", "Std. ind","E-mail","Telefon","Departament","Facultate"]]}
		];
		


			

		for (var i = 0; i < courseDataStore.courseData.length;i++){
			if(courseDataStore.courseData[i].faculty == faculty &&
			   courseDataStore.courseData[i].specialization == specialization &&
			   courseDataStore.courseData[i].allocated){

			
			   
			   var semester = parseInt(courseDataStore.courseData[i].semester);
			   var professor = professorDataStore.getProfessorByName(courseDataStore.courseData[i].holder);
			   var course_hours = parseInt(courseDataStore.courseData[i].course_hours_allocated);
			   total_course_hours[semester-1] += course_hours;
			   var seminar_hours = parseInt(courseDataStore.courseData[i].seminar_hours_allocated);
			   total_seminar_hours[semester-1] += seminar_hours;
			   var lab_hours = parseInt(courseDataStore.courseData[i].lab_hours_allocated);
			   total_lab_hours[semester-1] += lab_hours;
			   var project_hours = parseInt(courseDataStore.courseData[i].project_hours_allocated);
			   total_project_hours[semester-1] += project_hours;
			   var ects = parseInt(courseDataStore.courseData[i].credit_nr);
			   total_etcs[semester-1] += ects;
			   var teaching_hours = (course_hours + seminar_hours + lab_hours + project_hours ) * 14;
			   total_teaching_hours[semester-1] += teaching_hours; 
			   var individual_hours = parseInt(courseDataStore.courseData[i].individual_hours);
			   total_individual_hours[semester-1] += individual_hours;

				results_by_semester[semester-1].data.push([

					courseDataStore.courseData[i].course_code,
					courseDataStore.courseData[i].name,
					courseDataStore.courseData[i].name_ro,
					courseDataStore.courseData[i].holder,
					professor.degree,
					professor.title,					
					courseDataStore.courseData[i].verification,
					courseDataStore.courseData[i].course_hours_allocated,
					courseDataStore.courseData[i].seminar_hours_allocated,
					courseDataStore.courseData[i].lab_hours_allocated,
					courseDataStore.courseData[i].project_hours_allocated,
					courseDataStore.courseData[i].credit_nr,
					teaching_hours.toString(),
					courseDataStore.courseData[i].individual_hours,
					professor.emails,
					professor.telephone,
					professor.department,
					professor.faculty
				
				]);


			}
		}

		for(var i=0;i<8;i++){
		results_by_semester[i].data.push([
			' ', ' ', ' ',' ',
			'Total',
			' ',' ',
			total_course_hours[i].toString(),
			total_seminar_hours[i].toString(),
			total_lab_hours[i].toString(),
			total_project_hours[i].toString(),
			total_etcs[i].toString(),
			total_teaching_hours[i].toString(),
			total_individual_hours[i].toString(),
			' ',' ',' ',' '
			]);
		}

		return results_by_semester;

	}


	// getCoursesST(faculty,department){











	// }	


};

