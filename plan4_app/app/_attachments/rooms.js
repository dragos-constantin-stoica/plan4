var roomstable = {

	EDITSTOP: false,
	url: "",
	roomsdata : [],	
	layout: {
			view:"treetable",
			id: "roomstable",
			//autoconfig:true,
			columns:[
					{ id:"id",       header: "id", hidden:true, width: 50},
					{ id:"_id",      header: "_id", hidden:true, width: 50},
					{ id:"_rev",     header: "_rev", hidden:true, width: 50},
					{ id:"name",     header:["Nume",{content:"textFilter"}], editor:"text", width:200},
					{ id:"location",  header: ["Locatie",{content:"textFilter"}], editor:"text", width:200},							
					{ id:"associated_subjects", header:["Discipline Asociate",{content:"textFilter"}], width:300, fillspace:true},
					{ id:"nr_seats", header:["Numar Locuri",{content:"textFilter"}],  editor:"text", width:200},	
					{ id:"nr_pcs", header:["Numar PC-uri",{content:"textFilter"}],  editor:"text", width:200},					
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
			save:"proxyCouchDB->../rooms/_update/room_update"
	},
	roomsmenu: {
		view:"toolbar",
		    id:"roomstoolbar",
		    cols:[
				{ view:"button", id:"newroom",    type:"iconButton", icon:"plus",    label:"Student nou", width:150, click:"new_room();" }
			]
	},	

	setURL: function(url){
		this.url = url;
	},

	getRoomsMenu: function () {
		return this.roomsmenu;
	},
		
	getRoomsTable: function(){
		return this.layout;
	},


	setRoomsTable:function (role) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "roomstable",
					//autoconfig:true,
					columns:[
					{ id:"id",       header: "id", hidden:true, width: 50},
					{ id:"_id",      header: "_id", hidden:true, width: 50},
					{ id:"_rev",     header: "_rev", hidden:true, width: 50},
					{ id:"name",     header:["Nume",{content:"textFilter"}], editor:"text", width:200},
					{ id:"location",  header: ["Locatie",{content:"textFilter"}], editor:"text", width:200},							
					{ id:"associated_subjects", header:["Discipline Asociate",{content:"textFilter"}], width:300, fillspace:true},
					{ id:"nr_seats", header:["Numar Locuri",{content:"textFilter"}],  editor:"text", width:200},	
					{ id:"nr_pcs", header:["Numar PC-uri",{content:"textFilter"}],  editor:"text", width:200},					
					{ id:"active",      header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
					],
					// on:{
				 //        'onAfterAdd': addRoom,
				 //        // 'onAfterEditStop': function(state, editor, ignoreUpdate){
				 //        // 	roomstable.EDITSTOP = (editor.column != "boss_asm");
				 //        // },
				 //        'onDataUpdate': updateRoom
				 //    },
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:roomstable.url,
					save:"proxyCouchDB->../rooms/_update/room_update"
			};
			this.roomsmenu = {
				view:"toolbar",
			    id:"roomstoolbar",
			    cols:[
					{ view:"button", id:"newroom",    type:"iconButton", icon:"plus",    label:"Sala noua", width:150, click:"new_room();" }

				]
			};
		};

	},	

		
	setRoomsData: function(roomsdata){
		this.roomsdata = roomsdata;
	},
	
	getRoomsData: function(){
		return this.roomsdata;
	}

};


var newroomform = {
	id: "newroomform",			
	view:"form", 
	width:400,

	elements:[
	{ rows:[ { template:"Numele salii nu se mai poate schimba!", type:"clean"}]
	},
		{ view:"text", type:"text", label:"Nume", name:"newname", value:""},
		{ view:"text", type:'text', label:"Locatie", name:"newlocation", value:""},
		{ view:"button", label:"Sala NOUA!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"Completati ambele campuri!" });
			else{
				
				$$('roomstable').add({rev:"new", 
					name:$$('newname').getValue(), 
					location:$$('newlocation').getValue(), 
					associated_subjects:"",nr_seats:"", nr_pcs:"",				    
				    active:true});
				$$('new_room').hide();
				$$('newroomform').destructor();						
				$$('new_room').destructor();						
			}
		 }
		}
	],
	rules:{
		"newname":webix.rules.isNotEmpty,
		"newlocation":webix.rules.isNotEmpty
	}
};
function new_room(){
	webix.ui({
		view:"window",
		id: "new_room",
		width:400,
		position:"top",
		head:"Creare sala noua!",
		body:webix.copy(newroomform)
	}).show();
};





