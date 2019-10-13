let tbody = document.querySelector("#body");
var url = "https://api.propublica.org/congress/v1/113/senate/members.json";

$(function() { 



    fetch(url, {
        method: 'GET',
        headers: new Headers({
            "X-API-Key": "iEnDPHRsDtcLifJjtppt2ctS7UGR6QDwa3Y1WoVf"



        })


    }).catch(function(error){

        console.log("Request failed" + error.message);
    })

    .then(function(res) {
          return res.json() })
    .then(function(data) {
            let res = data["results"][0].members;
            var app = new Vue({
                el: '#app',
                data: {
                  
                 miembros: res
                }
                
              })



            });

        
        });
       