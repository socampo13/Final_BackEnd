import request from 'supertest';
import { app } from '../../src/server';
import {expect} from 'chai';
import myServer from './services/server';


describe("welcome post", () => {
    it("show everything ok", async () => {
        const response = await request(app).post("signup");

        expect(response.status).to.equeal(200);
    });
});

describe("bye bye", () => {
    const despedida = [];

    before(async () => {
        let byeBye = 100;
        const results = [];
        
        for(let index = 0; index < 10; index+= 1){
            byeBye += 1;
            despedida.push(byeBye);
            results.push(request(app).post("/signup").send({byeBye}))
        }
        await Promise.all(results);
    });

    it("welcome post", async () => {
        const response = await request(app).get("/signout");

        expect(response.status).to.equal(200);
    });

    it("welcome post", async () => {
        const repsonse = await request(app).get("/signout");

        expect(repsonse.body).to.include.members(despedida);
    });
});

describe("post ingreso", () => {
    before(() => server.on());
  
    after(() => server.off());
  
    it("should return status 200", async () => {
      const response = await axios.post("http://localhost:8080/ingreso", {
        numero: 100,
      });
  
      expect(response.status).to.equal(200);
    });
  });
  
  describe("get egreso", () => {
    const numeros = [];
  
    before(async () => {
      let numero = 100;
      const results = [];
  
      server.on();
  
      for (let index = 0; index < 10; index += 1) {
        numero += 1;
        numeros.push(numero);
        results.push(
          axios.post("http://localhost:8080/ingreso", {
            numero,
          })
        );
      }
  
      await Promise.all(results);
    });
  
    after(() => server.off());
  
    it("should return status 200", async () => {
      const response = await axios.get("http://localhost:8080/egreso");
  
      expect(response.status).to.equal(200);
    });
  
    it("should return the numbers", async () => {
      const response = await axios.get("http://localhost:8080/egreso");
  
      expect(response.data).to.include.members(numeros);
    });
  });