var express = require('express');
var router = express.Router();
var client = require('twilio')('ACc4221e14d1d0540a89ec756b685ae93b', '1b5bbdebb51c9059ef3dd8ddb5db2a1b');


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
    res.status(200).send("Success!1");
});


/* Subscribe to the App */
router.post("/subscribe", function (req, res) {
    /* Read POST Request */
    var user = req.body;
    console.log("body: %j", user)


    /* Generate Random setting_key */
    var settingkey1 = Math.random() * (90000 - 10000) + 10000;
    var settingkey2 = Math.floor(settingkey1);


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

    var db = admin.database();
    var ref = db.ref("user");
        user.id = ref.push().key; // this does *not* call the server

    /* Write User into Firebase */

    ref.push(
        {
            id : user.id,
            phonenumber: user.phonenumber,
            whatsapp: user.whatsapp,
            email: user.email,
            sms: user.sms,
            setting_key: settingkey2,
            email_address: user.email_address
        });

res.status(201).send(user);
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
    userRef.update({
            "sms": user.sms,
            "id" : user.id,
            "email": user.email,
            "email_address" : user.email_address,
            "whatsapp": user.whatsapp,
            "phonenumber": user.phonenumber
        }
    );

});


module.exports = router;
