
const express = require('express')

newFunction()

function newFunction() {
    const ProdukCtrl = require('../controller/produk-controller')
    const FuncCtrl = require('../controller/function-controller')

    const router = express.Router()

    router.post('/produk', ProdukCtrl.createProduk)
    router.post('/checkout', FuncCtrl.send)
    router.put('/produk/:id', ProdukCtrl.updateProduk)
    router.delete('/produk/:id', ProdukCtrl.deleteProduk)
    router.get('/produk/:id', ProdukCtrl.getProdukbyID)
    router.get('/produk', ProdukCtrl.getProduks)
    router.get('/tipe', ProdukCtrl.getTipe)

    module.exports = router
}
