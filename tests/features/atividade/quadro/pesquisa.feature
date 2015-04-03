Feature: Painel de atividade - pesquisa

Scenario: Aba de pesquisa para uma atividade com status inferior a "pesquisa"
		Given Atividade tem "status" != "abstracao" ou "resolucao" ou "pesquisa"
		When Professor ou aluno clica na aba
		Then Tela não é modificada
		And Aba está desativada
		And Mensagem com o atual status da atividade é exibida

Scenario: Aba de pesquisa para uma atividade com status = "pesquisa" - visão do professor
		Given Atividade tem "status" = "pesquisa"
		When Professor clica na aba "pesquisa"
		Then Painel abre o campo "pesquisa" para adicionar conhecimentos deficientes
		And Ao salvar, a aba pesquisa é abilitada aos alunos
		And Botão "concluir etapa" é ativado
		And Painel de ajuda mostra o texto sobre conhecimentos deficientes e pesquisa

Scenario: Aba de pesquisa para uma atividade com status superior a "pesquisa" - visão do professor
		Given Atividade tem "status" superior a "pesquisa"
		When Professor clica na aba "pesquisa"
		Then Painel exibe o campo "pesquisa" e abilita o botão "editar"
		And Botão "salvar" é ativado caso pesquisa seja editada

Scenario: Aba de pesquisa para uma atividade com status = "pesquisa" - visão do aluno
		Given Atividade tem "status" = "pesquisa"
		When Aluno clica na aba "pesquisa"
		Then Painel exibe o campo "pesquisa" com conhecimentos deficientes a pesquisar
		And Painel de ajuda mostra o texto sobre conhecimentos deficientes e métodos de pesquisa

Scenario: Aba de pesquisa para uma atividade com status superior a "pesquisa" - visão do aluno
		Given Atividade tem "status" superior a "pesquisa"
		When Aluno clica na aba "pesquisa"
		Then Painel exibe o campo "pesquisa" com conhecimentos deficientes
