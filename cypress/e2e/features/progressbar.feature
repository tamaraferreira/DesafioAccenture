Feature: Validação de Progress Bar

  Scenario: Manipular a progress bar
    Given que eu acesse a página Progress Bar
    When eu iniciar a progress bar
    And eu parar a progress bar antes de 25%
    Then o valor da progress bar deve ser menor ou igual a 25%
    When eu iniciar a progress bar novamente
    And aguardar a progress bar chegar a 100%
    Then eu devo resetar a progress bar
    And o valor da progress bar deve ser 0%