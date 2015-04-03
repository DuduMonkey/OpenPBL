Feature: Painel de atividade

Scenario: Aluno abre atividade
		Given Aluno foi adicionado como participante em uma atividade, e esta é selecionada na lista de atividades no painel de usuário
		When Aluno clica em "abrir atividade"
		Then Painel de atividade mostra a atividade em seu estado atual
		And Painel de ajuda carrega o texto correspondente ao status da atividade (ponto de vista do aluno)

Scenario: Professor abre atividade
		Given Atividade é selecionada na lista de atividades no painel de usuário
		When Professor clica em "abrir atividade"
		Then Painel de atividade mostra a atividade em seu estado atual
		And Painel de ajuda carrega o texto correspondente ao status da atividade (ponto de vista do professor)

Scenario: Professor cria atividade nova
		Given Professor efetuou login e está no painel de usuário
		When Professor clica no botão "criar atividade"
		Then Atividade nova é criada, com "status" = "problema"
		And Painel da atividade é aberto a edição, aba "problema" é exibida
		And Demais abas são desabilitadas
		And Painel de ajuda à esquerda da tela mostra instruções para a elaboração do problema
		And Botão "salvar e convidar alunos" é abilitado logo que o professor adiciona dados
