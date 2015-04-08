//main menu with all components
var mainlayout = {

	mytoolbar:
	{
		view:"toolbar",
		id:"myToolbar",
		cols:[
			{ view:"button", id:"subjects", type:"iconButton", icon:"book", label:"Discipline", width:120, click:"subjectsOnClick();" },
			{ view:"button", id:"calendar", type:"iconButton", icon:"calendar", label:"Calendar", width:120, click:"calendarOnClick();"},
			{ view:"button", id:"rooms" , type:"iconButton", icon:"building-o", label:"Sali", width:120, click:"roomsOnClick();"},
			{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
			{ view:"button", id:"hresources", type:"iconButton", icon:"user", label:"Personal", width:120, click:"hresourcesOnClick();"},
			{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
			{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120, click:"messagesOnClick();"},
			{ view:"button", id:"allocation", type:"iconButton", icon:"envelope-o", label:"Alocare Cursuri", width:120, click:"allocationOnClick();"},
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
					{ view:"button", id:"subjects", type:"iconButton", icon:"book", label:"Discipline", width:120, click:"subjectsOnClick();" },
					{ view:"button", id:"calendar", type:"iconButton", icon:"calendar", label:"Calendar", width:120, click:"calendarOnClick();"},
					{ view:"button", id:"rooms" , type:"iconButton", icon:"building-o", label:"Sali", width:120, click:"roomsOnClick();"},
					{ view:"button", id:"students" , type:"iconButton", icon:"child", label:"Studenti", width:120, click:"studentsOnClick();"},
					{ view:"button", id:"hresources", type:"iconButton", icon:"user", label:"Personal", width:120, click:"hresourcesOnClick();"},
					{ view:"button", id:"reports", type:"iconButton", icon:"tachometer", label:"Rapoarte", width:120 },
					{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120, click:"messagesOnClick();"},
					{ view:"button", id:"allocation", type:"iconButton", icon:"envelope-o", label:"Alocare Cursuri", width:120, click:"allocationOnClick();"},
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
					{ view:"button", id:"subjects", type:"iconButton", icon:"book", label:"Discipline", width:120, click:"subjectsOnClick();" },
					{ view:"button", id:"calendar", type:"iconButton", icon:"calendar", label:"Calendar", width:120, click:"calendarOnClick();"},
					{ view:"button", id:"rooms" , type:"iconButton", icon:"building-o", label:"Sali", width:120, click:"roomsOnClick();"},
					{ view:"button", id:"messages", type:"iconButton", icon:"envelope-o", label:"Mesaje", width:120, click:"messagesOnClick();"},
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
					{ view:"button", id:"subjects", type:"iconButton", icon:"book", label:"Discipline", width:120, click:"subjectsOnClick();" },
					{ view:"button", id:"calendar", type:"iconButton", icon:"calendar", label:"Calendar", width:120, click:"calendarOnClick();"},
	 				{ view:"button", id:"rooms" , type:"iconButton", icon:"building-o", label:"Sali", width:120, click:"roomsOnClick();"},
					{},
					{ view:"button", id:"logout",type:"iconButton", icon:"sign-out", label:"Logout", width:120, click:"logoutOnClick();"}
				]
			};
		}		
	}
};

function calendarOnClick () {
	//Planner is loaded by default, do not create a new instance and do not unload/destroy it	
	$$('planner').show();
};

function roomsOnClick (){
	if(webix.isUndefined($$('roomsview'))){
		$$('mainpage').addView({id:"roomsview", rows:[webix.copy(roomstable.getRoomsTable()), webix.copy(roomsmenu)]});
		$$('mainpage').resize(true);
		//$$('roomstable').parse(roomstable.getOutletsData(), "json");
		$$('roomstable').refresh();
	};
	$$('roomsview').show();
};

function subjectsOnClick (){
	if(webix.isUndefined($$('subjectsview'))){
		$$('mainpage').addView({id:"subjectsview", rows:[webix.copy(subjectstable.getSubjectsTable()), webix.copy(subjectsmenu)]});
		$$('mainpage').resize(true);
		//$$('subjectstable').parse(subjectstable.getOutletsData(), "json");
		$$('subjectstable').refresh();
	};
	$$('subjectsview').show();
};

function reportsOnClick () {
	if (webix.isUndefined($$('reportsview')) && webix.isUndefined($$('photoview')) && webix.isUndefined($$('exportCSVlist')) && webix.isUndefined($$('evolutionPOSview'))) {
		$$('mainpage').addView({id:"reportsview", rows:[ webix.copy(reportswindow.getDashboard()), webix.copy(reportswindow.getMenu())]});
		$$('reportsview').show();
		$$('mainpage').resize(true);
		$$('reportpivot').render();
	}else {
		if ( !webix.isUndefined($$('photoview')) || !webix.isUndefined($$('exportCSVlist')) || !webix.isUndefined($$('evolutionPOSview')) ) {
			var active_view = (!webix.isUndefined($$('evolutionPOSview')))?$$('evolutionPOSview'):((!webix.isUndefined($$('exportCSVlist')))?$$('exportCSVlist'):$$('photoview'));
			webix.ui(webix.copy(reportswindow.getDashboard()), active_view);
		}
		if (!webix.isUndefined($$('reportsview'))) $$('reportsview').show();
		$$('mainpage').resize(true);
	}
};



function logoutOnClick(){

	webix.storage.session.remove('USERNAME');
	
	if(!webix.isUndefined($$('loginform'))) $$('loginform').destructor();
	if(!webix.isUndefined($$('loginwindow'))) $$('loginwindow').destructor();
	if(!webix.isUndefined($$('main'))) $$('main').destructor();
	logic.init();
};

