var reportstable = {

	EDITSTOP: false,
	url: "",
	reportsdata : [],

	layout: {
			view:"treetable",
			id: "reportstable",
			//autoconfig:true,
			columns:[
			{ id:"report", header:["Raport",{content:"textFilter"}], width:300, fillspace:true, value:""},		
			{ id:"faculty", header:"Facultate", editor:"select", width:300, value:""},		
			{ id:"department",     header:["Departament",{content:"textFilter"}], editor:"select", width:300, value:""},			
			{ id:"specialization",  header: ["Specializare",{content:"textFilter"}], editor:"select", width:300, value:""},
			{ id:"domain",header:["Domeniu",{content:"textFilter"}], editor:"select", width:300, value:""},
			{ id:"academic_year",     header:["An scolar",{content:"textFilter"}], editor:"select", width:200, value:""}

			],
			data:[{id:"1",report:"",faculty:"",department:"",specialization:"",domain:"",academic_year:""}],
			on:{

		        'onAfterEditStop': function(state, editor, ignoreUpdate){console.log("After edit stop");}
		    },
			drag:"row",
			editable:true,
			select:"row",
			navigation:true

	},
	reportsmenu: {
		view:"toolbar",
		    id:"reportstoolbar",
		    cols:[

				{ view:"button", id:"createreport",    type:"iconButton", icon:"file-pdf-o",    label:"Profesor nou", width:150, click:"create_report();" }
			]
	},

	getReportsMenu: function () {
		return this.reportsmenu;
	},
		
	getReportsTable: function(){
		return this.layout;
	},

	setReportsTable:function (role) {
		if(role == 'admin'){
			this.layout = {
					view:"treetable",
					id: "reportstable",
					//autoconfig:true,
					columns:[
					{ id:"report", header:"Raport", editor:"select",editValue:"value",width:300,  options:rapoarte},		
					{ id:"faculty", header:"Facultate", editor:"select",editValue:"value", width:400, options:facultati},		
					{ id:"department", header:"Departament", editor:"select", editValue:"value",width:400, options:departamente},			
					{ id:"specialization", header:"Specializare", editor:"select",editValue:"value", width:400, options:specializari},
					{ id:"domain",header:"Domeniu", editor:"select",editValue:"value", width:400,fillspace:true, options:domenii},
					{ id:"academic_year", header:"An scolar", editor:"select",editValue:"value", width:100, options:an_academic}

					],					
					data:[{id:"1",report:"",faculty:"",department:"",specialization:"",domain:"",academic_year:""}],
					drag:"row",
					editable:true,
					select:"row",
					navigation:true,
					url:reportstable.url,

			};
			this.reportsmenu = {
				view:"toolbar",
			    id:"reportstoolbar",
			    cols:[
	
					{ view:"button", id:"createreport",    type:"iconButton", icon:"file-pdf-o", label:"Generare Raport", width:150, click:"create_report();" }

				]
			};
		};

	}

};




function create_report(){

	if ($$('reportstable').getSelectedId(true).join()!==""){
		var sel = $$('reportstable').getSelectedId();
		var row = $$('reportstable').getItem(sel.row);
		var reporttype = row["report"];
		var faculty = row["faculty"];
		var department = row["department"];
		var specialization = row["specialization"];
		var domain = row["domain"];
		var academic_year = row["academic_year"];

	if(reporttype == "PLAN DE INVATAMANT"){

		var tabledata = courseDataStore.getCoursesPIV(faculty,specialization);

		var doc = {

		   	styles: {
			    header: {
			       fontSize: 10,
			       bold: true
			      
			    },		   
			  
			    content: {
			      fontSize: 10,
			      margin: [0,20,0,0]
			    }

		    },

		    pageOrientation: 'landscape',
						
			content: [  { text: "UNIVERSITATEA POLITEHNICA DIN BUCURESTI", style: 'header' },
						{ text: faculty, style: 'header' },
						{ text: "Departamentul de " + department, style: 'header' },
						{ text: "Domeniul: " + domain, style: 'header' },
						{ text: reporttype + " " +academic_year, style: 'header' },
						{ text: specialization, style: 'header' },
						{ text: "An 1 Semestrul 1", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[0].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 1 Semestrul 2", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[1].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 2 Semestrul 3", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[2].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 2 Semestrul 4", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[3].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 3 Semestrul 5", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[4].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 3 Semestrul 6", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[5].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 4 Semestrul 7", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[6].data)
							},
							pageBreak: 'after'
						},

						{ text: "An 4 Semestrul 8", style: 'header' },
						{
							style: 'content',
							headerRows: 1,
							table: {
								body: webix.copy(tabledata[7].data)
							}
						}




											
			]
			


		};

		pdfMake.createPdf(doc).open();
	

		}

		if(reporttype == "STAT DE FUNCTII"){


			var tabledata = courseDataStore.getCoursesSP(faculty,department);

			var doc = {

			   	styles: {
				    header: {
				       fontSize: 10,
				       bold: true
				      
				    },		   
				  
				    content: {
				      fontSize: 10,
				      margin: [0,20,0,0]
				    }

			    },

			    pageOrientation: 'landscape',
							
				content: [  
							{ text: faculty, style: 'header' },
							{ text: department, style: 'header' },
							
							{ text: reporttype + " " +academic_year, style: 'header' },
							
							
							{
								style: 'content',
								headerRows: 1,
								table: {
									body: webix.copy(tabledata[0].data)
								},
								pageBreak: 'after'
							}

						]		



			};

		}
	}
};

