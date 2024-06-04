const asyncHandler = require('express-async-handler');
const User = require('../Models/User')
const { getUserId } = require("../Shared/SharedFunctions");
class AddressController {

    static addAddress = asyncHandler(async (req, res, next) => {
        // $addToSet => add address object to user addresses  array if address not exist
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { addresses: req.body },
            },
            { new: true }
        );

        res.status(200).json({ message: 'Address added successfully.', data: user.addresses, });
    });

    static removeAddress = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { addresses: { _id: req.params.addressId } },
            },
            { new: true }
        );

        res.status(200).json({ message: 'Address removed successfully.', data: user.addresses });
    });

    static getUserAddresses = asyncHandler(async (req, res, next) => {
        const userId = getUserId(req.headers.authorization.split(' ')[1])
        const user = await User.findById(userId).populate('addresses');

        res.status(200).json({ results: user.addresses.length, data: user.addresses, });
    });


}
module.exports = { AddressController }