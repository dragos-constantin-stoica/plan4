function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        var results = [];         
        while (row = getRow()) {
            results.push(row.value.name + " " +row.value.surname);
        }
                
        send(JSON.stringify(results));
    });
}