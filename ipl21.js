const request = require('request');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let link="https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

let leaderboard = [];
request(link,cb);

function cb(err,response,html){
if(err){
   console.log("error");
}else{
    let dom  = new JSDOM(html);
    const document = dom.window.document;
    let allscore = document.querySelectorAll("a[data-hover='Scorecard']");
    for(let i=0;i<allscore.length;i++){
         let link  = allscore[i].href;
         let clink = "https://espncricinfo.com"+link;
         request(clink,cb2);
    }

}

}

function cb2(err,response,html){
   if(err){
       console.log("err");
   }else{
       let dom = new JSDOM(html);
       let document = dom.window.document;
       let batsman =document.querySelectorAll(".table.batsman tbody tr");
       for(let i=0;i<batsman.length;i++){
           cells = batsman[i].querySelectorAll('td');
           if(cells.length==8){
            let name = cells[0].textContent;
            let runs = cells[2].textContent;
            let balls = cells[3].textContent;
            let fours = cells[5].textContent;
            let sixes = cells[6].textContent;
            processPlayer(name,runs,balls,fours,sixes);
            // console.log("Name : ",name,"Runs : ",runs,"Balls : ",balls,"Fours : ",fours,"Sixes : ",sixes);
           }   
       }
   }
}
function processPlayer(name,runs,balls,fours,sixes){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    for(let i=0;i<leaderboard.length;i++){
        let playerObj = leaderboard[i];
        if(playerObj.Name == name){
            //will do some work here
            playerObj.Runs+=runs;
            playerObj.Innings+=1;
            playerObj.Balls+=balls;
            playerObj.Fours+=fours;
            playerObj.Sixes+=sixes;
            return;
        }
  } 
  let obj = {
    Name:name,
    Innings:1,
    Runs:runs,
    Balls:balls,
    Fours:fours,
    Sixes:sixes
}
leaderboard.push(obj);
}