

$(function() {

    var url = "https://api.propublica.org/congress/v1/113/house/members.json";



    fetch(url, {
        method: 'GET',
        headers: new Headers({
            "X-API-Key": "iEnDPHRsDtcLifJjtppt2ctS7UGR6QDwa3Y1WoVf"



        })


    })


    .then(function(res) {
        return res.json()





    })

    .then(function(data) {

        let res = data["results"][0].members;
        var app = new Vue({
            el: '#app',
            data: {

                miembros: res,
                List_or_republicans: [],
                List_of_democrats: [],
                List_of_independents: [],
                number_of_republicans: 0,
                number_of_democrats: 0,
                number_of_independents: 0,
                ravp: 0,
                davp: 0,
                iavp: 0,
                lessloyals: [],
                mostloyals: [],
                lessEngaged: [],
                mostEngaged: []


            },

            methods:{

                mVot : function(totalvotes,missedvotes){
                    res = Math.round(totalvotes*missedvotes/100);

                    return res


                }



            }

        })



        app.miembros.forEach(function(Donmiembro) {





            if (Donmiembro.party === "R") {

                app.List_or_republicans.push(Donmiembro);
                app.number_of_republicans = app.List_or_republicans.length;



            } else if (Donmiembro.party === "D") {

                app.List_of_democrats.push(Donmiembro);
                app.number_of_democrats = app.List_of_democrats.length;




            } else {
                app.List_of_independents.push(Donmiembro)
                app.number_of_independents = app.List_of_independents.length;





            };





        });

        app.ravp = AvgParty(app.List_or_republicans);
        app.davp = AvgParty(app.List_of_democrats);
        app.iavp = AvgParty(app.List_of_independents);

        app.lessloyals = sortLeastLoyal(app.miembros, "DESC");
        app.mostloyals = sortLeastLoyal(app.miembros, "ASC");
        app.lessEngaged = leastMostEngaged(app.miembros, "DESC");
        app.mostEngaged = leastMostEngaged(app.miembros, "ASC");






    })
    
    
    .catch(function(error) {

        console.log("Request failed" + error.message);
    })

    ;






    function AvgParty(partyList) {

        let total = 0;
        var AvgWithParty = 0;

        if (partyList.length <= 0) {
            AvgWithParty = 0;



        } else {


            partyList.forEach(function(member) {

                total = total + member.votes_with_party_pct;

            });

            AvgWithParty = total / partyList.length;


        }


        return AvgWithParty;


    }



    function sortLeastLoyal(partyList, orden) {

        var votes = [];

        if (orden === "DESC") {


            partyList.sort(function(a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct;

            });


        } else if (orden = "ASC") {

            partyList.sort(function(a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct;



            });


        }

        let tenpercent = (10 * partyList.length) / 100;


        for (let i = 0; i < tenpercent; i++) {
            votes.push(partyList[i]);



        }
        return votes;

    }





    function leastMostEngaged(partyList, orden) {
    
        var votes = [];

        if (orden === "DESC") {


            partyList.sort(function(a, b) {
                return b.missed_votes_pct - a.missed_votes_pct;

            });


        } else if (orden = "ASC") {

            partyList.sort(function(a, b) {
                return a.missed_votes_pct - b.missed_votes_pct;



            });


        }

        let tenpercent = (10 * partyList.length) / 100;


        for (let i = 0; i < tenpercent; i++) {
            votes.push(partyList[i]);



        }
        return votes;

    }














});



















    
    
   




     



window.onload = getArrayMembers();



        




