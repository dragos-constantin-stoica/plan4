function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('username' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],
					'cadru_didactic' : {
						'nume_utilizator':payload['username'],
						'grad_didactic':payload['grad_didactic'],
						'titlu_stiintific':payload['titlu_stiintific'],
						'nume':payload['name'], 
						'prenume':payload['surname'],
						'telefon':payload['telephone'],
						'emails':payload['emails'],
						'parola':payload['password'],
						'facultate':payload['faculty'],
						'departament':payload['department'],															
						'rol_admin':payload['rol_admin'],
						'rol_profesor':payload['rol_profesor']
						
					},
					'activ':payload['active'], 
					'doctype':'profesor'
				}, JSON.stringify({"message":"Created"})];
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})];
    }
	doc['cadru_didactic']['grad_didactic'] = payload['grad_didactic']; 
	doc['cadru_didactic']['titlu_stiintific'] = payload['titlu_stiintific']; 
	doc['cadru_didactic']['nume'] = payload['name']; 
	doc['cadru_didactic']['prenume'] = payload['surname'];
	doc['cadru_didactic']['telefon'] = payload['telephone'];
	doc['cadru_didactic']['emails'] = payload['emails'];
	doc['cadru_didactic']['rol_admin'] = payload['rol_admin'];
	doc['cadru_didactic']['rol_profesor'] = payload['rol_profesor'];
	doc['cadru_didactic']['parola'] = payload['password'];
	doc['cadru_didactic']['facultate'] = payload['faculty'];
	doc['cadru_didactic']['departament'] = payload['department'];
	doc['activ'] = payload['active'];
	
    return [doc, JSON.stringify({"message":"Saved"})];
}