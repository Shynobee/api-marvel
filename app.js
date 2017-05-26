/* aa816719413b2641faa162c513a25bcc = publickey */
/* 954a731b502a97bdbfadda492b8a98672457d3d0 = privatekey */
/*https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=a&apikey=aa816719413b2641faa162c513a25bcc*/
var app = (function app() { 
    "use strict";

    var btn,
        dataSet,
        displayData,
        results,
        searchCard,
        createCard,
        reqLimit = 100,
        getDataFromApi,
        apiKey = "aa816719413b2641faa162c513a25bcc";

    window.onload = function start() {

        btn = document.getElementById("get_data");
        results = document.getElementById("results");
        btn.onclick = getDataFromApi;
    };

    searchCard = function searchCard(data) {
        var search = document.getElementById('search');
        for (i = 0;  i < search.length; i += 1 ) {
            if (search.length === 0) {
                alert("aucune info !!!");
            } else {
                search.innerHTML(results);
            }
        }
    };

    createCard = function createCard(data) {
        var links = (function getLinks() {
            var str = "";

            function createLink(url, cls) {
                return `<a href="${url}" class="icon ${cls}"
target="_blank"></a>`;
            }

            data.urls.forEach(function parse(u) {
                if (u.type === "detail") {
                    str += createLink(u.url, "fa fa-info-circle");
                } else if (u.type === "comicLink") {
                    str += createLink(u.url, "fa-link");
                } else if (u.type === "wiki") {
                    str += createLink(u.url, "fa fa-wikipedia-w");
                }
            });
            return str;
        }());
        return `<div class="pri"><div class="card"><input type="hidden" class="inp" value="${data.id}"><h3 class=\"title\">${data.name}</h3><img class="img" src="${data.thumbnail.path}.${data.thumbnail.extension}"</div></div><div class="links"><a>${links}</a></div>`;
    };

    displayData = function displayData(dataSet) {
        results.innerHTML = "";
        dataSet.forEach(function parse(data) {
            //console.log(data);
            results.innerHTML += createCard(data);
        });
    };

    getDataFromApi = function getData() {
        var req, xhr;
        req = "https://gateway.marvel.com:443/v1/public/characters?limit=" + reqLimit + "&apikey=" + apiKey;
        xhr = new XMLHttpRequest();
        xhr.open("get", req);

        xhr.onload = function getResponse(evt) {
            var res = JSON.parse(this.response);
            console.log(res);
            //console.log(dataSet);
            displayData(res.data.results);
        };

        xhr.send();
    };

}());