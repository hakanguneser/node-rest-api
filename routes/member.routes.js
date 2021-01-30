const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

router.post('/', memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:memberId',memberController.findByMemberId);

module.exports = router;