const request = require('supertest');
const server = require('../server');



describe('GET /clients', () =>{
    it('should return status 200', async () =>{
        const res = await request(server).get('/clients');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('GET /clients/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/clients/67a411e73f4076a8ed85af71');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /clients/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/clients/67a4a5d763f69ae95069344c');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /clients/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/clients/67a558a3f8f9b44517b24245');
        expect([200, 404]).toContain(res.status);
    });
});

describe('GET /clients/:id', () =>{
    it('should return status 200 or 404 if not found', async () => {
        const res = await request(server).get('/clients/67a559c4f8f9b44517b24247');
        expect([200, 404]).toContain(res.status);
    });
});