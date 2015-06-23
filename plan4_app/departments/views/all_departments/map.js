function(doc) {
  if (doc.doctype == "departament") {
    emit([doc.departament, doc.facultate], 
		{
			"_id": doc._id,
			"_rev": doc._rev,
			"department": doc.departament, 
			"faculty": doc.facultate

		}
	);
  } 
}