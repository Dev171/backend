var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


createProduk = (req, res) => {
/*    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Masukkan Data Produk',
        })
    }

    const produk = new Produk(body)

    if (!produk) {
        return res.status(400).json({ success: false, error: err })
    }

    produk
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: produk._id,
                message: 'Produk created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Produk not created!',
            })
        })
        */
}

updateProduk = async (req, res) => {
 /*   const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Produk.findOne({ _id: req.params.id }, (err, produk) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Produk not found!',
            })
        }
        produk.produk = body.produk
        produk.harga = body.harga
        produk.satuan = body.satuan
        produk
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: produk._id,
                    message: 'Produk updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Produk not updated!',
                })
            })
    })*/
}

deleteProduk = async (req, res) => {
    /*await Produk.findOneAndDelete({ _id: req.params.id }, (err, produk) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!produk) {
            return res
                .status(404)
                .json({ success: false, error: `Produk not found` })
        }

        return res.status(200).json({ success: true, data: produk })
    }).catch(err => console.log(err))*/
}

getProdukbyID = async (req, res) => {
    /*await Produk.findOne({ _id: req.params.id }, (err, produk) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!produk) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: produk })
    }).catch(err => console.log(err))*/
}

getProduks = async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("kulkasku")
        dbo.collection("produk").find({}).toArray(function (err, result) {
            if (err) return res.status(400).json({ success: false, error: err })
            if (!result.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` })
            }
            return res.status(200).json({ success: true, produk: result })
            db.close()
        });
    });
}

getTipe = async (req, res) => {
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("kulkasku")
        dbo.collection("tipeproduk").find({}).toArray(function (err, result) {
            if (err) return res.status(400).json({ success: false, error: err })
            if (!result.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Movie not found` })
            }
            return res.status(200).json({ success: true, tipeproduk: result })
            db.close()
        });
    });
} 


module.exports = {
    createProduk,
    deleteProduk,
    updateProduk,
    deleteProduk,
    getProdukbyID,
    getProduks,
    getTipe
}