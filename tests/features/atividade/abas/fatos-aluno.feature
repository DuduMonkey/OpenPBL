Feature: Aba Fatos - Tela de atividade
	Como Aluno
	Eu quero criar ou visualizar fatos de atividades
	Para isso eu abro uma atividade através do painel de usuário

Scenario: Criação de fatos em atividade sem problema definido
		Given Eu acesso a atividade sem problema definido através do painel de usuário
		When a tela da atividade carrega
		Then A aba "Problema" vem selecionada, a aba "Fatos" assim como as demais estão desabilitadas

Scenario: Acesso a aba fatos sem fatos criados
		Given eu acesso a atividade após ter definido o problema
		When a tela de atividade carrega
		Then a aba "Fatos" vem selecionada, as abas posteriores estão desabilitadas
		And o painel da aba exibe "Imagem ou texto explicativo ainda não definido"
		And o botão "Adicionar Fato" está habilitado
		And o botão "Continuar Atividade" desabilitado

Scenario: Acesso a aba fatos com fatos criados
		Given eu acesso a atividade após ter definido o problema
		When a tela de atividade carrega
		Then a aba "Fatos" vem selecionada, as abas posteriores estão desabilitadas
		And o painel da aba exibe os fatos já inseridos
		And o botão "Adicionar Fato" está habilitado
		And o botão "Continuar Atividade" habilitado

Scenario: Acesso a aba fatos em uma atividade com estado posterior a fatos
		Given o estado é posterior a fatos
		When eu clico na aba fatos
		Then a aba "Fatos" é carregada
		And o painel da aba exibe os fatos já inseridos
		And o botão "Adicionar Fato" está desabilitado
		And o botão "Continuar Atividade" habilitado

Scenario: Criação de fatos em atividade
		Given eu acesso a atividade após ter definido o problema
		When a tela de atividade carrega
		Then a aba "Fatos" vem selecionada, as abas posteriores estão desabilitadas
		And o painel fatos exibe o botão "Adicionar Fatos" habilitado
		And quando eu clico no botão "Adicionar Fatos" a tela exibe uma modal
		And a modal um campo de texto com o texto de ajuda "Ainda não definido" para o preenchimento do fato
		And a modal exibe os botões "Cancelar" e "Salvar"
		And o botão "Salvar" só é habilitado após o preenchimento do campo texto
		And quando eu insiro o fato, ele é salvo na atividade e a tela exibe o novo fato criado no painel "Fatos"
		And o botão "Continuar Atividade" é habilitado 
