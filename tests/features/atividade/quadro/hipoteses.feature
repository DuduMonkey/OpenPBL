Feature: Painel de atividade - hipóteses

Scenario: Aba de hipóteses para uma atividade com status inferior a "hipoteses"
		Given Atividade tem "status" != "abstracao" ou "resolucao" ou "pesquisa" ou "hipoteses"
		When Professor ou aluno clica na aba
		Then Tela não é modificada
		And Aba está desativada
		And Mensagem com o atual status da atividade é exibida

Scenario: Aba de hipóteses para uma atividade com status = "hipoteses" - visão do professor
		Given Atividade tem "status" = "hipoteses"
		When Professor clica na aba "hipoteses"
		Then Painel abre o campo "hipóteses" para adicionar "cards" com hipóteses
		And Usuário pode inserir uma hipótese preenchendo o campo "descricao" e clicando no botão "inserir hipótese"
		And Professor pode excluir cards postados
		And Botão "concluir etapa" é ativado
		And Painel de ajuda mostra o texto sobre hipóteses

Scenario: Aba de hipóteses para uma atividade com status superior a "hipoteses" - visão do professor
		Given Atividade tem "status" superior a "hipoteses"
		When Professor clica na aba "hipóteses"
		Then Painel exibe o campo "hipóteses" e abilita o botão "editar"
		And Botão "salvar" é ativado caso cards sejam adicionados ou excluídos

Scenario: Aba de hipóteses para uma atividade com status = "hipoteses" - visão do aluno
		Given Atividade tem "status" = "hipoteses"
		When Aluno clica na aba "hipoteses"
		Then Painel abre o campo "hipóteses" para adicionar "cards" com hipóteses
		And Usuário pode inserir uma hipótese preenchendo o campo "descricao" e clicando no botão "inserir hipótese"
		And Painel de ajuda mostra o texto sobre hipóteses

Scenario: Aba de hipóteses para uma atividade com status superior a "hipoteses" - visão do aluno
		Given Atividade tem "status" superior a "hipoteses"
		When Aluno clica na aba "hipóteses"
		Then Painel exibe o campo "hipóteses"
