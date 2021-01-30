const httpMocks = require('node-mocks-http');
const MemberController = require('../../controllers/member.controller');
const MemberModel = require('../../model/member.model');

const newMember = require('../mock-data/new-member.json');
const memberList = require('../mock-data/member-list.json');

jest.mock('../../model/member.model');

let req, res, next;
const memberId = '60149006a0405048902450ef';
const errorMessage = {
    message: "Error"
};
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe('MemberController.deleteMember', () => {
    it('should have a deleteMember function', () => {
        expect(typeof MemberController.deleteMember).toBe('function');
    });
    it('should call MemberModel.findByIdAndDelete', async () => {
        req.params.memberId = memberId;
        await MemberController.deleteMember(req, res, next);
        expect(MemberModel.findByIdAndDelete).toHaveBeenCalledWith(memberId);
    });
    it('should return deleted JSON body and response code 200', async () => {
        req.params.memberId = memberId;
        MemberModel.findByIdAndDelete.mockReturnValue(newMember);
        await MemberController.deleteMember(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newMember);
    });
    it('should handle error', async () => {
        const rejectedPromise = Promise.reject(errorMessage);
        MemberModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
        await MemberController.deleteMember(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
    it('should return 404 when member not exists', async () => {
        MemberModel.findByIdAndDelete.mockReturnValue(null);
        await MemberController.deleteMember(req, res, next);
        expect(res.statusCode).toBe(404);
    });
});
describe('MemberController.updateMember', () => {
    it('should have a updateMember function', () => {
        expect(typeof MemberController.updateMember).toBe('function');
    });
    it('should call MemberModel.findByIdAndUpdate', async () => {
        req.params.memberId = memberId;
        req.body = newMember;
        await MemberController.updateMember(req, res, next);
        expect(MemberModel.findByIdAndUpdate).toHaveBeenCalledWith(memberId, newMember, {
            new: true,
            useFindAndModify: false
        });
    });
    it('should return updated JSON body and response code 200', async () => {
        req.params.memberId = memberId;
        req.body = newMember;
        MemberModel.findByIdAndUpdate.mockReturnValue(newMember);
        await MemberController.updateMember(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newMember);
    });
    it('should handle error', async () => {
        const rejectedPromise = Promise.reject(errorMessage);
        MemberModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
        await MemberController.updateMember(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it('should return 404 when member not exists', async () => {
        MemberModel.findByIdAndUpdate.mockReturnValue(null);
        await MemberController.updateMember(req, res, next);
        expect(res.statusCode).toBe(404);
    });

});
describe('MemberController.findByMemberId', () => {
    it('should have a findByMemberId function', () => {
        expect(typeof MemberController.findByMemberId).toBe('function');
    });
    it('should call MemberModel.findById', async () => {
        req.params.memberId = memberId;
        await MemberController.findByMemberId(req, res, next);
        expect(MemberModel.findById).toBeCalledWith(memberId);
    });
    it('should return JSON body in response', async () => {
        req.params.memberId = memberId;
        MemberModel.findById.mockReturnValue(newMember);
        await MemberController.findByMemberId(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newMember);
    });
    it('should handle error', async () => {
        const rejectedPromise = Promise.reject(errorMessage);
        MemberModel.findById.mockReturnValue(rejectedPromise);
        await MemberController.findByMemberId(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it('should return 404 when member not exists', async () => {
        MemberModel.findById.mockReturnValue(null);
        await MemberController.findByMemberId(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(404);
    })
});

describe('MemberContoller.getAllMembers', () => {
    it('should have a getAllMembers function', () => {
        expect(typeof MemberController.getAllMembers).toBe('function');
    });
    it('should call MemberModel.find({})', () => {
        MemberController.getAllMembers(req, res, next);
        expect(MemberModel.find).toBeCalledWith({});
    });
    it('should return JSON body in response', async () => {
        MemberModel.find.mockReturnValue(memberList);
        await MemberController.getAllMembers(req, res, next);
        expect(res._isEndCalled()).toBeTruthy;
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(memberList);
    });
    it('should handle error', async () => {
        const rejectedPromise = Promise.reject(errorMessage);
        MemberModel.find.mockReturnValue(rejectedPromise);
        await MemberController.getAllMembers(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('MemberContoller.createMember', () => {
    beforeEach(() => {
        req.body = newMember;
    });
    it('should have a createMember function', () => {
        expect(typeof MemberController.createMember).toBe('function');
    });
    it('should call MemberModel.create', () => {
        MemberController.createMember(req, res, next);
        expect(MemberModel.create).toBeCalledWith(newMember);
    });
    it('should return JSON body in response', async () => {
        MemberModel.create.mockReturnValue(newMember);
        await MemberController.createMember(req, res, next);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toStrictEqual(newMember);
    });
    it('should handle error', async () => {
        const rejectedPromise = Promise.reject(errorMessage);
        MemberModel.create.mockReturnValue(rejectedPromise);
        await MemberController.createMember(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    })
});