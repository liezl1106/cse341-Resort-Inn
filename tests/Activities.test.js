const request = require('supertest');
const server = require('../server');



describe('GET /activities', () =>{
    it('should return status 200', async () =>{
        const res = await request(server).get('/activities');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('GET /activities/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/activities/67a41d519f77038705f3a804');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /activities/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/activities/67a41d5c9f77038705f3a808');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /activities/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/activities/67a68adb337816c6d77e49ae');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /activities/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/activities/67ab38451782050056ddd495');
        expect([200, 404]).toContain(res.status);
    });
});