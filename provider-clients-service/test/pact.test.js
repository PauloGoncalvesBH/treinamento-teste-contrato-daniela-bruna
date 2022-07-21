const { Verifier } = require('@pact-foundation/pact')
const path = require("path")

const { server, importData, clientRepository } = require("../src/provider")

const currentGitHash = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()

const currentGitBranch = require('child_process')
  .execSync('git branch --show-current')
  .toString()
  .trim()

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
        pactBrokerToken: process.env.PACT_BROKER_TOKEN,
        pactBrokerUrl: 'https://paulogoncalves.pactflow.io',
        providerVersionTags: currentGitBranch,//branch atual
        providerVersion: currentGitHash,//hash do commit
        publishVerificationResult: process.env.CI === 'true',
        consumerVersionSelectors: [
          {
            tag: 'daniela',
            latest: true
          }
        ],
        //pactUrls: ['/app/pacts/frontend-clients-service.json'],
        beforeEach: () => {
          clientRepository.clear()
        },
        stateHandlers: { // Aonde definimos o setup de cada interação que será feito localmente
          'eu tenho uma lista de clientes': () => {
            importData()
          },
          "eu tenho um cliente específico": () => {
            clientRepository.add({
              firstName: 'Lisa',
              lastName: 'Simpson',
              age: 8,
              id: 1
            })
          }
        }
      })
      .verifyProvider() // (3) Execução do teste, verificando o resultado retornado com o definido no contrato.
      .then(output => { // (4) Exibição do resultado detalhado no terminal
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})
