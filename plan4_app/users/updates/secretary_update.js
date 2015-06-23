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
						'parola':payload['password'],						
						'emails':payload['emails'],							
						'rol_admin':payload['rol_admin'],
						'rol_secretara':payload['rol_secretara']
				    },
					'activ':payload['active'], 
					'doctype':'secretara'
				}, JSON.stringify({"message":"Created"})];
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})];
    }	
	doc['date_personale']['nume'] = payload['name']; 
	doc['date_personale']['prenume'] = payload['surname'];
	doc['date_personale']['rol_admin'] = payload['rol_admin'];
	doc['date_personale']['rol_secretara'] = payload['rol_secretara'];
	doc['date_personale']['telefon'] = payload['telephone'];
	doc['date_personale']['emails'] = payload['emails'];
	doc['date_personale']['parola'] = payload['password'];
 	doc['activ'] = payload['active'];
	return [doc, JSON.stringify({"message":"Saved"})];
}