function(doc) {

  if (doc.doctype == "student"){

    emit([doc.date_personale.nume_utilizator], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.date_personale.nume_utilizator, 
			"name": doc.date_personale.nume, 
			"surname":doc.date_personale.prenume,
            "telephone":doc.date_personale.telefon,
            "emails": doc.date_personale.emails,
 			"rol_sef": doc.date_personale.rol_sef,
			"rol_student": doc.date_personale.rol_student,        
			"active":doc.date_personale.activ
		}
	);
  }  
}