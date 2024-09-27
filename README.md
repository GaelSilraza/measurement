# Measurement

## Preparação de ambiente

Obs: os arquivos `.env` não foram omitidos de modo a facilitar o ambiente de teste. 
Porém, em um cenário comum eles seriam omitidos.

A case de uso de produção exige que o desenvolvedor tenha docker e docker compose instalados em sua máquina.

O front-end atualmente não possui um processo de CI/CD.
Portanto, ele está sendo montado em um volume de um container docker e está sendo compartilhado com o 
volume do nginx para sua distribuição na porta 80, embora usualmente seja implementado um processo de CI/CD 
com o github actions de modo a prover os arquivos do build final para um servidor de borda ou storage.

Em `back-end/public` temos um arquivo chamado `measurement.csv` que é a representação de alguns dados iniciais 
que podem ser inseridos utilizando o endpoint de upload de arquivos `.csv`.

Obs: O equipmentId é uma entidade real no projeto, então para inserir os dados é necessário que o equipamento já esteja cadastrado.
Levando isso em consideração, já foi cadastrado previamente utilizando uma seed os ids dos equipments de range de `EQ-12491` até 
`EQ-12499`.

O arquivo para utilizar os endpoints diretamente com o INSOMNIA está disponibilazdo em `back-end/public` sob o nome de 
`insomnia.json`.

Obs: Atualmente consideramos o caso de uso de teste do ambiente de produção com um banco de dados postgres instanciado 
no container. Porém, caso seja interessante, podemos apontar diretamente para um banco de dados invés de utilizar uma instancia
dockerizada.

### Producação

1. Acesse a pasta docker do projeto
2. Utilize `docker compose up --build` para rodar a aplicação e observar os logs ou apenas 
`docker compose up --build -d` para iniciar 
a aplicação.
3. Aguarde alguns momentos, pois o front-end pode levar alguns segundos até ser disponibilizado


### Desenvolvimento

1. Backend
    1. Acesse a pasta back-end
    2. npm i
    3. Crie um banco de dados com o nome informado na variável de ambiente `DB_NAME`
    4. npm run typeorm migration:run
    5. npm run dev
2. Frontend
    1. Acesse a pasta back-end
    2. npm i
    3. npm run dev

### Teste de carga

Os resultados do teste de carga estão na pasta `load-test` no arquivo `report.html`. Porém, caso tenha interesse em 
reproduzir por conta própria, siga as etapas abaixo para preparar o ambiente, mas leve em consideração que esse teste 
de carga não está dockerizado como as demais aplicações.

Portanto, você deve possuir o `node` instalado diretamente em seu sistema.

1. Acesse a pasta `load-test`
2. Execute `npm i`
3. Execute `npm run start:export`
4. Uma vez que finalizado, abra o arquivo `report.html` diretamente no navegador de sua preferência

Leve em consideração que estavamos utilizando http em sua versão 1.1 invés do http2 ou http3 e que atualmente não estamos 
utilizando clusters kubernets ou até mesmo o recurso de cluster do node na aplicação.


## Documentação

Documentação dos endpoints está disponível em `http://localhost:3000/docs`.