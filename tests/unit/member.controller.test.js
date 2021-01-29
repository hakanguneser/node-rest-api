const httpMocks = require('node-mocks-http');
const MemberController = require('../../controllers/member.controller');
const MemberModel = require('../../model/member.model');

const newMember = require('../mock-data/new-member.json');

jest.mock('../../model/member.model');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});


describe('MemberContoller.getAllMembers', () => {
    it('should have a getAllMembers function', () => {
        expect(typeof MemberController.getAllMembers).toBe('function');
    });
});


describe('MemberContoller.createMember', () => {
    it('should have a createMember function', () => {
        expect(typeof MemberController.createMember).toBe('function');
    });
    it('should call MemberModel.create', () => {
        req.body = newMember;
        MemberController.createMember(req, res, next);
        expect(MemberModel.create).toBeCalledWith(newMember);
    });
    it('should return 201 response code',async()=>{
        req.body = newMember;
        await MemberController.createMember(req,res,next);
        expect(res.statusCode).toBe(201);
    })
});