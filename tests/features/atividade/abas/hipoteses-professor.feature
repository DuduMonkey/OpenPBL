Feature: Aba Hipoteses - Tela de atividade
	Como Professor
	Eu quero criar ou excluir ou visualizar hipoteses de atividades
	Para isso eu abro uma atividade através do painel de usuário


Scenario: Criação de hipoteses em atividade sem fatos criados
		Given Eu acesso a atividade sem fato definido através do painel de usuário
		When a tela da atividade carrega
		Then A aba "Hipoteses" vem selecionada, a aba "Hipoteses" assim como as demais estão desabilitadas

Scenario: Acesso a aba hipoteses sem hipoteses criadas
		Given eu acesso a atividade após ter definido os fatos
		When a tela de atividade carrega
		Then a aba "Hipoteses" vem selecionada, as abas posteriores estão desabilitadas
		And o painel da aba exibe "Imagem ou texto explicativo ainda não definido"
		And o botão "Adicionar Hipotese" está habilitado
		And o botão "Continuar Atividade" desabilitado

Scenario: Acesso a aba hipoteses com hipoteses criados
		Given eu acesso a atividade após ter definido fatos
		When a tela de atividade carrega
		Then a aba "Hipoteses" vem selecionada, as abas posteriores estão desabilitadas
		And o painel da aba exibe os hipoteses já inseridos
		And os hipoteses inseridos exibem o ícone de exclusão
		And o botão "Adicionar Hipotese" está habilitado
		And o botão "Continuar Atividade" habilitado

Scenario: Acesso a aba hipoteses em uma atividade com estado posterior a hipoteses
		Given o estado é posterior a hipoteses
		When eu clico na aba hipoteses
		Then a aba "Hipoteses" é carregada
		And o painel da aba exibe as hipoteses já inseridas
		And as hipoteses inseridas exibem o ícone de exclusão
		And o botão "Adicionar Hipotese" está desabilitado
		And o botão "Continuar Atividade" habilitado

Scenario: Criação de hipoteses em atividade
		Given eu acesso a atividade após ter definido o fato
		When a tela de atividade carrega
		Then a aba "Hipoteses" vem selecionada, as abas posteriores estão desabilitadas
		And o painel hipoteses exibe o botão "Adicionar Hipoteses" habilitado
		And quando eu clico no botão "Adicionar Hipoteses" a tela exibe uma modal
		And a modal um campo de texto com o texto de ajuda "Ainda não definido" para o preenchimento da hipotese
		And a modal exibe os botões "Cancelar" e "Salvar"
		And o botão "Salvar" só é habilitado após o preenchimento do campo texto
		And quando eu insiro a hipotese, ele é salvo na atividade e a tela exibe a nova hipotese criado no painel "Hipoteses"
		And o botão "Continuar Atividade" é habilitado 

Scenario: Exclusão de hipoteses em atividade
		Given eu acesso a aba hipoteses de uma atividade em estado posterior ou igual a hipoteses
		When eu clico no ícone de exclusão da hipotese
		Then a tela exibe a mensagem de confirmação "Texto ainda não definido" com os botões "Confirmar" e "Cancelar"
		And quando eu clico em "Confirmar" a tela apaga a hipotese
