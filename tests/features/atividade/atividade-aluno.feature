Feature: Tela de Atividade
	Como Aluno
	Eu quero participar de uma atividade
	Para isso eu abro uma atividade a partir do painel de usuário

Scenario: Acesso a tela de uma atividade já criada e em andamento 
		Given eu acesso uma atividade a partir do painel de usuário
		When a tela da atividade carrega
		Then a tela da atividade exibe a atividade em andamento
		And a tela exibe um painel de ajuda na lateral esquerda com o texto "Texto de ajuda ainda não definido"
		And a tela exibe exibe links para outras páginas de ajuda do sistema abaixo do painel de ajuda
		And a tela exibe um cabeçalho com o nome da atividade, o número de participantes e um botão permitindo voltar para o painel de usuário
		And a tela exibe uma barra de abas correspontes aos estados "Problema", "Fatos", "Hipóteses", "Pesquisa", "Resolução", "Abstração"
		And a aba do estado atual da atividade está selecionado, a tela só permite acesso para as abas anteriores ao estado atual, e as abas posteriores estão desabilitadas
