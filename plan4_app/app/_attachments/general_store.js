//User information
var USERNAME = null;

//Remote database address
//var REMOTEDATABASE = "http://X.X.X.X/loreal_app";
var REMOTEDATABASE = "http://127.0.0.1:5984/plan4_app";

//Proxy for CouchDB
webix.proxy.proxyCouchDB = {
    $proxy:true,

    load:function(view, callback){
        //GET JSON Array from list->view  
        webix.ajax(this.source, callback, view);
    },
    save:function(view, update, dp, callback){

        //your saving pattern
        if(update.operation == "update"){
			webix.ajax().header({
			    "Content-type":"application/json"
			}).post(dp.config.url.source+ "\/" + update.data["_id"], 
				JSON.stringify(update.data), 
				[function(text, data, xhr){
			    //response
			    //console.log(text);
				//console.log(data.json());
				//console.log(xhr);
				var msg = data.json()
				if('message' in msg){
					var item = view.getItem(update.data["id"]);
					item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting new property and value for it
					view.updateItem(update.data["id"],item);
					view.refresh();							
				}
				},callback]
			);
		}

		if(update.operation == "insert"){
			webix.ajax().header({
			    "Content-type":"application/json"
			}).post(dp.config.url.source, 
				JSON.stringify(update.data), 
				[function(text, data, xhr){
			    //response
			    //console.log(text);
				//console.log(data.json());
				//console.log(xhr);
				var msg = data.json()
				if('message' in msg){
					var item = view.getItem(update.data["id"]);
					item._id = xhr.getResponseHeader('X-Couch-Id');
					item._rev = xhr.getResponseHeader('X-Couch-Update-NewRev'); //setting new property and value for it
					view.updateItem(update.data["id"],item);
					view.refresh();
				}
				}, callback]
			);
		}
	}
};
