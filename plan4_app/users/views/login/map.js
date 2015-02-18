function(doc) {
  if (doc.doctype == "resursa_umana"){
    emit([doc.cadru_didactic.nume_utilizator, doc.cadru_didactic.parola], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"username":doc.cadru_didactic.nume_utilizator, 
			"name": doc.cadru_didactic.nume, 
			"surname":doc.cadru_didactic.prenume, 
			"roles": doc.cadru_didactic.drepturi,
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
			"roles": doc.date_personale.drepturi,
			"active":doc.date_personale.activ
		}
	);
  }  
}