"use strict"

const axios = require('axios')
const { expect } = require('chai')
const { Pact, Matchers } = require("@pact-foundation/pact")

// const { getClients } = require("../../consumer-frontend/src/consumer")

const mockProvider = new Pact({
  port: 8082,
  logLevel: 'INFO',
  consumer: 'frontend',
  provider: 'clients-service'
});

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  before(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  after(() => mockProvider.finalize());

  describe("GET /clients", () => {

    const bodyResponse = {
      firstName: "Lisa",
      lastName: "Simpson",
      age: 8,
      id: 1
    }

    before(async () => {
      await mockProvider.addInteraction({
        state: 'eu tenho uma lista de clientes', // setup para executar a requisição
        uponReceiving: 'uma requisição de todos os clientes',
        withRequest: {
          method: 'GET',
          path: '/clients',
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.eachLike(bodyResponse)  // precisamos garantir a tipagem, não o conteúdo
        }
      })
    })

    it("retornando o body, header e statusCode corretos", async () => {
      const response = await axios.get('http://localhost:8082/clients') // a porta da requisição tem que ser a mesma porta definida no mockProvider

      expect(response.data).to.deep.equal([bodyResponse])
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
    })
  })
})
