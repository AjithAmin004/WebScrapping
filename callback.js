let fs = require('fs');

//Synchronous

// console.log("Before");

// let data = fs.readFileSync('file.txt','utf-8');
// console.log(data)

// console.log("after");  Before Hi Ajith

//Asynchronous

console.log("Before");
fs.readFile('file.txt','utf-8',afunc);

function afunc(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
}
// Before
//After
//Hi
console.log("After");
