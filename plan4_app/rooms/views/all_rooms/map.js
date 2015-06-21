function(doc) {

  if (doc.doctype == "sala"){

    emit([doc.locatie,doc.nume], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"name": doc.nume, 
			"location":doc.locatie,
            "associated_subjects":doc.discipline_asociate,
            "nr_seats": doc.dotari.nr_locuri,  
            "nr_pcs" : doc.dotari.nr_pc,     
			"active":doc.activ
		}
	);
  }  
}