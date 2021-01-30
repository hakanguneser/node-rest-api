const express = require('express');
const router = express.Router();
const memberController = require('../controllers/member.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     NewMember:
 *      type: object
 *      properties:
 *          firstName:
 *              type: String
 *              description: The member's name on Identification card
 *              example: Draco
 *              required : true
 *          lastName:
 *              type: String
 *              description: The member's surname on Identification card
 *              example: Malfoy
 *              required : true
 *          age:
 *              type: Number
 *              description: The member's age
 *              example: 27 
 *              required : false
 *     Member:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: integer
 *               description: The Member's auto-generated unique identifier  
 *               example: 6014ae4def605657dc7b974d
*             _v:
 *               type: integer
 *               example: 0
 *         - $ref: '#/components/schemas/NewMember'
 *                  
 */

router.post('/', memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:memberId',memberController.findByMemberId);
router.put('/:memberId',memberController.updateMember);
router.delete('/:memberId',memberController.deleteMember);

module.exports = router;