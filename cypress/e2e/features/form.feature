Feature: Validação de formulário

  Scenario: Preencher e enviar o formulário com sucesso
    Given que eu acesse a página do formulário
    When eu preencher todos os campos com valores aleatórios
    And eu fizer o upload de um arquivo
    And eu clicar em "Submit"
    Then o pop-up de confirmação deve ser exibido
    And eu devo fechar o pop-up com sucesso