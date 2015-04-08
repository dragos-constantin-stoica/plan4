//check if user has session information in storage
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
				
				var role = (USERNAME.roles[0] == 'admin'  ? 'admin':(USERNAME.roles[0] == 'resursa_umana' ? 'resursa_umana': ( USERNAME.roles[0] == 'sef_de_grupa' ? 'sef_de_grupa' :'guest')));
				mainlayout.setToolbar(role);
				logic.main();
				webix.message(USERNAME.name + " " + USERNAME.surname + "<br/>Bine aţi venit în aplicaţia PLAN IV!");											


			}
		);
		logic.main();
		webix.message(USERNAME.name + " " + USERNAME.surname + "<br/>Bine aţi venit în aplicaţia PLAN IV!");
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
