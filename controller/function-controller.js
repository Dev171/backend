const nodemailer = require('nodemailer')
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


send = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'redev.gaming12@gmail.com',
            pass: 'Devil171!@#'
        }
    });

    var data = req.body
    var time = (Date.now() + '.txt').toString()
    var temp = data['konsumen'][0]
    var totalharga = 0

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("kulkasku")
        var myobj = { IDKonsumen: temp['WA'], Nama: temp['Nama']}
        dbo.collection("konsumen").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });

   fs.writeFile(time, '', function (err) {
       if (err) throw err;
   });

    MongoClient.connect(url, function (err, db) {
        for (var i = 0; i <= data['produk'].length - 1; i++) {
            var bit = data['produk'][i]
            var harga = bit['Harga'] * bit['Qty']
            if (err) throw err;
            var dbo = db.db("kulkasku")
            var times = Date.now().toString()
            var myobj = {}
            totalharga += harga
            myobj = { No: times, IDTransaksi: temp['WA'] + time, IDProduk: bit['IDProduk'], Harga: bit['Harga'], Qty: bit['Qty'], TotalHarga: harga }
            line = i + ' ' + bit['Produk'] + ' ' + bit['Harga'] + ' ' + bit['Qty'] + ' ' + harga + '\n'
            fs.appendFile(time, line, function (err) {
                if (err) throw err;
            });
            dbo.collection("detailtrans").insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("kulkasku")
        var myobj = { IDTransaksi: temp['WA'] + time, IDKonsumen: temp['WA'], Date: time, TotalHarga: totalharga }
        dbo.collection("transaksi").insertOne(myobj, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });



    var mailOptions = {
        from: 'redev.gaming12@gmail.com',
        to: 'adhiarta.wiandana@gmail.com',
        subject: '',
        text: time,
        attachment:[
            {
                filename: time,
                path: __dirname + '/' + time
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    send
}