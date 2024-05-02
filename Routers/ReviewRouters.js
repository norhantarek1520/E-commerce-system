const express = require('express');
const router = express()
const {ReviewController} = require('../Controllers/ReviewController')
const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../Shared/Validator/reviewValidator');

router.get('/', ReviewController.getAllReviews)
router.get('/:id', ReviewController.getReview)
router.post('', ReviewController.createReview)
router.put('/:id', ReviewController.updateReview)
router.delete('/:id', ReviewController.deleteReview)

module.exports = router;
