const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

router.post('/', memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:memberId',memberController.findByMemberId);
router.put('/:memberId',memberController.updateMember);

module.exports = router;