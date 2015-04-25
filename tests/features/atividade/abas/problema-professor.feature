Feature: Aba Problema - Tela de atividade
	Como Professor
	Eu quero criar ou editar o problema de uma atividade
	Para isso eu abro uma atividade através do painel de usuário

Scenario: Edição do problema para uma nova atividade sem problema salvo
		Given Eu acesso a atividade sem problema definido através do painel de usuário
		When a tela da atividade carrega
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe o campo "Descrição", com o texto de ajuda "Placeholder ainda não definido"
		And o painel da aba problema exibe o campo "Material de apoio", com o texto de ajuda "Placeholder ainda não definido"
		And o painel da aba problema exibe o campo "Links externos", com o texto de ajuda "Placeholder ainda não definido"
		And estes campos exibem ícones ao lado do título permitindo sua edição
		And a tela exibe o botão "Salvar Atividade" inibido
		And quando eu clico no botão de edição do campo "Descrição" a tela exibe uma modal com um campo de texto para preenchimento e os botões "Salvar" e "Cancelar"
		And o botão "Salvar" está inibido
		And quando eu preencho o campo de texto o botão "Salvar" é habilitado		
		And quando eu clico no botão de edição do campo "Material de Apoio" a tela exibe uma modal com um campo de texto para preenchimento e os botões "Salvar" e "Cancelar"
		And o botão "Salvar" está inibido
		And quando eu preencho o campo de texto o botão "Salvar" é habilitado		
		And quando eu clico no botão de edição do campo "Links Externos" a tela exibe uma modal com um campo de texto para preenchimento com um link
		And ao lado do campo de texto é exibido um ícone de inclusão do link (+)
		And a modal exibo os botões "Salvar" e "Cancelar"
		And o botão "Salvar" está inibido
		And quando eu preencho o campo de texto o botão "Salvar" é habilitado
		And a tela exibe o botão "Salvar Atividade" habilitado quando todos os campos estão preenchidos
		And quando eu clico no botão "Salvar Atividade" a tela exibe uma modal com o texto "Texto de aviso que não vai mais conseguir editar"

Scenario: Edição do problema para uma nova atividade com problema salvo
		Given Eu acesso a atividade com problema definido através do painel de usuário
		When a tela da atividade carrega
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe o campo "Descrição", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Material de apoio", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Links externos", com o texto salvo anteriormente
		And os campos não são editáveis
		And a tela exibe o botão "Continuar Atividade"

Scenario: Acesso ao problema da atividade a partir de outra aba (com problema salvo)
		Given Eu acesso a atividade com problema definido a partir de outra aba
		When a aba problema é carregada
		Then o estado problema vem selecionado e os demais estados estão desabilitados
		And o painel da aba problema exibe o campo "Descrição", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Material de apoio", com o texto salvo anteriormente
		And o painel da aba problema exibe o campo "Links externos", com o texto salvo anteriormente
		And os campos não são editáveis
		And a tela exibe o botão "Continuar Atividade"
