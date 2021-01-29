const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json('Member route get all function called');
});

module.exports = router;