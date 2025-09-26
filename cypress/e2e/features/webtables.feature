Feature: Validação de Web Tables

  Scenario: Criar, editar e deletar um registro
    Given que eu acesse a página Web Tables
    When eu criar um novo registro com dados aleatórios
    Then o registro criado deve aparecer na tabela
    When eu editar o registro criado
    Then o campo editado deve ser atualizado
    When eu deletar o registro criado
    Then o registro não deve mais existir na tabela