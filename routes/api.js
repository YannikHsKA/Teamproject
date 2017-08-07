var express = require('express');
var router = express.Router();
var client = require('twilio')('ACc4221e14d1d0540a89ec756b685ae93b', '1b5bbdebb51c9059ef3dd8ddb5db2a1b');
var nodemailer = require('nodemailer');
var oauth = require('xoauth2');
//var gcloud = require('google-cloud');
var smtpTransport = require('nodemailer-smtp-transport');
var pdfkit = require('pdfkit');
var fs = require('fs');


var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: "Gmail",
  auth: {
    user: "lidlsmartshopping@gmail.com",
    pass: "lidlsmartshopping123",
  }
}));

//FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("./firebasekey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lidl-smart.firebaseio.com"
});

router.get("/send", function(req, res) {
  "use strict";
  client.sendMessage({
    to: '+4915787295695',
    from: '+4915735984837',
    body: 'Hello World'
  }, function(err, data) {
    if (err) {
      console.log("error:", err);
    } else {
      console.log("start");
      console.log(data);
    }
  });
  res.status(200).send("Success");
});

router.post("/test", function(req, res) {
  "use strict";
  console.log("test")
  res.status(200).send("Success!");
});



// Subscribe to the App
router.post("/subscribe", function(req, res) {
  /* Read POST Request */
  var mode;
  mode = 0;
  var user = req.body;
  var number = req.body.phonenumber;

  console.log("USERBODY: %j", user);

  // Generate Random setting_key
  var settingkey1 = Math.random() * (90000 - 10000) + 10000;
  var settingkey2 = Math.floor(settingkey1);

  //Connection to Database
  var db = admin.database();
  var ref = db.ref("user");

  if (number == null) {
    console.log("Mode 1");
    mode = 1; //mail mode
    var inputmail = req.body.email_address;
    // Send Notification Email with Setting Key and Voucher //
    // Check if email address already exists

    ref.orderByChild("email_address").equalTo(inputmail).once("value", function(snapshot) {
      var userData = snapshot.val();
      if (userData) // Email already exists
      {
        console.log("Email already exists");
        res.sendStatus(201);
      } else // Email does not exist
      {
        console.log("New Email");

        var mailOptions = {
          from: "lidlsmartshopping@gmail.com",
          to: req.body.email_address,
          subject: "Willkommen bei LIDL Smart Shopping!",
          generateTextFromHTML: true,
          html: "<b>Hallo!</b> Dein Verification Key lautet " + settingkey2
        };

        smtpTransport.sendMail(mailOptions, function(error, response) {
          if (error) {
            // console.log(error);
            console.log("Email not sent");
            res.sendStatus(500);
          } else {
            // console.log(response);
            console.log("Email Sent");
            WriteUserToDB();
          }
          smtpTransport.close();
        });

      }
    });
  } else {
    console.log("Mode 2");
    mode = 2;
    // Send Notification SMS with Settingkey and Voucher
    // Check if email address already exists

    ref.orderByChild("phonenumber").equalTo(number).once("value", function(snapshot) {
      var userData = snapshot.val();
      if (userData) // Phonenumber already exists
      {
        console.log("Phonenumber already exists");
        res.status(201).send("Success");
      } else // Phonenumber does not exist
      {
        console.log("New Phonenumber")
        WriteUserToDB();
        client.sendMessage({
          to: user.phonenumber,
          from: '+4915735984837',
          body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2 + " Viel Erfolg "
        }, function(err, data) {
          if (err) {
            // console.log(err);
            res.status(500).send("Failure");
          } else {
            // console.log(data);
            res.status(200).send("Success");
          }
        });
      }
    });
  }

  // Write User into Firebase
  function WriteUserToDB() {
    var newRef;
    switch (mode) {
      case 1:
        newRef = ref.push({
          phonenumber: "",
          id: "",
          email_address: user.email_address,
          email: user.email,
          sms: user.sms,
          whatsapp: user.whatsapp,
          setting_key: settingkey2,
        });
        break;
      case 2:
        newRef = ref.push({
          phonenumber: user.phonenumber,
          id: "",
          email_address: "",
          email: 0,
          sms: user.sms,
          whatsapp: user.whatsapp,
          setting_key: settingkey2,
        });
        break;
    }
    // Add Key to Entry
    var newID = newRef.key;
    newRef.update({
      id: newID
    })
  }
});

// Checks if phonenumber is already subscribed
router.get("/user/phone/:phonenumber", function(req, res) {
  /* Read POST Request */
  var phonenumber = req.params.phonenumber;
  console.log("Get User, number: " + phonenumber);

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref("user");

  ref.once('value', function(snapshot) {
    let found = false;
    let user;

    snapshot.forEach(function(snapshot2) {
      var obj = snapshot2.val();

      if (obj.phonenumber == phonenumber) {
        found = true;
        console.log("User found");
        user = obj;
      }
    })
    if (found == true) {
      res.status(200).json(user);
    } else {
      res.status(500).send("Failure");
      console.log("Phonenumber not subscribed");
    }

  });
});

// Checks if email is already subscribed
router.get("/user/mail/:email_address", function(req, res) {
  /* Read POST Request */
  var email_address = req.params.email_address;

  console.log("Get User, mail: " + email_address);

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref("user");

  ref.once('value', function(snapshot) {
    let found = false;
    let user;

    snapshot.forEach(function(snapshot2) {
      var obj = snapshot2.val();

      if (obj.email_address == email_address) {
        found = true;
        console.log("User found");
        user = obj;
      }
    })
    if (found == true) {
      res.status(200).json(user);
    } else {
      res.status(500).send("Failure");
      console.log("Email not subscribed");
    }

  });
});

// Checks if phonenumber & verification combination is valid
router.post("/checkveritel", function(req, res) {
  // Read POST Request
  var user = req.body;
  console.log("Check Verification")
  var phonenumber = user.phonenumber;
  var vericode = user.vericode;

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref("user");

  ref.once('value', function(snapshot) {
    let found = false;
    let user;

    snapshot.forEach(function(snapshot2) {
      var obj = snapshot2.val();

      if (obj.phonenumber == phonenumber) {
        found = true;
        console.log("user found");
        user = obj;
      }
    })
    if (found == true) {
      res.status(200).json(user);
    } else {
      res.status(500).send("Failure");
      console.log("Phonenumber not subscribed");
    }

  });

  var ref = $http.get('/api/user/phone' + phonenumber)
    .map(res => res.json());

  console.log(phonenumber);
  ref.once("value", function(snap) {
    if (snap.val().setting_key.toString() == vericode.toString()) {
      var body = snap.val();
      res.status(200).send(body);
      console.log("Valid Combination");
    } else {
      res.status(500).send("Failure");
      console.log("Wrong Combination");
    }
  });
});


// Update User Settings in Firebase
router.post("/updatesettings", function(req, res) {
  console.log("Update User");
  let user = req.body;
  //console.log(user);

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref('user/' + user.id);
  //console.log("Ref: ", ref);

  ref.update({
    'phonenumber': user.phonenumber,
    'email_address': user.email_address,
    'email': user.email,
    'sms': user.sms,
    'whatsapp': user.whatsapp
  });
  res.sendStatus(201);
});

// Create Event
router.post("/createevent", function(req, res) {
  console.log("Create Event");
  /* Read POST Request */
  let event = req.body;
  console.log(event.title);

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref('admin/events');

  var newRef = ref.push({
    'title': event.title,
    'start': event.start,
    'end': event.end
  });

  // Add Key to Entry
  var newID = newRef.key;
  newRef.update({
    id: newID
  })
  res.sendStatus(201);
});

// Create Event
router.post("/updateevent", function(req, res) {
  console.log("Update Event");
  /* Read POST Request */
  let event = req.body;
  console.log(event.title);

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref('admin/events/' + event.id);

  var newRef = ref.update({
    'title': event.title,
    'start': event.start,
    'end': event.end
  });

  res.sendStatus(201);
});

// Create Event
router.post("/deleteevent", function(req, res) {
  console.log("Remove Event");
  /* Read POST Request */
  let event = req.body;
  console.log(event.id);

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref('admin/events/' + event.id);

  ref.remove();

  res.sendStatus(201);
});



// Get Bundles for Event
router.get("/geteventbundles/:event", function(req, res) {
  console.log("Get Bundles");
  /* Read POST Request */
  var eventid = req.params.event;
  let bundle = req.body;

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref('admin/events/' + eventid + '/bundles');
  console.log("Ref: ", ref);

  ref.once('value', function(snapshot) {
    var obj = snapshot.val();
    res.status(200).send(Object.keys(obj).map(name => obj[name]));
  });
});

// Create & Update Bundle for Event
router.post("/createbundle/:num", function(req, res) {
  console.log("Create Bundle");
  /* Read POST Request */
  var num = req.params.num;
  let bundle = req.body;
  var eventid = bundle.id;

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref('admin/events/' + eventid + '/bundles/bundle' + num);
  console.log("Ref: ", ref);

  var newRef = ref.update({
    'title': bundle.title,
    'description': bundle.description,
    'picture': bundle.picture
  });

  res.sendStatus(201);
});

// Delete Bundle for Event
router.post("/deletebundle/:num", function(req, res) {
  console.log("Create Bundle");
  /* Read POST Request */
  var num = req.params.num;
  let bundle = req.body;
  var eventid = bundle.id;

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref('admin/events/' + eventid + '/bundles/bundle' + num);

  ref.remove();

  res.sendStatus(201);
});


// Get all Events
router.get("/getevents", function(req, res) {
  console.log("Get Events");

  // Connect Firebase
  var db = admin.database();
  var ref = db.ref('admin/events');

  ref.once('value', function(snapshot) {
    var obj = snapshot.val();
    delete obj["bundles"];
    res.status(200).send(Object.keys(obj).map(name => obj[name]));
  });
});

//Create PDF for Bundle
router.post("/createpdf", function(req, res) {

  console.log("Create PDF for Bundle ");
  var pdf = new pdfkit({
    info: {
      Title: 'lidlbundle',
      Author: 'Some Author',
    }
  });

  pdf.image('client/src/assets/Lidl-Logo.png', 25, 25, {
    width: 60
  });
  pdf.fontSize(40).text('LIDL-GOLD-CLUB.de', 120, 40);

  pdf.moveTo(0, 435)
    .lineTo(700, 400)
    .stroke();

  pdf.image('client/src/assets/pdf/tree.jpeg', 0, 120, {
    width: 700
  });
  pdf.moveTo(0, 435)
    .lineTo(700, 400)
    .stroke();

  pdf.rect(0, 119, 700, 700)
    .fillOpacity(0.8)
    .fill("white")

  pdf.fontSize(30).fillColor("black").text('Christmas Deakl lorem ipsi,m lorem ipsum lorem ipsum', 120, 200, {
    align: 'center'
  });

  pdf.rect(50, 300, 200, 30)
    .fillOpacity(0.8)
    .fill("red")

  pdf.fontSize(10).fillColor("black").text('LIDL Gold Discount!!!', 0, 300, {
    align: 'center'
  });


  // Stream contents to a file
  pdf.pipe(
      fs.createWriteStream('./file2.pdf')
    )
    .on('finish', function() {
      console.log('PDF closed');
    });

  // Close PDF and write file.
  pdf.end();


});








//SETTINGS UPDATE NOTIFICATION   Work in Progress

// Send Update Subscribe Email
router.post("/sendEmailUpdate_subscribe", function(req, res) {
    /* Read POST Request */
    var user = req.body;

    var inputmail = req.body.email_address;
    // Send Notification Email with Setting Key and Voucher //
    // Check if email address already exists

    console.log("Notify User about Email Subscription")
    /*
        ref.orderByChild("email_address").equalTo(inputmail).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) // Email already exists
            {
                console.log("Email already exists");
                res.sendStatus(201);
            } else // Email does not exist
            {
                console.log("send Update Mail");

                var mailOptions = {
                    from: "lidlsmartshopping@gmail.com",
                    to: req.body.email_address,
                    subject: "LIDL Smart Shopping - Einstellungsänderung",
                    generateTextFromHTML: true,
                    html: "<b>Hallo!</b> 'Von nun an erhalten Sie die LIDL Smart Shopping Benachrichtigungen auf diese E-Mail Adresse. "
                };

                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        // console.log(error);
                        console.log("Email not sent");
                        res.sendStatus(500);
                    } else {
                        // console.log(response);
                        console.log("Email Sent");
                        WriteUserToDB();
                    }
                    smtpTransport.close();
                });
            }
        });

        */
});


/*
        } else {
            console.log("Mode 2");
            mode = 2;
            // Send Notification SMS with Settingkey and Voucher
            // Check if email address already exists

            ref.orderByChild("phonenumber").equalTo(number).once("value", function(snapshot) {
                var userData = snapshot.val();
                if (userData) // Phonenumber already exists
                {
                    console.log("Phonenumber already exists");
                    res.status(201).send("Success");
                } else // Phonenumber does not exist
                {
                    console.log("New Phonenumber")
                    WriteUserToDB();
                    client.sendMessage({
                        to: user.phonenumber,
                        from: '+4915735984837',
                        body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2 + " Viel Erfolg "
                    }, function(err, data) {
                        if (err) {
                            // console.log(err);
                            res.status(500).send("Failure");
                        } else {
                            // console.log(data);
                            res.status(200).send("Success");
                        }
                    });
                }
            });
        }*/





module.exports = router;
