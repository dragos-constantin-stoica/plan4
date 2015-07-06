var secretariestable = {

	EDITSTOP: false,
	url: "",
	secretariesdata : [],	
	layout: {
			view:"treetable",
			id: "secretariestable",
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
			{ id:"rol_secretara", header:"Rol Secretara", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },			
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
			save:"proxyCouchDB->../users/_update/secretary_update"
	},
	secretariesmenu: {
		view:"toolbar",
		    id:"secretariestoolbar",
		    cols:[
				{ view:"button", id:"passwordsecretary",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_secretary();" },
				{ view:"button", id:"newsecretary",    type:"iconButton", icon:"plus",    label:"Secretara noua", width:150, click:"new_secretary();" }
			]
	},	

	setURL: function(url){
		this.url = url;
	},

	getSecretariesMenu: function () {
		return this.secretariesmenu;
	},
		
	getSecretariesTable: function(){
		return this.layout;
	},


	setSecretariesTable:function (role) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "secretariestable",
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
					{ id:"rol_secretara", header:"Rol Secretara", width:100, template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false },			
					{ id:"active",      header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
					],
					// on:{
				 //        //'onAfterAdd': addsecretary,
				 //        // 'onAfterEditStop': function(state, editor, ignoreUpdate){
				 //        // 	secretariestable.EDITSTOP = (editor.column != "boss_asm");
				 //        // },
				 //        'onDataUpdate': updatesecretary
				 //    },
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:secretariestable.url,
					save:"proxyCouchDB->../users/_update/secretary_update"
			};
			this.secretariesmenu = {
				view:"toolbar",
			    id:"secretariestoolbar",
			    cols:[
					{ view:"button", id:"passwordsecretary",    type:"iconButton", icon:"key",    label:"Schimbă parola", width:150, click:"password_secretary();" },
					{ view:"button", id:"newsecretary",    type:"iconButton", icon:"plus",    label:"Secretara noua", width:150, click:"new_secretary();" }

				]
			};
		};

	},	

		
	setsecretariesData: function(usersdata){
		this.secretariesdata = secretariesdata;
	},
	
	getsecretariesData: function(){
		return this.secretariesdata;
	}

};


//password form	
var newsecretarypasswordform = {
	id: "newsecretarypasswordform",			
	view:"form", 
	width:400,

	elements:[
		{ view:"text", type:'password', label:"Parola", name:"newpassword", value:""},
		{ view:"button", label:"Schimbă parola!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"Parola nu este validă!" });
			else{
				secretariestable.EDITSTOP = true;
				
				var sel = $$('secretariestable').getSelectedId();
				var row = $$('secretariestable').getItem(sel.row);
				row["password"] = $$('newpassword').getValue(); 
				$$('secretariestable').updateItem(sel.row, row);

				$$('new_secretary').hide();
				$$('newsecretarypasswordform').destructor();						
				$$('new_secretary').destructor();
				webix.message({text:"Parola a fost schimbată!<br/>Salvaţi datele!"});						
			}
		 }
		}
	],
	rules:{
		"newpassword":webix.rules.isNotEmpty
	}
};

function password_secretary(){
	if ($$('secretariestable').getSelectedId(true).join()!==""){
		webix.ui({
			view:"window",
			id: "new_secretary",
			width:400,
			position:"top",
			head:"Parola nouă!",
			body:webix.copy(newsecretarypasswordform)
		}).show();
	}else{
		webix.message({type:"error",text:"Selectaţi o secretara!"});
	}
};

var newsecretaryform = {
	id: "newsecretaryform",			
	view:"form", 
	width:400,

	elements:[
	{ rows:[ { template:"Numele de utilizator nu se mai poate schimba!", type:"clean"}]
	},
		{ view:"text", type:"email", label:"Email", name:"newemail", placeholder:"secretara@pub.ro", value:""},
		{ view:"text", type:'password', label:"Parola", name:"newpassword", value:""},
		{ view:"button", label:"Secretara NOUA!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"E-mail sau parola nu sunt valide!" });
			else{
				//Get email on creation - this is not editable
				$$('secretariestable').add({rev:"new", 
					username:$$('newemail').getValue(), 
					password:$$('newpassword').getValue(), 
				    name:"", surname:"",
				    telephone:"", emails:"",
					rol_admin:false, rol_secretara:true, active:true});
				$$('new_secretary').hide();
				$$('newsecretaryform').destructor();						
				$$('new_secretary').destructor();						
			}
		 }
		}
	],
	rules:{
		"newemail":webix.rules.isEmail,
		"newpassword":webix.rules.isNotEmpty
	}
};
function new_secretary(){
	webix.ui({
		view:"window",
		id: "new_secretary",
		width:400,
		position:"top",
		head:"Creare secretara noua!",
		body:webix.copy(newsecretaryform)
	}).show();
};


