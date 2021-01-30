const MemberModel = require('../model/member.model');

exports.getAllMembers = async (req, res, next) => {
    try {
        const memberList = await MemberModel.find({});
        res.status(200).json(memberList);
    } catch (error) {
        next(error);
    }
};

exports.createMember = async (req, res, next) => {
    try {
        const createdMember = await MemberModel.create(req.body);
        res.status(201).json(createdMember);
    } catch (error) {
        next(error);
    }
};