const httpMocks = require('node-mocks-http');
const MemberController = require('../../controllers/member.controller');
const MemberModel = require('../../model/member.model');

const newMember = require('../mock-data/new-member.json');
const memberList = require('../mock-data/member-list.json');
jest.mock('../../model/member.model');

let req, res, next;
const errorMessage = {
    message: "Error"
};
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
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
        await MemberController.getAllMembers(req,res,next);
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