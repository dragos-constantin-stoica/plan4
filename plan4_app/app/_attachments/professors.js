var professorstable = {

	EDITSTOP: false,
	url: "",
	professorsdata : [],	
	layout: {
			view:"treetable",
			id: "professorstable",
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
			{ id:"rol_admin", header:"Rol Admin", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },
			{ id:"rol_profesor", header:"Rol Profesor", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },			
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
			save:"proxyCouchDB->../users/_update/professor_update"
	},
	professorsmenu: {
		view:"toolbar",
		    id:"professorstoolbar",
		    cols:[
				{ view:"button", id:"passwordprofessor",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_professor();" },
				{ view:"button", id:"newprofessor",    type:"iconButton", icon:"plus",    label:"Profesor nou", width:150, click:"new_professor();" }
			]
	},	

	setURL: function(url){
		this.url = url;
	},

	getProfessorsMenu: function () {
		return this.professorsmenu;
	},
		
	getProfessorsTable: function(){
		return this.layout;
	},


	setProfessorsTable:function (role) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "professorstable",
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
					{ id:"rol_admin", header:"Rol Admin", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },
					{ id:"rol_profesor", header:"Rol Profesor", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },		
					{ id:"active",      header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
					],
					on:{
				        'onAfterAdd': addStudent,
				        // 'onAfterEditStop': function(state, editor, ignoreUpdate){
				        // 	professorstable.EDITSTOP = (editor.column != "boss_asm");
				        // },
				        'onDataUpdate': updateStudent
				    },
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:professorstable.url,
					save:"proxyCouchDB->../users/_update/professor_update"
			};
			this.professorsmenu = {
				view:"toolbar",
			    id:"professorstoolbar",
			    cols:[
					{ view:"button", id:"passwordprofessor",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_professor();" },
					{ view:"button", id:"newprofessor",    type:"iconButton", icon:"plus",    label:"Profesor nou", width:150, click:"new_professor();" }

				]
			};
		};

	},	

		
	setProfessorsData: function(usersdata){
		this.professorsdata = professorsdata;
	},
	
	getProfessorsData: function(){
		return this.professorsdata;
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
				professorstable.EDITSTOP = true;
				
				var sel = $$('professorstable').getSelectedId();
				var row = $$('professorstable').getItem(sel.row);
				row["password"] = $$('newpassword').getValue(); 
				$$('professorstable').updateItem(sel.row, row);

				$$('new_professor').hide();
				$$('newpasswordform').destructor();						
				$$('new_professor').destructor();
				webix.message({text:"Parola a fost schimbată!<br/>Salvaţi datele!"});						
			}
		 }
		}
	],
	rules:{
		"newpassword":webix.rules.isNotEmpty
	}
};

function password_professor(){
	if ($$('professorstable').getSelectedId(true).join()!==""){
		webix.ui({
			view:"window",
			id: "new_professor",
			width:400,
			position:"top",
			head:"Parola nouă!",
			body:webix.copy(newpasswordform)
		}).show();
	}else{
		webix.message({type:"error",text:"Selectaţi un profesor!"});
	}
};

var newprofessorform = {
	id: "newprofessorform",			
	view:"form", 
	width:400,

	elements:[
	{ rows:[ { template:"Numele de utilizator nu se mai poate schimba!", type:"clean"}]
	},
		{ view:"text", type:"email", label:"Email", name:"newemail", placeholder:"profesor@pub.ro", value:""},
		{ view:"text", type:'password', label:"Parola", name:"newpassword", value:""},
		{ view:"button", label:"Profesor NOU!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"E-mail sau parola nu sunt valide!" });
			else{
				//Get email on creation - this is not editable
				$$('professorstable').add({rev:"new", 
					username:$$('newemail').getValue(), 
					password:$$('newpassword').getValue(), 
				    name:"", surname:"",
				    telephone:"", emails:"",
					rol_admin:false, rol_profesor:true, active:true});
				$$('new_professor').hide();
				$$('newprofessorform').destructor();						
				$$('new_professor').destructor();						
			}
		 }
		}
	],
	rules:{
		"newemail":webix.rules.isEmail,
		"newpassword":webix.rules.isNotEmpty
	}
};
function new_professor(){
	webix.ui({
		view:"window",
		id: "new_professor",
		width:400,
		position:"top",
		head:"Creare profesor nou!",
		body:webix.copy(newprofessorform)
	}).show();
};

function addStudent (obj, index) {

	console.log("Add professor start!");

	var FORCE_LOGOUT = false;

	$$('professorstable').eachRow( 
	    function (row){ 
			var user_row = $$('professorstable').getItem(row);	

			//create all users
			if (user_row.username == $$('professorstable').getItem(obj).username){

				//new user
				//create user document in databaase
				if(!webix.isUndefined(user_row.password)){
					var professorDoc = {
						cadru_didactic : {
						    parola: user_row.password,
						    nume_utilizator: user_row.username
						},
					    doctype : "professor"
					};
					//create user in database
					$.couch.db("plan4_app").saveDoc(professorDoc, {
						success: function(data) {
						        console.log(data);
						},
						error: function(status) {
								console.log(status);
						}
						});
				}
				//check for inactive user and log it out
				FORCE_LOGOUT = !user_row.active;
			};
			
	    },
		true
	);
				
	webix.message("Datele au fost salvate cu succes!");
	console.log("Add user end!");
	professorstable.EDITSTOP = true;
	if(FORCE_LOGOUT){ 
		logoutOnClick();
	}
}

function updateStudent (id, obj, mode) {
	if(!professorstable.EDITSTOP){

		console.log("Update user start!");

		var FORCE_LOGOUT = false;

		$$('professorstable').eachRow( 
		    function (row){ 
				var user_row = $$('professorstable').getItem(row);		
	
								
				//update existing user				
				//User auto/self deactivated 
				if(!user_row.active && user_row.username == USERNAME.username) FORCE_LOGOUT = true;
				

				//update _users with new password
				if(!webix.isUndefined(user_row.password) && user_row.password.length > 0){
					//user must login again
					if(user_row.username == USERNAME.username) FORCE_LOGOUT = true;
					var userDoc = {
					    password: user_row.password,
					    username: user_row.username,
					    type: "user"
					};
					worker.postMessage({'cmd':'setPassword', 'msg':userDoc});
				}
								
		    },
			true
		);

		
		if(USERNAME.roles_admin)
			worker.postMessage({'cmd': 'setSecurity', 'msg': security_obj});

		if(FORCE_LOGOUT){ 
			logoutOnClick();
			return;
		}

		webix.message("Datele au fost salvate cu succes!");
		console.log("Update user end!");


	}else{
		professorstable.EDITSTOP = !professorstable.EDITSTOP;
	}
}



