const request = require('request');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const link  = "https://www.espncricinfo.com/series/ipl-2021-1249214/royal-challengers-bangalore-vs-kolkata-knight-riders-eliminator-1254115/full-scorecard";

request(link,cb);

function cb(err,response,html){
    if(err){
        console.log('error');
    }else{
        const dom = new JSDOM(html);
      const document = dom.window.document;
      let  bowlersTab = document.querySelectorAll(".table.bowler");
      let maxi = 0;
      let maxBowler="Ajith"
      for(let i=0;i<bowlersTab.length;i++){
          let row = bowlersTab[i].querySelectorAll("tbody tr");
          for(let j=0;j<row.length;j++){
           let td = row[j].querySelectorAll("td");
           if(td.length>1){
            //  console.log("NAME :",td[0].textContent," ","Wicket :",td[4].textContent);
            if(td[4].textContent>=maxi){
                maxi=td[4].textContent;
                maxBowler=td[0].textContent
            }
           }
          }
      }
      console.log(maxi);
      console.log(maxBowler)
   }
}
