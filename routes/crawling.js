const express = require('express');
const router = express.Router();
const crawlingController = require('../models/crawling');
const authMiddleware = require('../utils/auth');


// crawling list
router.use('/list', authMiddleware)
router.get('/list', crawlingController.list);

// crawling post
router.use('/add', authMiddleware)
router.post('/add', crawlingController.add);


module.exports = router;