function(doc) {

  if (doc.doctype == "secretara"){

    emit([doc.date_personale.nume_utilizator], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.date_personale.nume_utilizator, 
			"password":doc.date_personale.parola,
			"name": doc.date_personale.nume, 
			"surname":doc.date_personale.prenume,
            "telephone":doc.date_personale.telefon,
            "emails": doc.date_personale.emails,
 			"rol_admin": doc.date_personale.rol_admin,
			"rol_secretara": doc.date_personale.rol_secretara,        
			"active":doc.date_personale.activ
		}
	);
  }  
}