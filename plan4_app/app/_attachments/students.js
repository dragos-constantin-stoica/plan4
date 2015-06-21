var studentstable = {

	EDITSTOP: false,
	url: "",
	studentsdata : [],	
	layout: {
			view:"treetable",
			id: "studentstable",
			//autoconfig:true,
			columns:[
			{ id:"id",       header: "id", hidden:true, width: 50},
			{ id:"_id",      header: "_id", hidden:true, width: 50},
			{ id:"_rev",     header: "_rev", hidden:true, width: 50},
			{ id:"username", header:["Nume Utilizator",{content:"textFilter"}], width:300, fillspace:true},
			{ id:"password", header:"Parola", hidden:true, editor:"text", width:100},		
			{ id:"name",     header:["Prenume",{content:"textFilter"}], editor:"text", width:200},			
			{ id:"surname",  header: ["Nume",{content:"textFilter"}], editor:"text", width:200},
			{ id:"telephone",header:["Numar Telefon",{content:"textFilter"}], editor:"text", width:200},
			{ id:"emails",     header:["E-mail",{content:"textFilter"}], editor:"text", width:200},
			{ id:"rol_sef", header:"Rol Sef Grupa", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },
			{ id:"rol_student", header:"Rol Student", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },			
			{ id:"active",      header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
			],
			on:{
		        'onAfterAdd': function(obj, index){ console.log("New item added!"); },
		        'onAfterEditStop': function(state, editor, ignoreUpdate){console.log("After edit stop");}
		    },
			drag:"row",
			editable:true,
			select:"row",
			navigation:true,
			save:"proxyCouchDB->../users/_update/student_update"
	},
	studentsmenu: {
		view:"toolbar",
		    id:"studentstoolbar",
		    cols:[
				{ view:"button", id:"passwordstudent",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_student();" },
				{ view:"button", id:"newstudent",    type:"iconButton", icon:"plus",    label:"Student nou", width:150, click:"new_student();" }
			]
	},	

	setURL: function(url){
		this.url = url;
	},

	getStudentsMenu: function () {
		return this.studentsmenu;
	},
		
	getStudentsTable: function(){
		return this.layout;
	},


	setStudentsTable:function (role) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "studentstable",
					//autoconfig:true,
					columns:[
					{ id:"id",       header: "id", hidden:true, width: 50},
					{ id:"_id",      header: "_id", hidden:true, width: 50},
					{ id:"_rev",     header: "_rev", hidden:true, width: 50},
					{ id:"username", header:["Nume Utilizator",{content:"textFilter"}], width:300, fillspace:true},
					{ id:"password", header:"Parola", hidden:true, editor:"text", width:100},		
					{ id:"name",     header:["Prenume",{content:"textFilter"}], editor:"text", width:200},			
					{ id:"surname",  header: ["Nume",{content:"textFilter"}], editor:"text", width:200},
					{ id:"telephone",header:["Numar Telefon",{content:"textFilter"}], editor:"text", width:200},
					{ id:"emails",     header:["E-mail",{content:"textFilter"}], editor:"text", width:200},
					{ id:"rol_sef", header:"Rol Sef Grupa", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },
					{ id:"rol_student", header:"Rol Student", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },			
					{ id:"active",      header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
					],
					// on:{
				 //        //'onAfterAdd': addStudent,
				 //        // 'onAfterEditStop': function(state, editor, ignoreUpdate){
				 //        // 	studentstable.EDITSTOP = (editor.column != "boss_asm");
				 //        // },
				 //        'onDataUpdate': updateStudent
				 //    },
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:studentstable.url,
					save:"proxyCouchDB->../users/_update/student_update"
			};
			this.studentsmenu = {
				view:"toolbar",
			    id:"studentstoolbar",
			    cols:[
					{ view:"button", id:"passwordstudent",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_student();" },
					{ view:"button", id:"newstudent",    type:"iconButton", icon:"plus",    label:"Student nou", width:150, click:"new_student();" }

				]
			};
		};

	},	

		
	setStudentsData: function(usersdata){
		this.studentsdata = studentsdata;
	},
	
	getStudentsData: function(){
		return this.studentsdata;
	}

};


//password form	
var newpasswordform = {
	id: "newpasswordform",			
	view:"form", 
	width:400,

	elements:[
		{ view:"text", type:'password', label:"Parola", name:"newpassword", value:""},
		{ view:"button", label:"Schimbă parola!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"Parola nu este validă!" });
			else{
				studentstable.EDITSTOP = true;
				
				var sel = $$('studentstable').getSelectedId();
				var row = $$('studentstable').getItem(sel.row);
				row["password"] = $$('newpassword').getValue(); 
				$$('studentstable').updateItem(sel.row, row);

				$$('new_student').hide();
				$$('newpasswordform').destructor();						
				$$('new_student').destructor();
				webix.message({text:"Parola a fost schimbată!<br/>Salvaţi datele!"});						
			}
		 }
		}
	],
	rules:{
		"newpassword":webix.rules.isNotEmpty
	}
};

function password_student(){
	if ($$('studentstable').getSelectedId(true).join()!==""){
		webix.ui({
			view:"window",
			id: "new_student",
			width:400,
			position:"top",
			head:"Parola nouă!",
			body:webix.copy(newpasswordform)
		}).show();
	}else{
		webix.message({type:"error",text:"Selectaţi un student!"});
	}
};

var newstudentform = {
	id: "newstudentform",			
	view:"form", 
	width:400,

	elements:[
	{ rows:[ { template:"Numele de utilizator nu se mai poate schimba!", type:"clean"}]
	},
		{ view:"text", type:"email", label:"Email", name:"newemail", placeholder:"student@pub.ro", value:""},
		{ view:"text", type:'password', label:"Parola", name:"newpassword", value:""},
		{ view:"button", label:"Student NOU!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"E-mail sau parola nu sunt valide!" });
			else{
				//Get email on creation - this is not editable
				$$('studentstable').add({rev:"new", 
					username:$$('newemail').getValue(), 
					password:$$('newpassword').getValue(), 
				    name:"", surname:"",
				    telephone:"", emails:"",
					rol_student:true, rol_sef:false, active:true});
				$$('new_student').hide();
				$$('newstudentform').destructor();						
				$$('new_student').destructor();						
			}
		 }
		}
	],
	rules:{
		"newemail":webix.rules.isEmail,
		"newpassword":webix.rules.isNotEmpty
	}
};
function new_student(){
	webix.ui({
		view:"window",
		id: "new_student",
		width:400,
		position:"top",
		head:"Creare student nou!",
		body:webix.copy(newstudentform)
	}).show();
};

// function addStudent (obj, index) {

// 	console.log("Add student start!");

// 	var FORCE_LOGOUT = false;

// 	$$('studentstable').eachRow( 
// 	    function (row){ 
// 			var user_row = $$('studentstable').getItem(row);	

// 			//create all users
// 			if (user_row.username == $$('studentstable').getItem(obj).username){

// 				//new user
// 				//create user document in databaase
// 				if(!webix.isUndefined(user_row.password)){
// 					var studentDoc = {
// 						date_personale : {
// 						    parola: user_row.password,
// 						    nume_utilizator: user_row.username
// 						},
// 					    doctype : "student"
// 					};
// 					//create user in _users
// 					$.couch.db("plan4_app").saveDoc(studentDoc, {
// 						success: function(data) {
// 						        console.log(data);
// 						},
// 						error: function(status) {
// 								console.log(status);
// 						}
// 						});
// 				}
// 				//check for inactive user and log it out
// 				FORCE_LOGOUT = !user_row.active;
// 			};
			
// 	    },
// 		true
// 	);
				
// 	webix.message("Datele au fost salvate cu succes!");
// 	console.log("Add user end!");
// 	studentstable.EDITSTOP = true;
// 	if(FORCE_LOGOUT){ 
// 		logoutOnClick();
// 	}
// }

// function updateStudent (id, obj, mode) {
// 	if(!studentstable.EDITSTOP){

// 		console.log("Update user start!");

// 		var FORCE_LOGOUT = false;

// 		$$('studentstable').eachRow( 
// 		    function (row){ 
// 				var user_row = $$('studentstable').getItem(row);		
	
								
// 				//update existing user				
// 				//User auto/self deactivated 
// 				if(!user_row.active && user_row.username == USERNAME.username) FORCE_LOGOUT = true;
				

// 				//update _users with new password
// 				if(!webix.isUndefined(user_row.password) && user_row.password.length > 0){
// 					//user must login again
// 					if(user_row.username == USERNAME.username) FORCE_LOGOUT = true;
// 					var userDoc = {
// 					    password: user_row.password,
// 					    username: user_row.username,
// 					    type: "user"
// 					};
// 					worker.postMessage({'cmd':'setPassword', 'msg':userDoc});
// 				}
								
// 		    },
// 			true
// 		);

// 		if(USERNAME.roles_admin)
// 			worker.postMessage({'cmd': 'setSecurity', 'msg': security_obj});

// 		if(FORCE_LOGOUT){ 
// 			logoutOnClick();
// 			return;
// 		}

// 		webix.message("Datele au fost salvate cu succes!");
// 		console.log("Update user end!");


// 	}else{
// 		studentstable.EDITSTOP = !studentstable.EDITSTOP;
// 	}
// }



