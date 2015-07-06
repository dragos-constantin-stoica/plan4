function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('name' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],					
					'cod_curs':payload['course_code'],
					'denumire_curs_straina':payload['name'],
					'denumire_curs_ro':payload['name_ro'],
					'titular':payload['holder'], 
					'an_de_studii':payload['year'],
					'semestru':payload['semester'],
					'facultate':payload['faculty'],
					'forma_de_verificare':payload['verification'],
					'limba_predare':payload['teaching_language'],
					'nr_credite':payload['credit_nr'],
					'specializare':payload['specialization'],												
					'structura_curs' : {
						'ore_curs':payload['course_hours'],
						'ore_seminar':payload['seminar_hours'],
						'ore_laborator':payload['lab_hours'],
						'ore_proiect':payload['project_hours'],															
						'ore_individual':payload['individual_hours'],
						'ore_etcs':payload['etcs_hours'],
						'ore_curs_alocate':payload['course_hours_allocated'],
						'ore_seminar_alocate':payload['seminar_hours_allocated'],
						'ore_laborator_alocate':payload['lab_hours_allocated'],
						'ore_proiect_alocate':payload['project_hours_allocated'],															
						'profesor_alocat':payload['professor_allocated'],
						'alocat':payload['allocated']
							
					},
					'doctype':'curs'
				}, JSON.stringify({"message":"Created"})];
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})];
    }

    doc['cod_curs'] = payload['course_code']; 
    doc['denumire_curs_straina'] = payload['name']; 
    doc['denumire_curs_ro'] = payload['name_ro']; 
    doc['titular'] = payload['holder']; 
    doc['an_de_studii']=payload['year'];
    doc['semestru'] = payload['semester']; 
    doc['facultate'] = payload['faculty']; 
    doc['forma_de_verificare'] = payload['verification']; 
    doc['limba_predare'] = payload['teaching_language']; 
    doc['nr_credite'] = payload['credit_nr']; 
    doc['specializare'] = payload['specialization']; 
	doc['structura_curs']['ore_curs'] = payload['course_hours']; 
	doc['structura_curs']['ore_seminar'] = payload['seminar_hours']; 
	doc['structura_curs']['ore_laborator'] = payload['lab_hours']; 
	doc['structura_curs']['ore_proiect'] = payload['project_hours'];
	doc['structura_curs']['ore_individual'] = payload['individual_hours'];
	doc['structura_curs']['ore_etcs'] = payload['etcs_hours'];
	doc['structura_curs']['ore_curs_alocate'] = payload['course_hours_allocated'];
	doc['structura_curs']['ore_laborator_alocate'] = payload['lab_hours_allocated'];
	doc['structura_curs']['ore_seminar_alocate'] = payload['seminar_hours_allocated'];
	doc['structura_curs']['ore_proiect_alocate'] = payload['project_hours_allocated'];
	doc['structura_curs']['profesor_alocat'] = payload['professor_allocated'];
	doc['structura_curs']['alocat'] = payload['allocated'];
	doc['activ'] = payload['active'];
	
    return [doc, JSON.stringify({"message":"Saved"})];
}