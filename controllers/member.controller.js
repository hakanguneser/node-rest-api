const MemberModel = require('../model/member.model');

exports.getAllMembers = (req, res, next) => {
    res.json('Member route get all function called');
};


exports.createMember = async (req, res, next) => {
    try {
        const createdMember = await MemberModel.create(req.body);
        res.status(201).json(createdMember);
    } catch (error) {
        next(error);
    }
};