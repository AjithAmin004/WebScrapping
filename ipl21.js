const request = require('request');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
link="https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";


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
         console.log(clink);
    }

}

}