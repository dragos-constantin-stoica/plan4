//main menu with all components
var mainlayout = {

	mytoolbar:
	{
		view:"toolbar",
		id:"myToolbar",
		cols:[

			{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
			{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
			{ view:"button", id:"rooms", type:"iconButton", icon:"house", label:"Sali", width:120, click:"roomsOnClick();"},


			{},
			{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
		]
	
	},

	//main layout
	getMainLayout: function () {
		return {
			id: "main",
			type: "wide",
			rows:[
			{
				rows:[
				webix.copy(this.mytoolbar)	
				]
			},
			{
				view:"multiview",
				fitBiggest:true,
				//animate:false,
				id:"mainpage",
				cells:[
				//Add planner by default --- dhtmlxScheduler initialization
				//webix.copy(discipline.getdiscipline())
				{template:"Aici vin widget-urile ..."}
				]
			}
			]
		};
	},	

	getToolbar: function () {
		return this.mytoolbar;
	},

	setToolbar: function (role) {
		if(role == 'admin'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[
					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
					{ view:"button", id:"rooms", type:"iconButton", icon:"house", label:"Sali", width:120, click:"roomsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
			
			};
		};

		if(role == 'sef_de_grupa'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[

					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
					{ view:"button", id:"rooms", type:"iconButton", icon:"house", label:"Sali", width:120, click:"roomsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
	
			};
		}

		if(role == 'student'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[

					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
			};
		}

		if(role == 'profesor'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[

					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
					{ view:"button", id:"rooms", type:"iconButton", icon:"house", label:"Sali", width:120, click:"roomsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
			};
		}				
	


		if(role == 'secretara'){
			this.mytoolbar = {
				view:"toolbar",
				id:"myToolbar",
				cols:[

					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"professors", type:"iconButton", icon:"user", label:"Profesori", width:120, click:"professorsOnClick();"},
					{ view:"button", id:"rooms", type:"iconButton", icon:"house", label:"Sali", width:120, click:"roomsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
			};
		}

	}
};




function studentsOnClick () {
	if(webix.isUndefined($$('studentsview'))){
		$$('mainpage').addView({id:"studentsview", rows:[webix.copy(studentstable.getStudentsTable()),webix.copy(studentstable.getStudentsMenu())]});
		$$('mainpage').resize(true);
		$$('studentstable').refresh();
	}
	$$('studentsview').show();		
};


function professorsOnClick () {
	if(webix.isUndefined($$('professorsview'))){
		$$('mainpage').addView({id:"professorsview", rows:[webix.copy(professorstable.getProfessorsTable()),webix.copy(professorstable.getProfessorsMenu())]});
		$$('mainpage').resize(true);
		$$('professorstable').refresh();
	}
	$$('professorsview').show();		
};

function roomsOnClick(){
	if(webix.isUndefined($$('roomsview'))){
		$$('mainpage').addView({id:"roomsview", rows:[webix.copy(roomstable.getRoomsTable()),webix.copy(roomstable.getRoomsMenu())]});
		$$('mainpage').resize(true);
		$$('roomstable').refresh();
	}
	$$('roomsview').show();		
};






function logoutOnClick(){

	webix.storage.session.remove('USERNAME');
	
	if(!webix.isUndefined($$('loginform'))) $$('loginform').destructor();
	if(!webix.isUndefined($$('loginwindow'))) $$('loginwindow').destructor();
	if(!webix.isUndefined($$('main'))) $$('main').destructor();
	logic.init();
};

