const MemberModel = require('../model/member.model');

exports.findByMemberId = async(req,res,next)=>{
    try {
        const member = await MemberModel.findById(req.params.memberId);
        if(member){
            res.status(200).json(member);
        }else{
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

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