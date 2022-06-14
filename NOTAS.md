
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
- 

## 14/06

- implementar teste do consumer da rota GET /clients/id
- publicar o contrato no pact-broker
    - criar conta no pactflow
- teste do provider baixa o contrato do pact-broker

## Para o dia 15/06

- Docker instalado e configurado. Ler: https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos
- Conta no Pactflow criada: https://pactflow.io/
