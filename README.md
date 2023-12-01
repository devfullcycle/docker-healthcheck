# Projeto Docker com healthcheck

Projeto criado com a finalidade de demonstrar o uso da opção `healthcheck` nativa do `Docker`, utilizei uma aplicação `TypeScript` com `MySQL` como banco de dados.

# Motivação

Quando trabalhamos com multiplos `containers`, muitas vezes há uma depêndencia entre eles, um determinado `container y` precisa iniciar quando outro `container x` estiver saudável".

## `healthcheck`

O `healthcheck` é uma opção nativa do `Docker` e foi introduzida na versão 2.1 do `Compose file`, com está configuração podemos verificar a "integridade" de determinado `container`.

Quando realizamos a verificação de integridade do `container`, ele recebe um `status` inicial de `starting`. Quando esta verificação de integridade é aprovada, ele se torna `healthy` (independente do estado anterior). Após tentar uma determinada quantidade de tentativas falhas, ele torna-se `unhealthy`.

Antes do lançamento do `healthcheck`, normalmente trabalhavamos com [dockerize](https://github.com/jwilder/dockerize) ou [wait-for](https://github.com/eficode/wait-for), para gerenciar esta depêndencia entre os containers.

## Exemplo

Neste exemplo, o `healthcheck` é incluido no `service` do `MySQL`. Ele então fará um comando para testar a integridade do `container - MySQL`, com um intervalo entre as tentativas de 5 segundos, durante 10 segundos, por 3 vezes.

Quando ele conseguir verificar a integridade do `container`, o `status` passará a ser `healthy`.

`container MySQL`

```
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p$$MYSQL_ROOT_PASSWORD"]
    interval: 5s
    timeout: 10s
    retries: 3
```

O `container node` possui uma dependencia com o `container MySQL` na condição de `service_healthy` que é o momento em que o `container MySQL` recebe o `status healthy`, neste momento ele conseguirá se conectar e a aplicação deve inicializar sem problemas. 

`container Node.js`

```
  depends_on:
    database:
      condition: service_healthy
```

# Instalação

```
# Clone o repositório:
git clone https://github.com/LucianTavares/docker-healthcheck.git

# Acesse a pasta do projeto:
cd docker-with-healthcheck

# Rode o arquivo docker-compose.yaml:
docker compose up

# Acesse a aplicação pelo navegador na porta 8080:
localhost:8080
```

Ao executar o projeto com o comando `docker compose up` repare no log do terminal a ordem em que os services do docker-compose iniciam.


## Contribuindo para o projeto

Este projeto é `open source` e está aberto a contribuições de todos. Se você tiver alguma sugestão, correção ou melhoria, sinta-se à vontade para contribuir.

Para contribuir, siga estas etapas:

```
Faça um fork do projeto no GitHub.
Crie uma nova branch para sua alteração.
Faça suas alterações e execute os testes.
Envie um pull request para a branch principal do projeto.
Ao enviar um pull request, certifique-se de incluir uma descrição clara de suas alterações. Você também pode incluir testes para garantir que suas alterações não causem problemas.
```

Aqui estão algumas dicas para contribuir com o projeto:

```
Leia o código existente para entender como o projeto funciona.
Use um editor de código que suporte linters e ferramentas de formatação.
Faça pequenos commits com alterações bem definidas.
Teste suas alterações com cuidado.
Obrigado por contribuir com o projeto!
```

Exemplos de contribuições

Aqui estão alguns exemplos de contribuições que você pode fazer:

```
Corrigir erros de ortografia ou gramaticais no README.md.
Adicionar ou melhorar a documentação.
Adicionar ou melhorar os testes.
Implementar novas funcionalidades.
Melhorar o desempenho ou a eficiência do código.
```

Não importa o tamanho ou a complexidade da sua contribuição, ela será apreciada.