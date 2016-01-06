//
// Avertissement : un seul événement window.onload sera exécuté
window.onload = function() {
  // http://stackoverflow.com/questions/19847582/chart-js-canvas-resize
  // DEFINE REQUEST FUNCTION
      // var datas = [], category =[], menuItems = [], title = [];
      var menuCategories = [];
      var datas =[];
      var menuItems = [];
      var theUl =  document.querySelector('nav ul#nav-mobile');
      var theContent = document.querySelector('main');
      var newLi;
      console.log(theUl);
      function request(url, next) {
          var req = new XMLHttpRequest();
          req.open('GET', url, true);

          // POur résoudre l'erreur FF "mal formé" on spécifie le type MIME du fichier
          req.overrideMimeType('text/javascript');
          // request.withCredentials = true;
          req.send();
          req.addEventListener("load", function () {
              if (req.status < 200 && req.status >= 400) {
                  next(new Error("We reached our target server, but it returned an error."));
              }else{
                next(null,JSON.parse(req.responseText));
              }
          });
          req.addEventListener("error", function () {
              next(new Error(req.status));
          });
      }

      // DEFINE RESPONSE FUNCTION
    function response(status, dataset){
      if(status){
          console.log('Error - request status : \n'+status);
      }else{
          console.log(dataset);
            dataset.refs.forEach(function(item){
              // var cat = category.indexOf(item.category)===-1 ? category.push(item.category):null;
            datas.push(item);
            addCard(item);

            if(menuCategories.indexOf(item.category)===-1 ){
              menuCategories.push(item.category);
              newLi = document.createElement("li");
              menuItems.push(newLi);
              newLi.innerHTML = item.category;
              newLi.addEventListener('click',selectMenuOption, false);
              theUl.appendChild(newLi);
            }
          });

          datas.forEach(function(item){
            if(item.category === datas[0].category) {
                  newH1 = document.createElement("h1");
                  newH1.innerHTML = item.title;
                  theContent.appendChild(newH1);
                }
          });
        }
      }


      request('./json/references.json', response);
      // request('./README.md', response);
      // http://www.alsacreations.com/article/lire/1445-dom-queryselector-queryselectorall-selectors-api.html

      function selectMenuOption(){
        var scope = this;
        var active = menuItems.filter(function(item){
         return item.classList.contains('selectedMenuItem');
        });
        if(active.length > 0) active[0].classList.toggle('selectedMenuItem');
        this.classList.toggle('selectedMenuItem');

        theContent.innerHTML = '';
        datas.forEach(function(item){
          if(item.category === scope.innerHTML) {
            addCard(item);
          }
        });
      }


      // When value is missing, replace by 0
      function addCard(item){
        newCard = document.createElement("div");
        newCard.innerHTML = '<div class="row">'+
        '<div class=\"col s12 m6\">'+
        '<div class=\"card blue-grey darken-1\">'+
        '<div class="card-content white-text">'+
        '<span class="card-title">'+
        item.title+
        '</span>'+
        '<p>'+
        item.description+
        '</p>'+
        '</div>'+
        '<div class="card-action">'+
        '<a href="#">'+
        item.link+
        '</a>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        theContent.appendChild(newCard);
        newCard.classList.add('row');
      }

      function emptyToZero(val){
        if(val){
          return val;
        }else{
          return 0;
        }
      }
};
