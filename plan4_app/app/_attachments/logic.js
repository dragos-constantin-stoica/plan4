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
		/*
		webix.ajax(CouchDB.protocol + CouchDB.host + "/loreal_app/_design/users/_view/all_users?key=[\""+ USERNAME.username  +"\"]", 
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
				
				async.series([
					//Get SR Report Template
					function(callback){
						reportDataStore.setURL(CouchDB.protocol + CouchDB.host + "/loreal_app/ACTIVITIES");
						reportDataStore.loadData(callback);	
					},
					//Get user list
					function(callback){
			
						var role = (USERNAME.roles_admin ? "admin":(USERNAME.roles_asm ? "asm":(USERNAME.roles_sr ? "sr":"guest")));
						//Get users
						userstable.setURL("proxyCouchDB->../users/_list/user_list/all_users?username="+USERNAME.username+"&roles="+role);
						userDataStore.setURL(CouchDB.protocol + CouchDB.host + "/loreal_app/_design/users/_list/user_data/all_users?username="+USERNAME.username+"&roles="+role);
						userDataStore.loadData(callback);
	
					},
					//Get outlets
					function(callback){
						outletDataStore.setURL(CouchDB.protocol + CouchDB.host + "/loreal_app/_design/outlets/_list/outlet_list/all_outlets");
						outletDataStore.loadData(callback);
					},
					//Get messages
					function(callback){
						var role = (USERNAME.roles_admin ? "admin":(USERNAME.roles_asm ? "asm":(USERNAME.roles_sr ? "sr":"guest")));

						messageDataStore.setURL(CouchDB.protocol + CouchDB.host + "/loreal_app/_design/messages/_list/message_list/all_messages?descending=true&username=" + USERNAME.username + "&roles=" + role);
						//Set message url
						messagelist.setURL("proxyCouchDB->../messages/_list/message_list/all_messages?descending=true&username=" + USERNAME.username + "&roles=" + role);

						messageDataStore.loadData(callback);
					},
					//build user interface according to role(s)						
					function(callback){
						var role = (USERNAME.roles_admin ? 'roles_admin':(USERNAME.roles_asm ? 'roles_asm':((USERNAME.roles_sr || USERNAME.roles_guest) ? 'roles_sr':'')));
						mainlayout.setToolbar(role);


						//Get SR Report template
						activitytable.setFormularRaportSR(reportDataStore.getReportTemplate());

						//Get asm list
						userstable.setASMList(userDataStore.getASMUserList());
						userstable.setUsersTable(role);

						//Get SR List
						outletstable.setSRList(userDataStore.getSRUserList());

						//Set users in Agenda
						agenda.setUsers(userDataStore.getUserList());
						//Set outlets in Agenda
						agenda.setOutlets(outletDataStore.getOutletList());
						//Set load url
						if(role == "roles_admin") agenda.setURL("../events/_list/events_list/all_events");
						if(role == "roles_sr") agenda.setURL("../events/_list/events_list/all_events?startkey=[\""+ USERNAME.username +"\"]&endkey=[\""+ USERNAME.username +"\",{}]");
						if(role == "roles_asm") {
							var sr_list = userDataStore.getSRUserList();
							var url_array = [];
							for(var i = 1; i< sr_list.length; i++){
								url_array.push("../events/_list/events_list/all_events?startkey=[\""+ sr_list[i] +"\"]&endkey=[\""+ sr_list[i] +"\",{}]")
							}
							agenda.setURL(url_array);
						}
						
						//load the interface
						logic.main();
						webix.message(USERNAME.name + " " + USERNAME.surname + "<br/>Bine aţi venit în aplicaţia SR Manager!");						
						
						callback(null,"interface init done!");
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
		*/	
		//load the interface
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