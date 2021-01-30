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
 *          email:
 *              type: String
 *              description: The member's personel and valid email address
 *              example: malfoy@mail.com
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

 /**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a Member.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMember'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Member'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: String
 *                   decription: Error information
 *                   example: Member validation failed; email; Path `email` is required.
*/

router.post('/', memberController.createMember);
router.get('/', memberController.getAllMembers);
router.get('/:memberId',memberController.findByMemberId);
router.put('/:memberId',memberController.updateMember);
router.delete('/:memberId',memberController.deleteMember);

module.exports = router;