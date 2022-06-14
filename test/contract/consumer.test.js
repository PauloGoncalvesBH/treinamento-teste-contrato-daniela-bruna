"use strict"

const axios = require('axios')
const { expect } = require('chai')
const { Pact, Matchers } = require("@pact-foundation/pact")

// const { getClients } = require("../../consumer-frontend/src/consumer")

// (1) Cria o objeto do Pact para representar o provider
const mockProvider = new Pact({
  port: 8082,
  logLevel: 'INFO',
  consumer: 'frontend', // essa é a aplicação atual
  provider: 'clients-service' // é a aplicação que consumimos, validando integração entre frontend e clients-service
});

describe('API Pact test - Integration between \'clients-service\' and \'frontend\'', () => {
  before(() => mockProvider.setup()); // (2) Inicia o servidor do Mock
  afterEach(() => mockProvider.verify()); // (5) valida as interações que você registrou e como espera que ocorram.
  // Se a interação falhar irá retornar um erro detalhando o ocorrido.
  // Deve ser realizado uma vez para cada interação

  after(() => mockProvider.finalize()); // (6) Escreve o arquivo de pact (contrato) para o par consumer-provider,
  // e derruba o servidor de Mock.
  // Deve ser feito apenas uma vez por provedor que está testando 
  // e depois que todos os testes forem executados para esse par consumer-providerverifyProvider

  describe("GET /clients", () => {

    const bodyResponse = {
      firstName: "Lisa",
      lastName: "Simpson",
      age: 8,
      id: 1
    }

    before(async () => {
      await mockProvider.addInteraction({ // (3) Adiciona interações para o servidor do Mock
        state: 'eu tenho uma lista de clientes', // setup para executar a requisição
        uponReceiving: 'uma requisição de todos os clientes',
        withRequest: { // Qual request será 'mockada'
          method: 'GET',
          path: '/clients',
          headers: {
            Accept: "application/json, text/plain, */*",
          },
        },
        willRespondWith: { // O retorno que será enviado quando a request for feita
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: Matchers.eachLike(bodyResponse)  // precisamos garantir a tipagem, não o conteúdo
        }
      })
    })

    // (4) Executa requisição em cima do mock
    // Sem requisição em cima da interação o arquivo de pact não é gerado
    it("retornando o body, header e statusCode corretos", async () => {
      const response = await axios.get('http://localhost:8082/clients') // a porta da requisição tem que ser a mesma porta definida no mockProvider

      // Validamos toda a saída de acordo com o que definimos na interação para ter certeza que foi implementado corretamente
      expect(response.data).to.deep.equal([bodyResponse])
      expect(response.status).to.equal(200)
      expect(response.headers['content-type']).to.equal("application/json; charset=utf-8")
    })
  })
})
