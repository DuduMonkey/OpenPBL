Feature: Aba Problema - Tela de atividade
	Como Aluno
	Eu quero visualizar o problema descrito em uma atividade
	Para isso eu abro uma atividade através do painel de usuário

Scenario: Acesso ao problema de uma nova atividade sem problema salvo
		Given Eu acesso a atividade sem problema definido através do painel de usuário
		When a tela da atividade carrega
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe um "Texto informativo ou Imagem .svg, ainda não definido"

Scenario: Acesso ao problema de uma atividade com problema salvo
		Given Eu acesso a atividade com problema definido através do painel de usuário
		When a tela da atividade carrega
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe o campo "Descrição", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Material de apoio", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Links externos", com o texto salvo anteriormente
		And a tela exibe o botão "Continuar Atividade"

Scenario: Acesso ao problema da atividade a partir de outra aba (com problema salvo)
		Given Eu acesso a atividade com problema definido a partir de outra aba
		When a aba problema é carregada
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe o campo "Descrição", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Material de apoio", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Links externos", com o texto salvo anteriormente
		And a tela exibe o botão "Continuar Atividade"
