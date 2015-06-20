//check if user has session information in session storage
var logic = {
	init : function(){
		USERNAME = webix.storage.session.get('USERNAME');
		if(USERNAME){
			logic.init_data();
		}else{
			logic.login();
		}
	},

	init_data: function(){
		//TODO - Get events for corresponding user(s)
		//Get user document		
		USERNAME = webix.storage.session.get('USERNAME');
		//Check again if any information changed
		webix.ajax(CouchDB.protocol + CouchDB.host + "/plan4_app/_design/users/_view/all_users?key=[\""+ USERNAME.username  +"\"]", 
			function(couchdoc){
			//Prepare data according to user roles
				var userdoc = (JSON.parse(couchdoc)).rows[0].value;
				if(!userdoc.active){
				    //Automatically log out inactive users
					logoutOnClick();
					return ;
				}

				//Set session information
				webix.storage.session.remove('USERNAME');
				webix.storage.session.put('USERNAME', userdoc);	
				USERNAME = webix.storage.session.get('USERNAME');

				//build user interface according to role(s)						
				async.series([

					function(callback){
						var role = (USERNAME.rol_admin ? 'admin':(USERNAME.rol_student ? 'student' : ( USERNAME.rol_sef ? 'sef_de_grupa' : (USERNAME.rol_profesor ? 'profesor' : 'secretara'))));
						mainlayout.setToolbar(role);

						logic.main();
						webix.message(USERNAME.name + " " + USERNAME.surname + "<br/>Bine aţi venit în aplicaţia PLAN IV!");							
						callback(null,"interface init done!");	
					},						

					function(callback){
			
						var role = (USERNAME.rol_admin ? 'admin':(USERNAME.rol_student ? 'student' : ( USERNAME.rol_sef ? 'sef_de_grupa' : (USERNAME.rol_profesor ? 'profesor' : 'secretara'))));
						//Get students
						studentstable.setStudentsTable(role);
						studentstable.setURL("proxyCouchDB->../users/_list/student_list/all_students?username="+USERNAME.username+"&roles="+role);
						studentDataStore.setURL(CouchDB.protocol + CouchDB.host + "/plan4_app/_design/users/_list/student_data/all_students?username="+USERNAME.username+"&roles="+role);
						studentDataStore.loadData(callback);
					},	

					function(callback){
			
						var role = (USERNAME.rol_admin ? 'admin':(USERNAME.rol_student ? 'student' : ( USERNAME.rol_sef ? 'sef_de_grupa' : (USERNAME.rol_profesor ? 'profesor' : 'secretara'))));
						//Get professors
						professorstable.setProfessorsTable(role);
						professorstable.setURL("proxyCouchDB->../users/_list/professor_list/all_professors?username="+USERNAME.username+"&roles="+role);
						professorDataStore.setURL(CouchDB.protocol + CouchDB.host + "/plan4_app/_design/users/_list/professor_data/all_professors?username="+USERNAME.username+"&roles="+role);
						professorDataStore.loadData(callback);
					},

					function(callback){
			
						var role = (USERNAME.rol_admin ? 'admin':(USERNAME.rol_student ? 'student' : ( USERNAME.rol_sef ? 'sef_de_grupa' : (USERNAME.rol_profesor ? 'profesor' : 'secretara'))));
						//Get rooms
						roomstable.setRoomsTable(role);
						roomstable.setURL("proxyCouchDB->../rooms/_list/room_list/all_rooms");
						roomDataStore.setURL(CouchDB.protocol + CouchDB.host + "/plan4_app/_design/rooms/_list/room_data/all_rooms");
						roomDataStore.loadData(callback);
					}															

	
															

				],
					// optional callback
					function(err, results){
						//console.log(results);
						if(err) console.log("Error: " + err);
					}				

				);


			}

		);
			
	},

	login: function	() {
		if(!webix.isUndefined($$('main'))) $$('main').destructor();
		var loginform = {
				id: "loginform",			
				view:"form", 
				width:400,

				elements:[
					{ view:"text", type:"email", label:"Email", name:"email", placeholder:"utilizator@pub.ro", value:""},
					{ view:"text", type:'password', label:"Parola", name:"password", value:""},
					{ view:"button", label:"Login" , type:"form", click:function(){
						if (! this.getParentView().validate())
							webix.message({ type:"error", text:"E-mail sau parola nu sunt valide!" });
						else{						
						    name = $$('email').getValue();
						    password = $$('password').getValue();
							   
							webix.ajax(REMOTEDATABASE + "/_design/users/_view/login?key=[\""+ name  +"\", \"" + password + "\"]", 
								function(couchdoc){

									//Prepare data according to user roles
									var userdoc = (JSON.parse(couchdoc)).rows;
									if(userdoc.length == 0){
										//Automatically log out inactive users
										logoutOnClick();
									}else{
										if (userdoc[0].value.active){
											$$("loginform").hide();
											//Set session information
											webix.storage.session.put('USERNAME', userdoc[0].value);
											logic.init_data();
										}else{
											logoutOnClick();
										}
									}
								}
							);								
							    
						}
					 }
					}
				],
				rules:{
					"email":webix.rules.isEmail,
					"password":webix.rules.isNotEmpty
				}
			};
			
		webix.ui({
			view:"window",
			id: "loginwindow",
			width:400,
			position:"top",
			head:"Vă rog să vă autentificaţi!",
			body: webix.copy(loginform)
		}).show();
	},

	main : function(){
		if(!webix.isUndefined($$('main'))) $$('main').destructor();
		webix.ui(mainlayout.getMainLayout());
	}
};		
