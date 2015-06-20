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
                    name:row.value.name,
                    location:row.value.location,
                    associated_subjects:row.value.associated_subjects,
                    facilities:row.value.facilities,
                    active:row.value.active
                });
            }

        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}