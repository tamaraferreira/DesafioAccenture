Feature: Validação de Ordenação

  Scenario: Embaralhar e ordenar a lista
    Given que eu acesse a página Sortable
    When eu embaralho a lista de elementos
    And eu ordeno os elementos em ordem crescente usando drag-and-drop
    Then os elementos devem estar em ordem crescente