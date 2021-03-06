const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, importData, clientRepository } = require("../../provider-clients-service/src/provider")

describe("Clients Service Verification", () => {
  before(() => { // (1) Inicia o servidor do provider localmente
    server.listen(3030, () =>{
      console.log('Servidor rodando na porta 3030');
    })
  })

  it("validates the expectations of Client Service", () => {
    return new Verifier({ // (2) Configuração do endereço do provider, localização do contrato, setup, etc. Tudo necessário para execcutar o teste
        provider: 'clients-service',
        logLevel: 'INFO',
        verbose: false,
        providerBaseUrl: 'http://localhost:3030',
        pactUrls: ['/home/paulo/git/pact-daniela-bruna/pacts/frontend-clients-service.json'],
        beforeEach: () => { // executa antes de cada stateHandler, utilizado para limpar os mocks, stubs, a base de dados
          clientRepository.clear()
        },
        stateHandlers: { // Aonde definimos o setup de cada interação que será feito localmente
          'eu tenho uma lista de clientes': () => {
            importData()
          }
        }
      })
      .verifyProvider() // (3) Execução do teste, verificando o resultado retornado com o definido no contrato.
      .then(output => { // (4) Exibição do resultado detalhado no terminal
        console.log('\nPact Verification Complete!\n')
        console.log(output)
      })
  })
})
