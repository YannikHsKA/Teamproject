var express = require('express');
var router = express.Router();
var client = require('twilio')('ACc4221e14d1d0540a89ec756b685ae93b', '1b5bbdebb51c9059ef3dd8ddb5db2a1b');
var nodemailer = require('nodemailer');
var oauth = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: "Gmail",
    auth:
    {
    user : "lidlsmartshopping@gmail.com",
    pass :  "lidlsmartshopping123",
  }
}));

//FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./firebasekey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lidl-smart.firebaseio.com"
});

router.get("/send", function (req, res) {
    client.sendMessage({
        to: '+4915787295695',
        from: '+4915735984837',
        body: 'Hello World'
    }, function (err, data) {
        if (err) {
            console.log("error:", err);
        }
        else {
            console.log("start");
            console.log(data);
        }
    });
    res.status(200).send("Success");
});

router.post("/test", function (req, res) {
    console.log("test")
    res.status(200).send("Success!");
});


/* Subscribe to the App */
router.post("/subscribe", function (req, res) {
    /* Read POST Request */
    var mode = 0;
    var user = req.body;
    var number = req.body.phonenumber;
    console.log("body: %j", user);

    /* Generate Random setting_key */
    var settingkey1 = Math.random() * (90000 - 10000) + 10000;
    var settingkey2 = Math.floor(settingkey1);

    if(number == null)
    {
      //only email
      mode = 1;
      /*Send Notification Email with Setting Key and Voucher */
      var mailOptions = {
        from: "lidlsmartshopping@gmail.com",
        to: req.body.email_address  ,
        subject: "Willkommen bei LIDL Smart Shopping!",
        generateTextFromHTML: true,
        html: "<b>Hallo!</b> Dein Verification Key lautet " + settingkey2
        };

      smtpTransport.sendMail(mailOptions, function(error, response){
        if (error) {
           console.log(error);
         } else {
           console.log(response);
         }
         smtpTransport.close();
       });

    }
    else{
        mode = 2;
          /* Send Notification SMS with Settingkey and Voucher
          client.sendMessage({
              to: user.phonenumber,
              from: '+4915735984837',
              body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2 + " Viel Erfolg "
          }, function (err, data) {
              if (err) {
                  console.log(err);
                  res.status(500).send("Failure");
              }
              else {
                  console.log(data);
                  res.status(200).send("Success");
              }
          });
        */
    }

    var db = admin.database();
    var ref = db.ref("user");
    user.id = ref.push().key; // this does *not* call the server

    console.log("Mode: ", mode);

    /* Write User into Firebase */
    switch (mode)
    {
      case 1:
        ref.push(
            {
                phonenumber: "",
                id : user.id,
                email_address: user.email_address,
                email: user.email,
                sms: user.sms,
                whatsapp: user.whatsapp,
                setting_key: settingkey2,
            });
        res.status(201).send(user);
        break;
      case 2:
        ref.push(
            {
                phonenumber: user.phonenumber,
                id : user.id,
                email_address: "",
                email: 0,
                sms: user.sms,
                whatsapp: user.whatsapp,
                setting_key: settingkey2,
            });
        res.status(201).send(user);
        break;
    }
});


/* Checks if phonenumber is already subscribed */
router.get("/user/phone/:phonenumber", function (req, res) {
    /* Read POST Request */
    var phonenumber = req.params.phonenumber;
    console.log("Get User, number: " + phonenumber);

    /* Connect to Firebase */
    var db = admin.database();
    var ref = db.ref("user");

    ref.once('value', function (snapshot) {
    let found = false;
    let user;

            snapshot.forEach(function (snapshot2) {
                var obj = snapshot2.val();

                if (obj.phonenumber == phonenumber) {
                    found = true;
                    console.log("User found");
                    user = obj;
                }
                })
            if (found == true){
                    res.status(200).json(user);
                }
                else {
                    res.status(500).send("Failure");
                    console.log("Phonenumber not subscribed");
                }

    });
});

/* Checks if email is already subscribed */
router.get("/user/mail/:email_address", function (req, res) {
    /* Read POST Request */
    var email_address = req.params.email_address;

    console.log("Get User, mail: " + email_address);

    /* Connect to Firebase */
    var db = admin.database();
    var ref = db.ref("user");

    ref.once('value', function (snapshot) {
    let found = false;
    let user;

            snapshot.forEach(function (snapshot2) {
                var obj = snapshot2.val();

                if (obj.email_address == email_address) {
                    found = true;
                    console.log("User found");
                    user = obj;
                }
                })
            if (found == true){
                    res.status(200).json(user);
                }
                else {
                    res.status(500).send("Failure");
                    console.log("Email not subscribed");
                }

    });
});

/* Checks if phonenumber & verification combination is valid */
/*
router.post("/checkveritel", function (req, res) {
    // Read POST Request
    var user = req.body;
    console.log("Check Verification")
    var phonenumber = user.phonenumber;
    var vericode = user.vericode;

    // Connect to Firebase //
    var db = admin.database();
    var ref = db.ref("user");

    ref.once('value', function (snapshot) {
        let found = false;
        let user;

        snapshot.forEach(function (snapshot2) {
            var obj = snapshot2.val();

            if (obj.phonenumber == phonenumber) {
                found = true;
                console.log("user found");
                user = obj;
            }
        })
        if (found == true){
            res.status(200).json(user);
        }
        else {
            res.status(500).send("Failure");
            console.log("Phonenumber not subscribed");
        }

    });


    var ref = $http.get('/api/user/phone' + phonenumber)
        .map(res => res.json());

    console.log ("neue ref:" + ref);
    //   var ref = db.ref('user/' + phonenumber);

    console.log(phonenumber);
    ref.once("value", function (snap) {
        if (snap.val().setting_key.toString() == vericode.toString()) {
            var body = snap.val();
            res.status(200).send(body);
            console.log("Valid Combination");
        }
        else {
            res.status(500).send("Failure");
            console.log("Wrong Combination");
        }
    });
});
*/

/* Update User Settings in Firebase */
router.post("/updatesettings", function (req, res) {
    console.log("Update User");
    /* Read POST Request */
    let user = req.body;

    /* Connect to Firebase */
    var db = admin.database();
    var ref = db.ref("user");//.child(user.id);
    var userRef = ref.child(user.id);

    console.log("UserRef ",user.id);

    userRef.update({
            "email": user.email,
            "email_address" : user.email_address,
            "id" : user.id,
            "phonenumber": user.phonenumber,
            "setting_key": user.setting_key,
            "sms": user.sms,
            "whatsapp": user.whatsapp,

        }
    );

});







module.exports = router;
