function toggleClassOnElementClassSearch(elementName, className){

      // Récupérer l'ensemble des éléments de la ayant l'id ou la classe elementName
      // Utilisation de l'API QuerySelector
      // Pour plus d'informations sur l'API, voir :
      //http://www.alsacreations.com/article/lire/1445-dom-queryselector-queryselectorall-selectors-api.html
      var nodeList = document.querySelectorAll(elementName);

      // nodeList est un ensemble de réponse de type NodeList et non tableau
      // On ne peut donc pas lui appliquer directement des méthodes issues des tableau telles que forEach
      // Pour utiliser ces méthodes, on passe donc par un objet de type tableau
      // avec le mot clé call pour appeler ces méthodes sur des objets qui ne sont pas des tableaux -> on "emprunte" les méthodes des objets tbleaux pour les appliquer à d'autres types d'objets
      // Pour plus d'infos :
      // http://adripofjavascript.com/blog/drips/invoking-javascript-functions-with-call-and-apply.html
      [].forEach.call(nodeList, function(node){
        // Adding eventListener with onclick
        //   node.onclick = function(evt){
        //       [].filter.call(nodeList, function(node){
        //
        //       });
        //   this.classList.toggle(className);
        // };

        // Adding eventlistener with addEventListener
        // See : http://www.quirksmode.org/js/events_advanced.html
        // See also : https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
        node.addEventListener('click', toggleClassName, false);
      });

      function toggleClassName(){
        // http://www.quirksmode.org/js/events_advanced.html
        [].filter.call(nodeList, function(node){
          if(node.classList.contains(className)) node.classList.toggle(className);
          // node.classList.contains(className) ? node.classList.toggle(className) : 0;
        });
        this.classList.toggle(className);
      }
}
