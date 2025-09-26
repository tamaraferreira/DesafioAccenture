Feature: Validação de Janela do Navegador

  Scenario: Abrir nova janela e validar mensagem
    Given que eu acesse a página Browser Windows
    When eu clico no botão "New Window"
    Then uma nova janela deve ser aberta
    And a mensagem "This is a sample page" deve ser exibida
    And eu fecho a janela com sucesso