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
            console.log(error);
            console.log("Email not sent");
            res.sendStatus(500);
          } else {
            console.log(response);
            console.log("Email Sent");
            res.sendStatus(200);
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
        if (user.whatsapp ==0){
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
        });} else{
          console.log("new Whatsapp User")

        }
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
  console.log(event);

  // Connect to Firebase
  var db = admin.database();
  var ref = db.ref('admin/events');

  var newRef = ref.push({
    'title': event.title,
    'start': event.start,
    'end': event.end,
    'bundles': event.bundles
  });

  // Add Key to Entry
  var newID = newRef.key;
  newRef.update({
    id: newID
  })
  res.send(newID);
});

// Update Event
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
    'cweek': event.cweek,
    'bundles': event.bundles
  });

  res.sendStatus(201);
});

// Delete Event
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
router.get("/geteventbundles/:eventid", function(req, res) {
  console.log("Get Bundles");
  /* Read POST Request */
  var eventid = req.params.eventid;
  console.log("id", eventid);

  /* Connect to Firebase */
  var db = admin.database();
  var ref = db.ref('admin/events/' + eventid + '/bundles');
  var obj;

  ref.once('value', function(snapshot) {
    obj = snapshot.val();
    if (obj != undefined) {
      res.status(200).send(Object.keys(obj).map(name => obj[name]));
    }
  });
});

router.get("/getdatabundles/:week", function(req, res) {
    console.log("Get Databundles");

    /* Connect to Firebase */
    var db = admin.database();
    var week = req.params.week;
    var ref = db.ref('data/week' + week + '/bundles');
    var obj;

    ref.once('value', function(snapshot) {
        obj = snapshot.val();
        obj.bundle1.articles = Object.keys(obj.bundle1.articles).map(name => obj.bundle1.articles[name]);
        obj.bundle2.articles = Object.keys(obj.bundle2.articles).map(name => obj.bundle2.articles[name]);
        obj.bundle3.articles = Object.keys(obj.bundle3.articles).map(name => obj.bundle3.articles[name]);
        obj.bundle4.articles = Object.keys(obj.bundle4.articles).map(name => obj.bundle4.articles[name]);
        obj.bundle5.articles = Object.keys(obj.bundle5.articles).map(name => obj.bundle5.articles[name]);

        if (obj != undefined) {
            res.status(200).send(Object.keys(obj).map(name => obj[name]));
        }
    });
});


// Create & Update Bundle for Event
router.post("/createbundle/:bundlenum/:eventid", function(req, res) {
  console.log("Create Bundle");

  var bundlenum = req.params.bundlenum;
  var eventid = req.params.eventid;
  var bundle = req.body;

  var db = admin.database();
  var ref = db.ref('admin/events/' + eventid + '/bundles/bundle' + bundlenum);
  console.log("Ref: ", ref);

  var newRef = ref.update({
    'title': bundle.title,
    'description': bundle.description,
    'picture': bundle.picture,
      'id' : bundlenum
  });

  res.sendStatus(201);
});

// Create Notification
router.post("/createnotification/:eventid", function(req, res) {
    console.log("Create Notification");
    /* Read POST Request */
    let notification = req.body;
    console.log(notification);
    var eventid = req.params.eventid;
    console.log(eventid);

    // Connect to Firebase
    var db = admin.database();
    var ref = db.ref('admin/events/' + eventid + '/notifications' );

    var newRef = ref.push({
        'whatsapp_text': notification.whatsapp_text,
        'sms_text': notification.sms_text,
        'email_text': notification.email_text,
        'whatsapp_receiver': notification.whatsapp_receiver,
        'time': notification.time
    });

    // Add Key to Entry
    var newID = newRef.key;
    newRef.update({
        id: newID
    })
    res.send(newID);
});

// Get all Events
router.get("/getevents", function(req, res) {
  console.log("Get Events");

  // Connect Firebase
  var db = admin.database();
  var ref = db.ref('admin/events');

  ref.once('value', function(snapshot) {
    var obj = snapshot.val();
    res.status(200).send(Object.keys(obj).map(name => obj[name]));
  });
});

//Create PDF for Bundle
router.post("/createpdf", function(req, res) {
console.log("post angekommen");
    let event = req.body;
 console.log("title:" + event.title);
  console.log("Create PDF for Bundle ");
  let filename = "";
    let bundle;

  for (var i=0; i<2;i++) {
      console.log("i" + i);
      bundle = event.bundles[i];
      filename = './client/src/assets/bundle/bundle' + bundle.id + '.pdf';
      console.log(filename);
      var pdf = new pdfkit({
          info: {
              Title: bundle.title,
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

      pdf.fontSize(30).fillColor("black").text(bundle.description, 120, 200, {
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
          fs.createWriteStream(filename)
      )
          .on('finish', function () {
              console.log('PDF closed');

          });

      // Close PDF and write file.
      pdf.end();

  }

    res.sendStatus(201);
  /*  var file = fs.createReadStream('./bundle.pdf');
    var stat = fs.statSync('./client/src/assets/bundle/bundle.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
*/
});


// SEND NEWSLETTER

router.post("/sendEmailNewsletter", function(req, res) {
console.log("SEND EMAIL NEWSLETTER")
  var notification = req.body;

    // Connect to Firebase
    var db = admin.database();
    var ref = db.ref("user");

    ref.once('value', function(snapshot) {
        let user;

        snapshot.forEach(function (snapshot2) {
            var obj = snapshot2.val();

            var inputmail = obj.email_address;
            if (inputmail && obj.email == 1) {

                console.log("inputmail:" + inputmail);
                //console.log("Notify User about current Event");
                var mailOptions = {
                    from: "lidlsmartshopping@gmail.com",
                    to: inputmail,
                    subject: "Neue interessante Bundles!",
                    generateTextFromHTML: true,
                    html: notification.email_text
                };
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        console.log("Email not sent");
                        //res.sendStatus(500);
                    } else {
                        // console.log(response);
                        console.log("Email Sent");

                    }
                    smtpTransport.close();
                });

            }


        })
    });

});


router.post("/sendSMSNewsletter", function(req, res) {



    console.log("SEND SMS NEWSLETTER")
    var notification = req.body;

    // Connect to Firebase
    var db = admin.database();
    var ref = db.ref("user");

    ref.once('value', function(snapshot) {
        let user;

        snapshot.forEach(function (snapshot2) {
            var obj = snapshot2.val();

            var phonenumber = obj.phonenumber;
            if (phonenumber && obj.sms == 1) {

                console.log("Phonenumber:" + phonenumber);

                client.sendMessage({
                    to: phonenumber,
                    from: '+4915735984837',
                    body: notification.sms_text
                }, function(err, data) {
                    if (err) {
                         console.log(err);
                       // res.status(500).send("Failure");
                    } else {
                        // console.log(data);
                     //   res.status(200).send("Success");
                    }
                });


            }


        })
    });


});



//SETTINGS UPDATE NOTIFICATION

// Send Update Subscribe Email
router.post("/sendEmailUpdate_subscribe", function(req, res) {
    /* Read POST Request */
    var user = req.body;

    var inputmail = req.body.email_address;
    console.log(inputmail);
    // Send Notification Email with Setting Key and Voucher //
    // Check if email address already exists

    console.log("Notify User about Email Subscription");
    var mailOptions = {
        from: "lidlsmartshopping@gmail.com",
        to: req.body.email_address,
        subject: "Willkommen bei LIDL Smart Shopping!",
        generateTextFromHTML: true,
        html: "<b>Hallo!</b> neue Mail "
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            console.log("Email not sent");
            res.sendStatus(500);
        } else {
            // console.log(response);
            console.log("Email Sent");
            WriteUserToDB();
        }
        smtpTransport.close();
    });


});



// Send Update Subscribe Email
router.post("/sendEmailUpdate_unsubscribe", function(req, res) {
  /* Read POST Request */
  var user = req.body;

  var inputmail = req.body.email_address;
  console.log(inputmail);
  // Send Notification Email with Setting Key and Voucher //
  // Check if email address already exists

  console.log("Notify User about Email Unsubscription")


  var mailOptions = {
    from: "lidlsmartshopping@gmail.com",
    to: req.body.email_address,
    subject: "LIDL Smart Shopping - Unsubscribe",
    generateTextFromHTML: true,
    html: "<b>Hallo!</b> 'Von nun an erhalten Sie keine LIDL Smart Shopping Benachrichtigungen mehr auf diese E-Mail Adresse. "
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

});


router.post("/sendSMSUpdate_subscribe", function(req, res) {

  // Send Notification SMS with Settingkey and Voucher
  // Check if email address already exists
  var number = req.body.phonenumber;
  console.log("SMS Subscribe");

  client.sendMessage({
    to: number,
    from: '+4915735984837',
    body: "LIDL Smart Shopping! Sie haben erfolgreich diese Nummer registriert! Viel Spaß! "
  }, function(err, data) {
    if (err) {
      // console.log(err);
      res.status(500).send("Failure");
    } else {
      // console.log(data);
      res.status(200).send("Success");
    }
  });



});


router.post("/sendSMSUpdate_unsubscribe", function(req, res) {


  var number = req.body.phonenumber;
  console.log("number" + number);
  console.log("SMS Unsubscribe");

  client.sendMessage({
    to: number,
    from: '+4915735984837',
    body: "Lidl Smart Shopping: Sie haben sich erfolgreich abgemeldet! "
  }, function(err, data) {
    if (err) {
      // console.log(err);
      res.status(500).send("Failure");
    } else {
      // console.log(data);
      res.status(200).send("Success");
    }
  });
});


router.post("/sendWhatsAppUpdate_subscribe", function(req, res) {

  console.log("Whatsapp Subscribe");

});

router.post("/sendWhatsAppUpdate_unsubscribe", function(req, res) {

  console.log("Whatsapp Unsubscribe");

});






module.exports = router;
