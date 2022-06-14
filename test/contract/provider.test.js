const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, importData } = require("../../provider-clients-service/src/provider")

describe("Clients Service Verification", () => {
  before(() => {
    server.listen(3030, () =>{
      console.log('Servidor rodando na porta 3030');
    })
  })

  it("validates the expectations of Client Service", () => {
    return new Verifier({
        provider: 'clients-service',
        logLevel: 'INFO',
        verbose: false,
        providerBaseUrl: 'http://localhost:3030',
        pactUrls: ['/home/paulo/git/pact-daniela-bruna/pacts/frontend-clients-service.json'],
        stateHandlers: {
          'eu tenho uma lista de clientes': () => {
            importData()
          }
        }
      })
      .verifyProvider()
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
