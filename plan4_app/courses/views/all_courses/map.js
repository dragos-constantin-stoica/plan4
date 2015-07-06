function(doc) {

  if (doc.doctype == "curs"){

    emit([doc.denumire_curs_ro], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"course_code":doc.cod_curs, 			
			"name":doc.denumire_curs_straina,
			"name_ro": doc.denumire_curs_ro, 
			"holder":doc.titular,
			"year":doc.an_de_studii,
            "semester":doc.semestru,
            "faculty": doc.facultate,
            "verification":doc.forma_de_verificare,
            "teaching_language":doc.limba_predare,
 			"credit_nr": doc.nr_credite,
			"specialization": doc.specializare,        
			"course_hours":doc.structura_curs.ore_curs,
			"seminar_hours":doc.structura_curs.ore_seminar, 
			"lab_hours": doc.structura_curs.ore_laborator,
			"project_hours":doc.structura_curs.ore_proiect,
			"individual_hours": doc.structura_curs.ore_individual, 
			"etcs_hours":doc.structura_curs.ore_etcs,
            "course_hours_allocated":doc.structura_curs.ore_curs_alocate,
            "seminar_hours_allocated": doc.structura_curs.ore_seminar_alocate,
            "lab_hours_allocated":doc.structura_curs.ore_laborator_alocate,
            "project_hours_allocated":doc.structura_curs.ore_proiect_alocate,
 			"professor_allocated": doc.structura_curs.profesor_alocat,
			"allocated": doc.structura_curs.alocat,        
			"active":doc.activ
		}
	);
  }  
}