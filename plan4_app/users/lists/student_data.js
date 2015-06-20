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
                    username:row.value.username,
                    name:row.value.name,
                    surname:row.value.surname,
                    telephone:row.value.telephone,
                    emails:row.value.emails,                    
                    rol_sef:row.value.rol_sef,
                    rol_student:row.value.rol_student,
                    active:row.value.active
                });
            }

        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}