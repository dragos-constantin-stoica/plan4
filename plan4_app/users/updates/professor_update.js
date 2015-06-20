function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('username' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],
					'username':payload['username'], 
					'name':payload['name'], 
					'surname':payload['surname'],							
					'rol_admin':payload['rol_admin'],
					'rol_profesor':payload['rol_profesor'],
					'active':payload['active'], 
					'doctype':'student'
				}, JSON.stringify({"message":"Created"})]
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})]
    }
	
	doc['name'] = payload['name']; 
	doc['surname'] = payload['surname'];
	doc['rol_admin'] = payload['rol_admin'];
	doc['rol_profesor'] = payload['rol_profesor'];
	doc['active'] = payload['active'];
	
    return [doc, JSON.stringify({"message":"Saved"})]
}