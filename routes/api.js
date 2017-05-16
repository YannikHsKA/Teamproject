var express = require('express');
var router = express.Router();
var client = require('twilio')('ACc4221e14d1d0540a89ec756b685ae93b','1b5bbdebb51c9059ef3dd8ddb5db2a1b');



//FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./firebasekey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lidl-smart.firebaseio.com"
});

router.get("/send", function(req, res) {
    client.sendMessage({
        to: '+4915787295695',
        from: '+4915735984837',
        body: 'Hello World'
    }, function(err, data){
        if(err){
            console.log("error:", err);
        }
        else{
            console.log("start");
            console.log(data);
        }
    });
    res.status(200).send("Success");
});

router.get("/test", function(req, res) {
console.log("test")
    res.status(200).send("Success!1");
});




/* Subscribe to the App */
router.post("/subscribe", function(req, res)
{
  /* Read POST Request */
  var user = req.body;
  console.log("body: %j", user)
  var phonenumber = user.phonenumber;

  /* Save Number into Firebase */
  var db = admin.database();
  var ref = db.ref("user");

  /* Generate Random setting_key */
  var settingkey1 = Math.random() * (90000 - 10000) + 10000;
  var settingkey2 = Math.floor(settingkey1);

  /* Write User into Firebase */
  ref.update(
  {
    [phonenumber]:
    {
      Whatsapp: 0,
      SMS: 1,
      setting_key : settingkey2
    }
  });

/* Send Notification SMS with Settingkey and Voucher */
   client.sendMessage({
     to: phonenumber,
     from: '+4915735984837',
     body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2 + " Viel Erfolg "
   }, function(err, data){
     if(err){
       console.log(err);
       res.status(500).send("Failure");
     }
     else{
       console.log(data);
       res.status(200).send("Success");
     }
   });
 });

 /* Checks if phonenumber is already subscribed */
 router.post("/user/:phonenumber", function(req, res)
 {
   /* Read POST Request */
   var phonenumber = req.params.phonenumber;

   console.log("nummer: "+phonenumber);

   /* Connect to Firebase */
   var db = admin.database();
   var ref = db.ref("user");

   ref.once('value', function(snapshot)
   {
     if (snapshot.hasChild(phonenumber))
     {
       var body= snapshot.child(phonenumber).val();
       res.status(200).json(body);
     }
     else{
       res.status(500).send("Failure");
       console.log("Phonenumber not subscribed");
     }
   });
 });

 /* Checks if phonenumber & verification combination is valid */
 router.post("/checkveritel", function(req, res)
 {
  /* Read POST Request */
  var user = req.body;
  console.log("body: %j", user)
  var phonenumber = user.phonenumber;
  var vericode = user.vericode;

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref('user/' + phonenumber);

  console.log(phonenumber);
  ref.once("value", function(snap) {
  if(snap.val().setting_key.toString() == vericode.toString())
  {
    var body= snap.val();
    res.status(200).send(body);
    console.log("Valid Combination");
  }
  else
  {
    res.status(500).send("Failure");
    console.log("Wrong Combination");
  }
  });
});


 /* Updates User Setting in Firebase */
 router.post("/updatesetting", function(req, res)
 {
   /* Read POST Request */
   var user = req.body;
   console.log("body: %j", user)
   var sms = user.sms;
   var whatsapp = user.whatsapp;
   var phonenumber = user.phonenumber;

   /* Connect to Firebase */
   var db = admin.database();
   var ref = db.ref('user');

   /* Write User into Firebase */
   ref.on('value', function(snap) {
     res.status(200).send("Success");
   });

   ref.update(
   {
     [phonenumber]:
     {
       Whatsapp: whatsapp,
       SMS: sms
     }
   });
 });




module.exports = router;
