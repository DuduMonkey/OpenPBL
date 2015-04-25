Feature: Tela de Atividade
	Como professor
	Eu quero conduzir uma atividade
	Para isso eu abro uma atividade a partir do painel de usuário
	Ou sou redirecionado após criar uma nova atividade

Scenario: Acesso a tela de atividade após criar uma atividade 
		Given eu criei uma atividade nova a partir do painel de usuário
		When a tela da atividade carrega
		Then a tela de atividade mostra a nova atividade
		And a tela exibe um painel de ajuda na lateral esquerda com o texto "Texto de ajuda ainda não definido"
		And a tela exibe exibe links para outras páginas de ajuda do sistema abaixo do painel de ajuda
		And a tela exibe um cabeçalho com o nome da atividade, o número de participantes, um botão para convidar usuários, um botão permitindo exclusão e um botão permitindo voltar para o painel de usuário
		And a tela exibe uma barra de abas correspontes aos estados "Problema", "Fatos", "Hipóteses", "Pesquisa", "Resolução", "Abstração"
		And a aba "Problema" está habilitada e selecionada, as demais desabilitadas
		And o painel da aba problema exibe o campo "Descrição", com o texto de ajuda "Placeholder ainda não definido"
		And o painel da aba problema exibe o campo "Material de apoio", com o texto de ajuda "Placeholder ainda não definido"
		And o painel da aba problema exibe o campo "Links externos", com o texto de ajuda "Placeholder ainda não definido"
		And estes campos exibem ícones ao lado do título permitindo sua edição
		And a tela exibe o botão "Salvar Atividade" inibido

Scenario: Acesso a tela de uma atividade já criada e em andamento 
		Given eu acesso uma atividade a partir do painel de usuário
		When a tela da atividade carrega
		Then a tela da atividade exibe a atividade em andamento
		And a tela exibe um painel de ajuda na lateral esquerda com o texto "Texto de ajuda ainda não definido"
		And a tela exibe exibe links para outras páginas de ajuda do sistema abaixo do painel de ajuda
		And a tela exibe um cabeçalho com o nome da atividade, o número de participantes, um botão para convidar usuários, um botão permitindo exclusão e um botão permitindo voltar para o painel de usuário
		And a tela exibe uma barra de abas correspontes aos estados "Problema", "Fatos", "Hipóteses", "Pesquisa", "Resolução", "Abstração"
		And a aba do estado atual da atividade está selecionado, a tela só permite acesso para as abas anteriores ao estado atual, e as abas posteriores estão desabilitadas
