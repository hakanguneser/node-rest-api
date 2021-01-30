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
 *              example: draco@mail.com
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

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Retrieve a list of members.
 *     description: Retrieve a list of all members.
 *     responses:
 *       200:
 *         description: A list of all members.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Member'
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
 *                   example: Error information will be here.
*/
router.get('/', memberController.getAllMembers);

/**
 * @swagger
 * /members/{memberId}:
 *   get:
 *     summary: Retrieve a single member.
 *     description: Retrieve a single member.
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: AlfaNumeric ID of the member to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: A single member.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not exists.
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
 *                   example: Error information will be here.
*/
router.get('/:memberId',memberController.findByMemberId);

/**
 * @swagger
 * /members/{memberId}:
 *   put:
 *     summary: Update a single member.
 *     description: Update a single member.
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: AlfaNumeric ID of the member to retrieve and update.
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewMember'
 *     responses:
 *       200:
 *         description: Update a member and retrive it in response body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not exists.
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
 *                   example: Error information will be here.
*/
router.put('/:memberId',memberController.updateMember);

/**
 * @swagger
 * /members/{memberId}:
 *   delete:
 *     summary: Delete a single member.
 *     description: Delete a single member.
 *     parameters:
 *       - in: path
 *         name: memberId
 *         description: AlfaNumeric ID of the member to retrieve and delete.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Delete a member and retrive it in response body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not exists.
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
 *                   example: Error information will be here.
*/
router.delete('/:memberId',memberController.deleteMember);

module.exports = router;