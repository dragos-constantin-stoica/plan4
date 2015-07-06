function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        var results = [];
        var request = req.query;
        // we search for request.username and request.roles      
        while (row = getRow()) {
            if(request.roles == "admin"){
                results.push({
                    _id: row.value._id,
                    _rev: row.value._rev,                	
                    username:row.value.username,
                    grad_didactic:row.value.grad_didactic,
                    titlu_stiintific:row.value.titlu_stiintific,
                    password:row.value.password,
                    name:row.value.name,
                    surname:row.value.surname,
                    telephone:row.value.telephone,
                    emails:row.value.emails,
                    faculty:row.value.faculty,
                    department:row.value.department,                    
                    rol_admin:row.value.rol_admin,
                    rol_profesor:row.value.rol_profesor,
                    active:row.value.active
                });
            }

        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}