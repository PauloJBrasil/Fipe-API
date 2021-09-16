# Fipe-API

### Api Desenvolvida em Node com Typescript, Express e MongoDB

Existem varios endpoints que estão localizados na pasta "/src/routes" onde cada arquivo possui a rota do endpoint e o que fará.

Em primeiro momento o backend serve para que o usuário possa buscar os dados dos veículos através da API FIPE disponibilizada, também é possível usuário ser autenticado.

A API em questão busca solucionar casos em que se torna necessário a busca dos dados de vários veículos, como valor, tipo de combustível, marcas, modelo, data de fabricação, logo a API faz chamadas para os endpoint da API FIPE e salva no banco de dados MongoDB os códigos relacionados ao mês atual em que o usuário está, e o veículo que o usuário marcar como favorito.

Endpoints:
  - Method GET:
    - '/' -> Verifica se há código de referência do mês atual no banco de dados se estiver retorna mensagem informando que o código existe no banco, se não faz uma requisição POST para a API FIPE e grava no banco e retorna mensagem informando que o código foi inserido no banco;
    
    - '/refer' -> Busca no banco de dados o código de referência do mês;

    - '/brands' -> Realiza uma requisição POST na API FIPE e retorna com as marcas e os dados de valor das marcas para serem usados no front-end, como:
    {
        "Marca": "AGRALE",
        "Value": "102"
    };
    
    - '/vehicles' -> Realiza uma requisição POST na API FIPE e retorna com os modelos e os dados de valor dos modelos para serem usados no front-end, como: 
    {
        "Modelo": "Accord Coupe EX",
        "Value": 1241
    };
    
    - '/vehicle' -> Realiza uma requisição POST na API FIPE e retorna com o tipo de gasolina e o ano do veículo para serem usados no front-end, como:
      [
        {
            "Label": "2001 Gasolina",
            "Ano": "2001-1"
        }
    ];
  
    - '/vehicle/:code' -> Realiza uma requisição POST na API FIPE e retorna com os dados detalhados do veículo, como:
      {
        "Valor": "R$ 19.256,00",
        "Combustivel": "Gasolina",
        "Marca": "Honda",
        "Modelo": "Civic Sedan LXB 1.7 16V 115cv",
        "AnoModelo": 2001,
        "TipoVeiculo": 1,
        "SiglaCombustivel": "G"
    };
    
    - '/user' -> Loga o usuário e retorna o TOKEN de validação para acesso às funções;
    - '/user/validate' -> Valida o TOKEN do usuário;
    - '/bookmarks' -> Retorna os veículos com todos os dados informados salvos como favoritos;
  - Method POST:
    - '/user' -> Realiza a criação de um novo usuário
    - '/bookmarks' -> Realiza a gravação dos dados do veículo favoritado no banco de dados MongoDB.
  - Method DELETE:
    - '/bookmarks' -> Realiza a remoção dos dados do veículo salvo como favorito no banco de dados MongoDB.
