const request = require('supertest');
const server = require('../server');



describe('GET /restaurants', () =>{
    it('should return status 200', async () =>{
        const res = await request(server).get('/restaurants');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('GET /restaurants/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/restaurants/67a039e8ff3be0e09fe540bc');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /restaurants/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/restaurants/67a540674e38a68ce592c25a');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /restaurants/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/restaurants/67af86477d3e194db566577e');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /restaurants/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/restaurants/67af866f7d3e194db566577f');
        expect([200, 404]).toContain(res.status);
    });
});