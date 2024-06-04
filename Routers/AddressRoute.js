const express = require('express');
const {AddressController}= require("../Controllers/AddressController")

const router = express.Router();

router.get('/', AddressController.addAddress);
router.delete('/:addressId', AddressController.removeAddress);
router.get('/:addressId', AddressController.getUserAddresses);

module.exports = router;
