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
var path    = require('path');
var pdf2img = require('pdf2img');

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
          html: "<b>Hallo!</b> Dein Verification Key lautet " + settingkey2 + " Viel Erfolg. Bekomme 5% mit dem Code ASH737 "
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
          body: "Willkommen bei LIDL Smart Shopping!!! Dein Setting Key lautet... " + settingkey2
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
    'cweek': event.cweek,
    'bundles': event.bundles,
      'notifications': event.notifications
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


// Update CurrentEvent
router.post("/updatecurrentevent", function(req, res) {
    console.log("Update CurrentEvent");
    /* Read POST Request */
    let event = req.body;

    // Connect to Firebase
    var db = admin.database();
    var ref = db.ref('admin/currentevent/' + 0);

    var newRef = ref.update({
        'title': event.title,
        'cweek': event.cweek,
        'bundles': event.bundles,
        'id': event.id,
        'notifications': event.notifications
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

router.get("/getarticles", function(req, res) {
    console.log("Get Articles");

    /* Connect to Firebase */
    var db = admin.database();
    var ref = db.ref('artikel');
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


router.get("/getdatabundlescase2/:week/:ean", function(req, res) {
    console.log("Get Databundles");

    /* Connect to Firebase */
    var db = admin.database();
    var week = req.params.week;
    var ean = req.params.ean;
    var ref = db.ref('data/week' + week + '/happybundles/' + ean);
    var obj;

    ref.once('value', function(snapshot) {
        obj = snapshot.val();
        obj.bundle1.articles = Object.keys(obj.bundle1.articles).map(name => obj.bundle1.articles[name]);
        obj.bundle2.articles = Object.keys(obj.bundle2.articles).map(name => obj.bundle2.articles[name]);
        obj.bundle3.articles = Object.keys(obj.bundle3.articles).map(name => obj.bundle3.articles[name]);
        obj.bundle4.articles = Object.keys(obj.bundle4.articles).map(name => obj.bundle4.articles[name]);
        obj.bundle5.articles = Object.keys(obj.bundle5.articles).map(name => obj.bundle5.articles[name]);

        console.log(obj);

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
    if(obj != null) {
        res.status(200).send(Object.keys(obj).map(name => obj[name]));
    }
  });
});

// Get all Events
router.get("/getcurrentevent", function(req, res) {
    console.log("Get Currentevent");

    // Connect Firebase
    var db = admin.database();
    var ref = db.ref('admin/currentevent');

    ref.once('value', function(snapshot) {
        var obj = snapshot.val();
        if(obj != null) {
            res.status(200).send(Object.keys(obj).map(name => obj[name]));
        }
    });
});

//Create PDF for Bundle
router.post("/createpdf", function(req, res) {

    let event = req.body;
 console.log("title:" + event.title);
  console.log("Create PDF for Bundle ");


  let filename = "";
    let bundle;
      bundle = event.bundles[0];
    console.log(bundle.articles[0]);
   console.log(bundle.articles[0].ean);
    var article1_ean= "client/src/assets/articles/" + bundle.articles[0].ean + ".jpg";
    var article2_ean = "client/src/assets/articles/" + bundle.articles[1].ean + ".jpg";
    var article3_ean = "client/src/assets/articles/" + bundle.articles[2].ean + ".jpg";
    var done = false;


    try {
        var stats = fs.statSync(article1_ean);
        console.log('File exists');
    }
    catch(err) {
        console.log('it does not exist');
        article1_ean = "client/src/assets/notfound.jpg";
    }

    try {
        var stats = fs.statSync(article2_ean);
        console.log('File exists');
    }
    catch(err) {
        console.log('it does not exist');
        article2_ean = "client/src/assets/notfound.jpg";
    }


    try {
        var stats = fs.statSync(article3_ean);
        console.log('File exists');
    }
    catch(err) {
        console.log('it does not exist');
        article3_ean = "client/src/assets/notfound.jpg";
    }


    filename = './client/src/assets/bundle/bundle' + bundle.id + '.pdf';
      console.log(filename);


          var pdf = new pdfkit({
              size: [567, 690],
              info: {
                  Title: bundle.title,
                  Author: 'Lidl Smart Shopping',

              }
          });
          pdf.image('client/src/assets/pdf/weihnachts_bundle_theme.jpg', 0, 0, {
              scale: 1
          })

          /* pdf.moveTo(0, 435)
               .lineTo(700, 400)
               .stroke();

           pdf.image('client/src/assets/pdf/tree.jpg', 0, 120, {
               width: 700
           });
           pdf.moveTo(0, 435)
               .lineTo(700, 400)
               .stroke();

           pdf.rect(0, 119, 700, 700)
               .fillOpacity(0.7)
               .fill("white")
     */
          //pdf.fontSize(40).text('LIDL SMART SHOPPING', 130, 25);


          // pdf.rect(50, 300, 200, 30)
          //    .fillOpacity(0.8)
          //    .fill("red")

          pdf.fontSize(35).fillColor("black").text(bundle.title, 310, 120, {
              width: 220
          });

          pdf.fontSize(18).fillColor("black").text(bundle.description, 310, 200, {});

          pdf.fontSize(18).fillColor("black").text('Kaufen Sie diese drei Produkte gemeinsam und sparen Sie ' + (bundle.discount *100)+ ' %', 350, 300, {
              width: 220
          });
          pdf.image(article1_ean, 0, 420, {
              width: 190
          });

          pdf.image(article2_ean, 185, 420, {
              width: 190
          });

          pdf.image(article3_ean, 375, 420, {
              width: 190
          });


            pdf.rect(0, 560, 575, 40)
        .fillOpacity(1)
        .fill("white")

    pdf.fontSize(15).fillColor("black").text(bundle.articles[0].name, 15, 570, {
        width: 150
    });

    pdf.fontSize(15).fillColor("black").text(bundle.articles[1].name, 220, 570, {
        width: 150
    });

    pdf.fontSize(15).fillColor("black").text(bundle.articles[2].name, 430, 570, {
        width: 150
    });

          // Stream contents to a file
          pdf.pipe(
              fs.createWriteStream(filename)
          )
              .on('finish', function () {
                  console.log('PDF closed');



                  var input   = path.join(__dirname, '../client/src/assets/bundle/', 'bundle0.pdf');
                  console.log("dirname" + __dirname);
                  console.log("newdir" + input);
                  pdf2img.setOptions({
                      type: 'jpg',                                // png or jpg, default jpg
                      size: 1024,                                 // default 1024
                      density: 600,                               // default 600
                      outputdir: path.join(__dirname, '../client/src/assets/bundle'),       // output folder, default null (if null given, then it will create folder name same as file name)
                      outputname: 'bundle_picture',                         // output file name, dafault null (if null given, then it will create image name same as input name)
                      page: null                                  // convert selected page, default null (if null given, then it will convert all pages)
                  });

                  pdf2img.convert(input, function(err, info) {
                      if (err) console.log(err)
                      else console.log(info);
                  });


                  

              });

          // Close PDF and write file.
          pdf.end();






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
                    subject: "Neue interessante Bundles! Check out www.lidlsmartshopping.de/bundles" ,
                    generateTextFromHTML: true,
                    html: notification.email_text + "Check out www.lidlsmartshopping.de/bundle"
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
