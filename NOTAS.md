
# Notas de treinamento

- Garante a visibilidade dos times sobre as integrações.
- Valida de forma assíncrona e com rápido feedack se determinado código pode ser enviado para algum ambiente (_prod, staging, release, etc_)

## Links

- [Pact Nirvana](https://docs.pact.io/pact_nirvana)
- [Abordagem de testes - Samy](https://medium.com/assertqualityassurance/abordagem-de-testes-212b6238f0c3)
- [Doc Pact](https://docs.pact.io/)
- [Lib NPM @pact-foundation/pact](https://npmjs.com/package/@pact-foundation/pact)
- [Matching Pact](https://www.npmjs.com/package/@pact-foundation/pact#matching)
- [Conceitos teste de contrato](https://github.com/PauloGoncalvesBH/nirvana-teste-de-contrato/)
- [Doc pact docker](https://docs.pact.io/docker)
- [Documentação da imagem docker para publicar pact no pact broker](https://hub.docker.com/r/pactfoundation/pact-cli)

## Execução:

> Para rodar teste do provider substitua a palavra `consumer` por `provider'.

Para rodar via NPM, instale as dependências com `npm ci` e execute:
```sh
npm run test:contract:consumer
```

Via docker no windows:
```sh
docker compose run --rm consumer-test-contract
```

Via docker no ubuntu:
```sh
docker compose run --rm consumer-test-contract
```
ou

```sh
make consumer-test-contract
```

# Fazer
- Criar esqueleto com documentação de cada comando, dependências

## Dúvidas
1. Quando vc disse que se fizermos uma mudança na api, os testes integrados irão quebrar.. é só ir lá e arrumarmos e fazer o deploy em prod. Porém, nos testes de contrato, também não é só ir lá e arrumar o contrato nos testes e seguir? Pq de qualquer forma, nós alteramos os testes e não qualquer api que consome.]
1. Ainda não ficou claro para nós o valor do teste de contrato.
1. Quando tem alguma alteração na api, não existe a retrocompatibilidade para que não quebre quem consome?
1. Como fazer no dia a dia o pessoal responsável por um consumer fazer o teste de contrato?

## 14/06

- implementar teste do consumer da rota GET /clients/id
- publicar o contrato no pact-broker
    - criar conta no pactflow
- teste do provider baixa o contrato do pact-broker

## Para o dia 15/06

- Docker instalado e configurado. Ler: https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos
- Conta no Pactflow criada: https://pactflow.io/
 
 ## Para mim

- Pensar em cenários e perguntar se nesses vale ou n ter teste de contrato.
    - pelo menos 1 cenário que é viável ter o teste e 1 que não é viável
- Bruna e Dani trazerem a visão geral dos projetos
- 

