Feature: Painel de atividade - resolução

Scenario: Aba de resolução para uma atividade com status inferior a "resolucao"
		Given Atividade tem "status" != "abstracao" ou "resolucao"
		When Professor ou aluno clica na aba
		Then Tela não é modificada
		And Aba está desativada
		And Mensagem com o atual status da atividade é exibida

Scenario: Aba de resolução para uma atividade com status = "resolucao" - visão do professor
		Given Atividade tem "status" = "resolucao"
		When Professor clica na aba "resolução"
		Then Painel abre o campo "resolução" para adicionar notas sobre a resolução adotada
		And Ao salvar, a aba resolução é abilitada aos alunos
		And Botão "resolver atividade" é ativado
		And Painel de ajuda mostra o texto sobre a resolução da atividade

Scenario: Aba de resolução para uma atividade com status superior a "resolucao" - visão do professor
		Given Atividade tem "status" superior a "resolucao"
		When Professor clica na aba "resolução"
		Then Painel exibe o campo "resolução" com notas sobre a resolução adotada e abilita o botão "editar"
		And Botão "salvar" é ativado caso resolução seja editada

Scenario: Aba de resolução para uma atividade com status = "resolucao" - visão do aluno
		Given Atividade tem "status" = "resolucao"
		When Aluno clica na aba "resolução"
		Then Painel mostra o campo "resolução" com notas sobre a resolução adotada
		And Painel de ajuda mostra o texto sobre a resolução da atividade

Scenario: Aba de resolução para uma atividade com status superior a "resolucao" - visão do aluno
		Given Atividade tem "status" superior a "resolucao"
		When Aluno clica na aba "resolução"
		Then Painel exibe o campo "resolução" com notas sobre a resolução adotada
