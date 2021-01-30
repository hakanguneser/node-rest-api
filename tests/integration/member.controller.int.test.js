const request = require('supertest');
const app = require("../../app");
const newMember = require('../mock-data/new-member.json');
const newMemberWithMissingProperty = require('../mock-data/new-member-with-missing-property.json');
const endpointUrl = '/members/';

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
        const response = await request(app).post(endpointUrl).send(newMember);
        expect(response.statusCode).toBe(201);
        expect(response.body.firstName).toBe(newMember.firstName);
        expect(response.body.lastName).toBe(newMember.lastName);
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
});