var coursestable = {

	EDITSTOP: false,
	url: "",
	coursesdata : [],
	professornames: [],	
	layout: {
			view:"treetable",
			id: "coursestable",
			//autoconfig:true,
			columns:[
			{ id:"id",       header: "id", hidden:true, width: 50},
			{ id:"_id",      header: "_id", hidden:true, width: 50},
			{ id:"_rev",     header: "_rev", hidden:true, width: 50},
			{ id:"course_code", header:["Cod",{content:"textFilter"}], width:100, fillspace:true},		
			{ id:"name", header:"Denumire", hidden:true, editor:"text", width:300},		
			{ id:"name_ro",     header:["Denumire RO",{content:"textFilter"}], editor:"text", width:300},
			{ id:"holder",  header: ["Titular",{content:"textFilter"}], editor:"text", width:200},	
			{ id:"year",     header:["An",{content:"textFilter"}], editor:"text", width:50},
			{ id:"semester",     header:["Semestru",{content:"textFilter"}], editor:"text", width:50},
			{ id:"faculty",     header:["Faculty",{content:"textFilter"}], editor:"text", width:300},
			{ id:"verification",     header:["Ver",{content:"textFilter"}], editor:"text", width:50},
			{ id:"teaching_language",  header:["Predare",{content:"textFilter"}], editor:"text", width:50},
			{ id:"credit_nr",     header:["Credite",{content:"textFilter"}], editor:"text", width:50},
			{ id:"specialization",     header:["Specializare",{content:"textFilter"}], editor:"text", width:200},			
			{ id:"course_hours",     header:["Curs",{content:"textFilter"}], editor:"text", width:50},
			{ id:"lab_hours",     header:["Laborator",{content:"textFilter"}], editor:"text", width:50},
			{ id:"project_hours",     header:["Proiect",{content:"textFilter"}], editor:"text", width:50},
			{ id:"individual_hours",     header:["Idividual",{content:"textFilter"}], editor:"text", width:50},
			{ id:"etcs_hours",     header:["ETCS",{content:"textFilter"}], editor:"text", width:50},
			{ id:"holder",  header: ["Titular",{content:"textFilter"}], editor:"text", width:200},			
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
			save:"proxyCouchDB->../courses/_update/course_update"
	},
	coursesmenu: {
		view:"toolbar",
		    id:"coursestoolbar",
		    cols:[
				{ view:"button", id:"allocationcourse",    type:"iconButton", icon:"key",    label:"Alocare Curs", width:150, click:"allocation_course();" },
				{ view:"button", id:"newcourse",    type:"iconButton", icon:"plus",    label:"Curs nou", width:150, click:"new_course();" }
			]
	},	

	setURL: function(url){
		this.url = url;
	},

	getCoursesMenu: function () {
		return this.coursesmenu;
	},
		
	getCoursesTable: function(){
		return this.layout;
	},


	setCoursesTable:function (role,professorslist) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "coursestable",
					professornames: [],	
					//autoconfig:true,
					columns:[
					{ id:"id",       header: "id", hidden:true, width: 50},
					{ id:"_id",      header: "_id", hidden:true, width: 50},
					{ id:"_rev",     header: "_rev", hidden:true, width: 50},
					{ id:"course_code", header:["Cod",{content:"textFilter"}], editor:"text", width:150},		
					{ id:"name", header:["Denumire",{content:"textFilter"}], editor:"text", width:250},		
					{ id:"name_ro",     header:["Denumire RO",{content:"textFilter"}], editor:"text", width:250},
					{ id:"holder",  header: ["Titular",{content:"selectFilter"}], width:150, editor:"select", editValue:"value", options:professorslist},	
					{ id:"year",     header:["An",{content:"selectFilter"}], width:50, editor:"select", editValue:"value", options:ani_studiu},
					{ id:"semester",     header:["Semestru",{content:"selectFilter"}], width:50, editor:"select", editValue:"value", options:semestre},
					{ id:"faculty",     header:["Faculty",{content:"selectFilter"}], editor:"select", width:350, editValue:"value", options:facultati},
					{ id:"verification",     header:["Ver",{content:"selectFilter"}], editor:"select", width:50, editValue:"value", options:forme_examinare},
					{ id:"teaching_language",  header:["Predare",{content:"selectFilter"}], editor:"select", width:75,editValue:"value", options:limba_predare},
					{ id:"credit_nr",     header:["Credite",{content:"selectFilter"}], editor:"select", width:75, editValue:"value", options:numere},
					{ id:"specialization",     header:["Specializare",{content:"selectFilter"}], editor:"select", width:300, editValue:"value", options:specializari},			
					{ id:"course_hours",     header:["Curs",{content:"selectFilter"}], editor:"select",  width:50, editValue:"value", options:numere},
					{ id:"seminar_hours",     header:["Seminar",{content:"selectFilter"}], editor:"select",  width:75, editValue:"value", options:numere},
					{ id:"lab_hours",     header:["Laborator",{content:"selectFilter"}], editor:"select",  width:75, editValue:"value", options:numere},					
					{ id:"project_hours",     header:["Proiect",{content:"textFilter"}], editor:"select", width:75, editValue:"value", options:numere},
					{ id:"individual_hours",     header:["Idividual",{content:"textFilter"}],  width:75, editValue:"value",editor:"text"},					
					{ id:"etcs_hours",     header:["ETCS",{content:"selectFilter"}], editor:"select", width:50, editValue:"value", options:numere},
					{ id:"course_hours_allocated",     header:["Alocat Curs ",{content:"textFilter"}], width:100},
					{ id:"seminar_hours_allocated",     header:["Alocat Sem. ",{content:"textFilter"}], width:100},
					{ id:"lab_hours_allocated",     header:["Alocat Lab.",{content:"textFilter"}],  width:100},					
					{ id:"project_hours_allocated",  header:["Alocat Pr.",{content:"textFilter"}], width:100},
					{ id:"professor_allocated",     header:["Alocat Profesor",{content:"textFilter"}], width:150},							
					{ id:"allocated",  header:"Alocat", width:55,  template:"{common.checkbox()}", checkValue:true, uncheckValue:false },
					{ id:"active",  header:"Activ", width:55,  template:"{common.checkbox()}", editor:"checkbox", checkValue:true, uncheckValue:false }
					],
					// on:{
				 //        'onAfterAdd': addStudent,
				 //        // 'onAfterEditStop': function(state, editor, ignoreUpdate){
				 //        // 	coursestable.EDITSTOP = (editor.column != "boss_asm");
				 //        // },
				 //        'onDataUpdate': updateStudent
				 //    },
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:coursestable.url,
					save:"proxyCouchDB->../courses/_update/course_update"
			};
			this.coursesmenu = {
				view:"toolbar",
			    id:"coursestoolbar",
			    cols:[
					{ view:"button", id:"allocationcourse",    type:"iconButton", icon:"key",    label:"Alocare Curs", width:150, click:"allocation_course();" },
					{ view:"button", id:"newcourse",    type:"iconButton", icon:"plus",    label:"Curs nou", width:150, click:"new_course();" }

				]
			};
		};

	},	

		
	setCoursesData: function(coursesdata){
		this.coursesdata = coursesdata;
	},
	
	getCoursesData: function(){
		return this.coursesdata;
	},

	setProfessorNames: function(professornames){
		this.professornames = professornames;
	},

	getProfessorNames: function(){
		return this.professornames;

	}

};


//password form	
// var courseallocationform = {
// 	id: "courseallocationform",	
// 	professornames: [],			
// 	view:"form", 
// 	width:800,

// 	elements:[
// 			// { rows:[ { template:"Pentru cursul " + course_name + "este nevoie de", type:"clean"},
// 			// 		 { template:"Ore curs / saptamana: " + course_h, type:"clean"},
// 			// 		 { template:"Ore seminar / saptamana: " + seminar_h, type:"clean"},
// 			// 		 { template:"Ore laborator / saptamana: " + lab_h, type:"clean"},
// 			// 		 { template:"Ore proiect / saptamana:" + project_h + " .", type:"clean"},
// 			// 		 { template:"Titular curs: " + course_holder, type:"clean"},
// 			// 		 { template: "Alocati: ", type:"clean"}
// 			// 	   ]
		
// 			// },

// 				{ view:"text",id="course_a",  label:" Curs", name:"course_a", value:""},
// 				{ view:"text",id="seminar_a", label:"Seminar", name:"seminar_a", value:""},
// 				{ view:"text",id="lab_a", label:"Laborator", name:"lab_a", value:""},
// 				{ view:"text",id="project_a",  label:"Proiect", name:"project_a", value:""},
// 				{ view:"select",id="professor_a", label:"Profesor", name:"professor_a"},
// 				{ view:"button", label:"Aloca!" , type:"form", click:function(){

// 			if (! this.getParentView().validate()){
// 				webix.message({ type:"error", text:"Alegeti un profesor!" });
// 			}				
// 			else{
				
// 				var sel = $$('coursestable').getSelectedId();
// 				var row = $$('coursestable').getItem(sel.row);
// 				var course_name = row['name'];
// 				var course_h = (row['course_hours'] == "" ? 0 : row['course_hours']);
// 				var seminar_h = (row['course_hours'] == "" ? 0 : row['course_hours']);
// 				var lab_h = (row['course_hours'] == "" ? 0 : row['course_hours']);
// 				var project_h = (row['course_hours'] == "" ? 0 : row['course_hours']);
// 				var course_holder = row['holder'];
// 				var allocated_f = row['allocated'];
// 				var course_f = $$('course_a').getValue(); 
// 				var seminar_f = $$('seminar_a').getValue();
// 				var lab_f = $$('lab_a').getValue();
// 				var project_f = $$('project_a').getValue();
// 				var professor_f = $$('professor_a').getValue();

// 				if(course_h != course_f || seminar_h != seminar_f || lab_h != lab_f || project_h != project_f || professor_h != professor_f){
// 					row["course_hours_allocated"] = course_f;
// 					row["seminar_hours_allocated"] = seminar_f;
// 					row["lab_hours_allocated"] = lab_f;
// 					row["project_hours_allocated"] = project_f;
// 					row["professor_allocated"] = professor_f;					
// 					row["allocated_f"] = 'false';
// 					webix.message({ type:"error", text:"Cursul nu a fost marcat ca alocat!" });
// 				}
// 				else{

// 				coursestable.EDITSTOP = true;
// 				row["allocated_f"] = 'true';
// 				$$('coursestable').updateItem(sel.row, row);


// 				$$('new_course').hide();
// 				$$('courseallocationform').destructor();						
// 				$$('new_course').destructor();
// 				webix.message({text:"Cursul a fost alocat cu success!"});
// 				}						
// 			}
// 		 }
// 		}
// 	],
// 	rules:{
// 		"professor_a":webix.rules.isNotEmpty
// 	},

// 	setProfessorNames: function(professornames){
// 		this.professornames = professornames;
// 	},

// 	getProfessorNames: function(){
// 		return this.professornames;

// 	},
// 	 on:{
// 		'onAfterLoad': function(){$$('professor_a').define('options',this.getProfessorNames);$$('professor_a').refresh();}
// 		}


// };

function allocation_course(){
	if ($$('coursestable').getSelectedId(true).join()!==""){
				var sel = $$('coursestable').getSelectedId();
				var row = $$('coursestable').getItem(sel.row);
				var course_name = row['name'];
				var course_h = row['course_hours'];
				var seminar_h = row['seminar_hours'];
				var lab_h = row['lab_hours'];
				var project_h = row['project_hours'];
				var course_holder = row['holder'];
				var allocated_f = row['allocated'];

		webix.ui({
			view:"window",
			id: "allocation_course",
			width:1000,
			position:"top",
			head:"Alocare Curs!",
			body:{
				id: "courseallocationform",	
				professornames: [],			
				view:"form", 
				width:500,

				elements:[
						{rows:
							[ 
								{ template:"Pentru cursul " + course_name + "este nevoie de", type:"clean"},
								{ template:"Ore curs / saptamana: " + course_h, type:"clean"},
								{ template:"Ore seminar / saptamana: " + seminar_h, type:"clean"},
								{ template:"Ore laborator / saptamana: " + lab_h, type:"clean"},
								{ template:"Ore proiect / saptamana:" + project_h + " .", type:"clean"},
								{ template:"Titular curs: " + course_holder, type:"clean"},
								{ template: "Alocati: ", type:"clean"}
					 		]
					
						},

						{ view:"text", id:"course_a",  label:" Curs", name:"course_a", value:""},
						{ view:"text",id:"seminar_a", label:"Seminar", name:"seminar_a", value:""},
						{ view:"text",id:"lab_a", label:"Laborator", name:"lab_a", value:""},
						{ view:"text",id:"project_a",  label:"Proiect", name:"project_a", value:""},
						{ view:"select",id:"professor_a", label:"Profesor", name:"professor_a", options: professorDataStore.getProfessorNames()},
						{ view:"button", label:"Aloca!" , type:"form", click:function(){

							if (! this.getParentView().validate()){
								webix.message({ type:"error", text:"Alegeti un profesor!" });
							}				
							else{

								var course_f = $$('course_a').getValue(); 
								var seminar_f = $$('seminar_a').getValue();
								var lab_f = $$('lab_a').getValue();
								var project_f = $$('project_a').getValue();
								var professor_f = $$('professor_a').getValue();

								if(course_h != course_f || seminar_h != seminar_f || lab_h != lab_f || project_h != project_f || course_holder != professor_f){
									console.log([course_h,course_f,seminar_h,seminar_f,lab_h,lab_f,project_h,project_f,course_holder,professor_f]);
									row["allocated"] = false;
									$$('coursestable').updateItem(sel.row, row);
									webix.message({ type:"error", text:"Cursul nu a fost marcat ca alocat!" });
								}
								else{
									row["course_hours_allocated"] = course_f;
									row["seminar_hours_allocated"] = seminar_f;
									row["lab_hours_allocated"] = lab_f;
									row["project_hours_allocated"] = project_f;
									row["professor_allocated"] = professor_f;		
									row["allocated"] = true;
									coursestable.EDITSTOP = true;
									$$('coursestable').updateItem(sel.row, row);
									$$('allocation_course').hide();
									$$('courseallocationform').destructor();						
									$$('allocation_course').destructor();
									webix.message({text:"Cursul a fost alocat cu success!"});
								}						
							}
					 	}
					}
					],
					rules:{
						"professor_a":webix.rules.isNotEmpty
					}
				}
		}).show();
	}
	else{
		webix.message({type:"error",text:"Selectaţi un curs!"});
	}
};


var newcourseform = {
	id: "newcourseform",			
	view:"form", 
	width:400,

	elements:[
	{ rows:[ { template:"Curs nou!", type:"clean"}]
	},
		{ view:"text", type:"text", label:"Denumire", name:"newname", value:""},
		{ view:"text", type:'text', label:"Denumire RO", name:"newname_ro", value:""},
		{ view:"button", label:"Curs NOU!" , type:"form", click:function(){
			if (! this.getParentView().validate())
				webix.message({ type:"error", text:"Completati campul Denumire!" });
			else{
				
				$$('coursestable').add({rev:"new", 
					course_code:"",
					name:$$('newname').getValue(), 
					name_ro:$$('newname_ro').getValue(),
					holder:"",year:"",semester:"",faculty:"",
					verification:"",teaching_language:"",
					credit_nr:"",specialization:"",
					course_hours:"",lab_hours:"",
					project_hours:"",individual_hours:"",
					etcs_hours:"",course_hours_allocated:"",
					seminar_hours_allocated:"",
					lab_hours_allocated:"",
					project_hours_allocated:"",
					professor_allocated:"",allocated:"", active:true});
				$$('new_course').hide();
				$$('newcourseform').destructor();						
				$$('new_course').destructor();						
			}
		 }
		}
	],
	rules:{
		"newname":webix.rules.isNotEmpty
	}
};
function new_course(){
	webix.ui({
		view:"window",
		id: "new_course",
		width:400,
		position:"top",
		head:"Creare curs nou!",
		body:webix.copy(newcourseform)
	}).show();
};

