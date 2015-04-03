Feature: Painel de atividade - abstração

Scenario: Aba de abstração para uma atividade com status inferior a "abstracao"
		Given Atividade tem "status" != "abstracao"
		When Professor ou aluno clica na aba
		Then Tela não é modificada
		And Aba está desativada
		And Mensagem com o atual status da atividade é exibida

Scenario: Aba de abstração para uma atividade com status = "abstracao" - visão do professor
		Given Atividade tem "status" = "abstracao"
		When Professor clica na aba "abstração"
		Then Painel exibe informações e métricas sobre a atividade, além do campo "revisão" para adicionar notas de encerramento
		And Botão "encerrar atividade" é ativado
		And Painel de ajuda mostra o texto sobre a conclusão da atividade

Scenario: Aba de abstração para uma atividade com status = "abstracao" - visão do aluno
		Given Atividade tem "status" = "abstracao"
		When Aluno clica na aba "abstração"
		Then Painel exibe informações e métricas sobre a atividade
		And Painel de ajuda mostra o texto sobre a conclusão da atividade
