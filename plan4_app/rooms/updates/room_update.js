function(doc, req){
    var payload = JSON.parse(req.body);
	if (!doc){
        if ('name' in payload && 'location' in payload){
            // create new document
            return [
				{
					'_id': req['uuid'],				 
					'nume':payload['name'], 
					'locatie':payload['location'],							
					'discipline_asociate':payload['associated_subjects'],
					'dotari' : {
						'nr_locuri':payload['nr_seats'],
						'nr_pc':payload['nr_pcs']
					},
					'activ':payload['active'], 
					'doctype':'sala'
				}, JSON.stringify({"message":"Created"})]
        }
        // change nothing in database
        return [null, JSON.stringify({"error":"Task not created!"})]
    }
	
	doc['nume'] = payload['name']; 
	doc['locatie'] = payload['location'];
	doc['discipline_asociate'] = payload['associated_subjects'];
	doc['dotari']['nr_locuri'] = payload['nr_seats'];
	doc['dotari']['nr_pc'] = payload['nr_pcs'];	
	doc['active'] = payload['active'];
	
    return [doc, JSON.stringify({"message":"Saved"})]
}