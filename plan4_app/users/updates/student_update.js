function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('username' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],
					'date_personale':{
						'nume_utilizator':payload['username'], 
						'nume':payload['name'], 
						'prenume':payload['surname'],
						'telefon':payload['telephone'],
						'emails':payload['emails'],							
						'rol_sef':payload['rol_sef'],
						'rol_student':payload['rol_student']
				    },
					'activ':payload['active'], 
					'doctype':'student'
				}, JSON.stringify({"message":"Created"})];
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})];
    }	
	doc['date_personale']['nume'] = payload['name']; 
	doc['date_personale']['prenume'] = payload['surname'];
	doc['date_personale']['rol_sef'] = payload['rol_sef'];
	doc['date_personale']['rol_student'] = payload['rol_student'];
	doc['date_personale']['telefon'] = payload['telephone'];
	doc['date_personale']['emails'] = payload['emails'];
 	doc['activ'] = payload['active'];
	return [doc, JSON.stringify({"message":"Saved"})];
}