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
                    password:row.value.password,
                    telephone:row.value.telephone,
                    emails:row.value.emails,                    
                    rol_admin:row.value.rol_admin,
                    rol_secretara:row.value.rol_secretara,
                    active:row.value.active
                });
            }

        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}