movieService = (function () {

    var baseURL = "";

    // The public API
    return {
        findById: function(id) {
            return $.ajax(baseURL + "/movies/" + id);
        },
        findByName: function(searchKey) {
            return $.ajax({url: baseURL + "/movies", data: {name: searchKey}});
        }
    };

}());