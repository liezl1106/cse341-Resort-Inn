const request = require('supertest');
const server = require('../server');



describe('GET /reservations', () =>{
    it('should return status 200', async () =>{
        const res = await request(server).get('/reservations');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('GET /reservations/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/reservations/67a039daff3be0e09fe540ba');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /reservations/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/reservations/67a4330d9fd8cc505f33209e');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /reservations/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/reservations/67a434f09fd8cc505f33209f');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /reservations/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/reservations/67a765601821efd5918c1bef');
        expect([200, 404]).toContain(res.status);
    });
});