Feature: API de Loja de Livros

  Scenario: Criar um novo usuário
    Given que eu tenha os dados de um novo usuário
    When eu criar esse usuário
    Then o usuário deve ser criado com sucesso

  Scenario: Gerar um token de acesso
    Given que eu tenha um usuário válido
    When eu gerar um token para esse usuário
    Then um token deve ser retornado com sucesso

  Scenario: Confirmar autorização do usuário
    Given que eu tenha um usuário válido e autenticado
    When eu verificar a autorização do usuário
    Then o usuário deve estar autorizado

  Scenario: Listar todos os livros disponíveis
    Given que eu acesse o endpoint de livros
    When eu enviar a requisição para listar os livros
    Then a resposta deve conter a lista de livros disponíveis
    And o status code deve ser 200

  Scenario: Alugar dois livros de livre escolha
    Given que eu tenha um usuário válido e autenticado
    And que eu tenha a lista de livros disponíveis
    When eu escolher dois livros da lista
    And eu enviar a requisição para adicioná-los à minha coleção
    Then os livros devem ser adicionados com sucesso
    And o status code deve ser 201

Scenario: Listar os detalhes do usuário com os livros escolhidos
  Given que eu tenha um usuário válido e autenticado
  When eu enviar a requisição para obter os detalhes do usuário
  Then a resposta deve conter os dados do usuário
  And a lista de livros escolhidos deve estar presente
  And o status code deve ser 200