function(doc) {

  if (doc.doctype == "profesor"){

    emit([doc.cadru_didactic.nume_utilizator], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.cadru_didactic.nume_utilizator,
			"password":doc.cadru_didactic.parola, 
			"grad_didactic": doc.cadru_didactic.grad_didactic,
			"titlu_stiintific":doc.cadru_didactic.titlu_stiintific,
			"name": doc.cadru_didactic.nume, 
			"surname":doc.cadru_didactic.prenume,
            "telephone":doc.cadru_didactic.telefon,
            "emails": doc.cadru_didactic.emails,
            "faculty":doc.cadru_didactic.facultate,
            "department":doc.cadru_didactic.departament,
 			"rol_admin": doc.cadru_didactic.rol_admin,
			"rol_profesor": doc.cadru_didactic.rol_profesor,        
			"active":doc.cadru_didactic.activ
		}
	);
  }  
}