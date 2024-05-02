const express = require('express');
const {AddressController}= require("../Controllers/AddressController")

const router = express.Router();

router.route('/').post(AddressController.addAddress).get(AddressController.getLoggedUserAddresses);

router.delete('/:addressId', AddressController.removeAddress);
router.put('/:addressId', AddressController.updateAddress);

module.exports = router;
