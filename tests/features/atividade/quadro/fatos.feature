Feature: Painel de atividade - fatos

Scenario: Aba de fatos para uma atividade com status inferior a "fatos"
		Given Atividade tem "status" != "abstracao" ou "resolucao" ou "pesquisa" ou "hipoteses" ou "fatos"
		When Professor ou aluno clica na aba
		Then Tela não é modificada
		And Aba está desativada
		And Mensagem com o atual status da atividade é exibida

Scenario: Aba de fatos para uma atividade com status = "fatos" - visão do professor
		Given Atividade tem "status" = "fatos"
		When Professor clica na aba "fatos"
		Then Painel abre o campo "fatos" para adicionar "cards" com fatos
		And Usuário pode inserir um fato preenchendo o campo "descricao" e clicando no botão "inserir fato"
		And Professor pode excluir cards postados
		And Botão "concluir etapa" é ativado
		And Painel de ajuda mostra o texto sobre fatos

Scenario: Aba de fatos para uma atividade com status superior a "fatos" - visão do professor
		Given Atividade tem "status" superior a "fatos"
		When Professor clica na aba "fatos"
		Then Painel exibe o campo "fatos" e abilita o botão "editar"
		And Botão "salvar" é ativado caso cards sejam adicionados ou excluídos

Scenario: Aba de fatos para uma atividade com status = "fatos" - visão do aluno
		Given Atividade tem "status" = "fatos"
		When Aluno clica na aba "fatos"
		Then Painel abre o campo "fatos" para adicionar "cards" com fatos
		And Usuário pode inserir um fato preenchendo o campo "descricao" e clicando no botão "inserir fato"
		And Painel de ajuda mostra o texto sobre fatos

Scenario: Aba de fatos para uma atividade com status superior a "fatos" - visão do aluno
		Given Atividade tem "status" superior a "fatos"
		When Aluno clica na aba "fatos"
		Then Painel exibe o campo "fatos"
