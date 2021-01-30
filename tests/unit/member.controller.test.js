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