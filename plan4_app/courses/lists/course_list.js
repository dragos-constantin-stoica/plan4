function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
        // create an array for our result set
        var results = [];
        var request = req.query;
        // we search for request.username and request.roles      
        while (row = getRow()) {
 
                results.push({
                    _id: row.value._id,
                    _rev: row.value._rev,                	
                    course_code:row.value.course_code,
                    name:row.value.name,
                    name_ro:row.value.name_ro,
                    holder:row.value.holder,
                    year:row.value.year,
                    semester:row.value.semester,
                    faculty:row.value.faculty,
                    verification:row.value.verification,                    
                    teaching_language:row.value.teaching_language,
                    credit_nr:row.value.credit_nr,
                    specialization:row.value.specialization,
                    course_hours:row.value.course_hours,
                    seminar_hours:row.value.seminar_hours,
                    lab_hours:row.value.lab_hours,
                    project_hours:row.value.project_hours,
                    individual_hours:row.value.individual_hours,
                    etcs_hours:row.value.etcs_hours,
                    course_hours_allocated:row.value.course_hours_allocated,
                    seminar_hours_allocated:row.value.seminar_hours_allocated,
                    lab_hours_allocated:row.value.lab_hours_allocated,                    
                    project_hours_allocated:row.value.project_hours_allocated,
                    professor_allocated:row.value.professor_allocated,
                    allocated:row.value.allocated,
                    active:row.value.active
                });
            

        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}