Feature: Painel de atividade - problema

Scenario: Atividade nova criada - visão do professor
		Given Professor cria nova atividade clicando no botão "criar atividade", e esta é aberta à edição
		When Professor insere a descrição do problema no campo "problema"
		Then Campo "material de apoio" é aberto a edição
		And Campo "links externos" é aberto a edição
		And Botão "salvar e convidar alunos" é abilitado

Scenario: Atividade em andamento - visão do professor
		Given Atividade já foi criada e "status" != "problema"
		When Professor clica na aba "problema"
		Then Painel exibe os campos "problema", "material de apoio" e "links externos", e abilita o botão "editar"
		And Botão "salvar" é ativado caso os campos sejam modificados

Scenario: Atividade em andamento - visão do aluno
		Given Atividade já foi criada e "status" != "problema"
		When Aluno clica na aba "problema"
		Then Painel exibe os campos "problema", "material de apoio" e "links externos"
