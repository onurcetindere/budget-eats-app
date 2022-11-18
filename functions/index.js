const functions = require("firebase-functions");
const puppeteer = require('puppeteer');



async function getPrices(){
     
     return product
   
}


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.hi=functions.https.onRequest((req,res)=>{
    functions.logger.info("Hello logs!", {structuredData: true});
    functions.logger.info("Hello logs!");
   res.send("this is my first api call")
})

exports.scrape=functions.https.onRequest((req,res)=>{
    switch(req.method){
        case "GET":
            res.send("YOU SENDED GET DATA.")
            
            break;
        case "POST":
            const query=req.body.query
            functions.logger.info(query)
            product.scrape(query).then((e)=>res.send(e))
           
            break;
        default:
            res.send("this was different")

    }

})