const MemberController =require('../../controllers/member.controller');

describe('MemberContoller.getAllMembers',()=>{
    it('should have a getAllMembers function',()=>{
        expect(typeof MemberController.getAllMembers).toBe('function');
    })
})