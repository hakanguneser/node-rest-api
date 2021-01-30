const request = require('supertest');
const app = require("../../app");
const newMember = require('../mock-data/new-member.json');
const newMemberWithMissingProperty = require('../mock-data/new-member-with-missing-property.json');
const updatedMember = require('../mock-data/member-updated.json');
const endpointUrl = '/members/';
let memberId;
const nonExistMemberId = '6015f77384113e49d0a448cd';

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newMember);
        expect(response.statusCode).toBe(201);
        expect(response.body.firstName).toBe(newMember.firstName);
        expect(response.body.lastName).toBe(newMember.lastName);
        memberId = response.body._id;
    });
    it("POST " + endpointUrl + " should return error 500 on malformed data", async () => {
        const response = await request(app).post(endpointUrl).send(newMemberWithMissingProperty);
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            message: "Member validation failed: email: Path `email` is required."
          });
    });
    it("GET "+endpointUrl,async()=>{
        const response = await request(app).get(endpointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].firstName).toBeDefined();
        expect(response.body[0].email).toBeDefined();
    });
    it("GET byMemberId "+endpointUrl+"/:memberId",async()=>{
        const response = await request(app).get(endpointUrl+memberId);
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe(newMember.firstName);
        expect(response.body.lastName).toBe(newMember.lastName);
    });
    it("GET byMemberId doesn't exists "+ endpointUrl +":/memberId",async()=>{
        const response = await request(app).get(endpointUrl+nonExistMemberId);
        expect(response.status).toBe(404);
    });
    it("PUT "+endpointUrl+":/memberId",async()=>{
        const response = await request(app).put(endpointUrl+memberId).send(updatedMember);
        expect(response.statusCode).toBe(200);
        expect(response.body.firstName).toStrictEqual(updatedMember.firstName);
    });
    it("PUT byMemberId doesn't exists "+ endpointUrl+":/memberId",async()=>{
        const response = await request(app).put(endpointUrl+nonExistMemberId).send(updatedMember);
        expect(response.statusCode).toBe(404);
    });
    it("DELETE "+endpointUrl+":/memberId",async()=>{
        const response = await request(app).delete(endpointUrl+memberId);
        expect(response.statusCode).toBe(200);
        expect(response.body.firstName).toStrictEqual(updatedMember.firstName);
        expect(response.body.email).toStrictEqual(updatedMember.email);
    });
    it("DELETE byMemberId doesn't exists "+endpointUrl+":/memberId",async()=>{
        const response = await request(app).delete(endpointUrl+nonExistMemberId);
        expect(response.statusCode).toBe(404);
    });
});