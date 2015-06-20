function(doc) {
  if (doc.doctype == "profesor"){
    emit([doc.cadru_didactic.nume_utilizator, doc.cadru_didactic.parola], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.cadru_didactic.nume_utilizator, 
			"name": doc.cadru_didactic.nume, 
			"surname":doc.cadru_didactic.prenume, 
			"rol_admin": doc.cadru_didactic.rol_admin,
			"rol_profesor": doc.cadru_didactic.rol_profesor,
			"active": doc.cadru_didactic.activ
		}
	);
  }

  if (doc.doctype == "student"){
    emit([doc.date_personale.nume_utilizator, doc.date_personale.parola], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.date_personale.nume_utilizator, 
			"name": doc.date_personale.nume, 
			"surname":doc.date_personale.prenume, 
			"rol_sef": doc.date_personale.rol_sef,
			"rol_student": doc.date_personale.rol_student,
			"active": doc.date_personale.activ
		}
	);
  }

  if (doc.doctype == "secretara"){
    emit([doc.date_personale.nume_utilizator, doc.date_personale.parola], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.date_personale.nume_utilizator, 
			"name": doc.date_personale.nume, 
			"surname":doc.date_personale.prenume, 
			"rol_admin": doc.date_personale.rol_admin,
			"rol_secretara": doc.date_personale.rol_secretara,
			"active": doc.date_personale.activ
		}
	);
  }     
}