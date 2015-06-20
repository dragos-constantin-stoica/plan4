function(doc) {

  if (doc.doctype == "sala"){

    emit([doc.locatie,doc.nume], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"name": doc.nume, 
			"location":doc.locatie,
            "associated_subjects":doc.discipline_asociate,
            "facilities": doc.dotari,       
			"active":doc.activ
		}
	);
  }  
}