function request(url, next) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    // request.withCredentials = true;
    request.send();
    request.addEventListener("load", function () {
        if (request.status < 200 && request.status >= 400) {
            return next(new Error("We reached our target server, but it returned an error."));
        }
        // next(null, JSON.parse(request.responseText));
         next(null, request.responseText);
    });
    request.addEventListener("error", function () {
        return next(new Error("There was a connection error of some sort."));
    });
}




// REFS INSEE :
// http://rdf.insee.fr/def/index.html
// http://rdf.insee.fr/demo/index.html
// http://rdf.insee.fr/common/appli-help.html
// var code = document.getElementById('code').value.trim().toUpperCase();
var  code = 32;
var query = "prefix skos: <http://www.w3.org/2004/02/skos/core#> select ?libelle from <http://rdf.insee.fr/graphes/codes/nafr2> ";
query += "where {?s skos:notation \"" + code + "\" . ?s skos:prefLabel ?libelle filter(lang(?libelle) = 'fr')}";

// var query = "prefix idemo:<http://rdf.insee.fr/def/demo#> select ?libelle from <http://rdf.insee.fr/graphes/codes/nafr2> ";
// query += "SELECT ?departement ?nom ?popTotale WHERE {?region igeo:subdivisionDirecte ?departement .	?region igeo:codeRegion '24' . ?departement igeo:nom ?nom .	?departement idemo:population ?popLeg .	?popLeg idemo:populationTotale ?popTotale .	}"
// query += "where {?s skos:notation \"" + code + "\" . ?s skos:prefLabel ?libelle filter(lang(?libelle) = 'fr')}";
//
var url = "http://rdf.insee.fr/sparql?query=" + encodeURIComponent(query);
// $.getJSON(url).success(function(data) {
//    $('#resultat').html("<p>" + code + " - " + data.results.bindings[0].libelle.value + "</p>");
// })
// $.getJSON(url).success(function(data) {
//    console.log(data.results.bindings[0].libelle.value);
// })
// request("http://opendata.paris.fr/api/records/1.0/search?dataset=liste-des-antennes-wifi&rows=1000", function (err, response) {

//http://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-publications-statistiques/?tab=api

// http://opendata.paris.fr/explore/?refine.theme=Administration
//
// request('http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.strasmap.eu/remote.amf.json/Atmo.geometry') + '&callback=?', function (err, response) {
//     if (err) {
//       return err;
//     }
//     // console.log(xml.getElementsByTagName('libelle')[0].childNodes[0].nodeValue);
//     // console.log(response);
// });
//


$.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('http://www.strasmap.eu/remote.amf.json/Atmo.geometry') + '&callback=?', function(data){
	console.log(data.contents);
});


var req = new XMLHttpRequest();
req.withCredentials = 'true';


// Feature detection for CORS
if ('withCredentials' in req) {
    req.open('GET', 'https://www.data.gouv.fr/s/resources/monuments-et-tombes-de-personnalites-du-cimetiere-du-pere-lachaise/20141103-215847/perelachaise_data.json', true);

    // Just like regular ol' XHR
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
                // JSON.parse(req.responseText) etc.
                console.log('Gotcha'+data);
            } else {
                console.log('There was an error');
            }
        }
    };
    req.send();
}

// (function () {
//   console.log('auto');
//   var _callbacks = 0;
//   url='http://www.strasmap.eu/remote.amf.json/Atmo.geometry';
//   window.jsonp = function (url, callback) {
//     var id = 'jsonp_cb_' + _callbacks,
//         existing = document.scripts[0],
//         script = document.createElement('script');
//         console.log(existing);
//     script.src = url + (~url.indexOf('?') ? '&' : '?') + 'callback=' + id;
//     existing.parentNode.insertBefore(script, existing);
//
//     window[id] = function (data) {
//       script.parentNode.removeChild(script);
//       callback(data);
//       delete window[id];
//     };
//
//     _callbacks += 1;
//   };
//
// }());
