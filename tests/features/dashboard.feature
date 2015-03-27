Feature: Painel de usuário
	
	Scenario: Painel de usuários para um professor recem cadastrados
		Given o professor acessa o painel sem salas cadastradas
		When a o painel de usuário abre
		Then a api retona "task" = 0
		And a tela exibe a dica sobre a tela de detalhes da atividade
		And a tela exibe a dica sobre a criação de salas

	Scenario: Painel de usuário para um professor com atividades cadastradas
		Given o professor acessa o painel com salas cadastradas
		When o painel de usuário abre
		Then a api retorna a lista de "task" do "teacher" com "permission" = "teacher"
		And a api retorna os detalhes de uma "task"
		And os detalhes tem a "story" da atividade
		And os detalhes tem o "status" da atividade
		And os detalhes tem a lista de "student" com os "facts", exibindo o numero de fatos por aluno
		And a lista atividades exibe o icone de configurações baseado na "permission"

	Scenario: Paniel de usuário para um aluno com atividades cadastradas
		Given o aluno acessa o painel com salas cadastradas
		When o painel de usuário abre
		Then a api retorna a lista de "task" do "student" com "permission" = "student"
		And a api retorna os detalhes de uma "task"
		And os detalhes tem a "story" da atividade
		And os detalhes tem o "status" da atividade
		And os detalhes tem a lista de "student" com os "facts", exibindo o numero de fatos por aluno 
		And a lista de atividades exibe o icone de configurações baseado na "permission"
