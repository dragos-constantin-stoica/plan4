function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('username' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],					' 
					'name':payload['name'], 
					'location':payload['location'],							
					'associated_subjects':payload['associated_subjects'],
					'facilities':payload['facilities'],
					'active':payload['active'], 
					'doctype':'sala'
				}, JSON.stringify({"message":"Created"})]
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})]
    }
	
	doc['name'] = payload['name']; 
	doc['location'] = payload['location'];
	doc['associated_subjects'] = payload['associated_subjects'];
	doc['facilities'] = payload['facilities'];
	doc['active'] = payload['active'];
	
    return [doc, JSON.stringify({"message":"Saved"})]
}