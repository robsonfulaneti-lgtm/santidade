/* ============================================================
   CONTEÚDO DOS ESTUDOS — guias temáticos e métodos.
   Editar aqui é seguro: a lógica do app lê estas estruturas.
   IDs de leituras/perguntas devem ser estáveis (o progresso
   é salvo por ID). O guia "paulo" reaproveita os IDs antigos
   para importar o progresso já feito no app anterior.
   ============================================================ */

// Tipos de pergunta -> rótulo e cor (usados no visual)
window.TIPOS_PERGUNTA = {
  observacao:    { label: 'Observação',    dica: 'O que o texto diz? Fatos, personagens, ações.' },
  interpretacao: { label: 'Interpretação', dica: 'O que significava para os primeiros leitores?' },
  aplicacao:     { label: 'Aplicação',     dica: 'O que isso muda em você hoje?' },
  pratica:       { label: 'Prática',       dica: 'Que atitude concreta você vai tomar?' },
  oracao:        { label: 'Oração',        dica: 'Transforme o que aprendeu em oração.' },
  chave:         { label: 'Palavra-chave', dica: 'Uma palavra ou versículo que marcou.' },
};

// Métodos de estudo bíblico — cada um vira um formulário guiado.
window.METODOS = [
  {
    id: 'indutivo', nome: 'Método Indutivo', emoji: '🔎',
    resumo: 'O clássico dos três passos: observar, interpretar e aplicar. Vai do texto para a vida.',
    passos: [
      { id: 'obs', label: 'Observação', placeholder: 'O que o texto diz? Quem, o quê, quando, onde...', dica: 'Anote fatos, repetições, contrastes, palavras-chave.' },
      { id: 'int', label: 'Interpretação', placeholder: 'O que o texto significa?', dica: 'Considere o contexto e para quem foi escrito.' },
      { id: 'apl', label: 'Aplicação', placeholder: 'O que faço com isso?', dica: 'Uma verdade para crer, um pecado a evitar, uma ação a tomar.' },
    ],
  },
  {
    id: 'soap', nome: 'Método SOAP', emoji: '🧼',
    resumo: 'Escritura, Observação, Aplicação e Oração. Ótimo para o devocional diário.',
    passos: [
      { id: 's', label: 'Escritura', placeholder: 'Escreva o versículo que mais falou com você.', dica: 'Copie o texto à mão ajuda a memorizar.' },
      { id: 'o', label: 'Observação', placeholder: 'O que você percebe nesse versículo?', dica: 'Por que ele chamou sua atenção?' },
      { id: 'a', label: 'Aplicação', placeholder: 'Como aplicar hoje?', dica: 'Seja específico e pessoal.' },
      { id: 'p', label: 'Oração', placeholder: 'Ore a partir do texto.', dica: 'Peça a Deus para viver o que aprendeu.' },
    ],
  },
  {
    id: 'palavra', nome: 'Estudo de Palavra', emoji: '📖',
    resumo: 'Escolha uma palavra importante (graça, fé, aliança) e siga-a pelo texto.',
    passos: [
      { id: 'palavra', label: 'A palavra', placeholder: 'Ex.: graça, fé, arrependimento...', dica: 'Escolha uma palavra que se repete ou que é central.' },
      { id: 'onde', label: 'Onde aparece', placeholder: 'Versículos onde ela surge.', dica: 'Compare os diferentes usos.' },
      { id: 'sentido', label: 'O que significa', placeholder: 'O sentido dela no contexto.', dica: 'Ela muda de sentido em algum lugar?' },
      { id: 'vida', label: 'Para a minha vida', placeholder: 'O que essa palavra ensina para você.', dica: '' },
    ],
  },
  {
    id: 'biografico', nome: 'Estudo Biográfico', emoji: '👤',
    resumo: 'Estude uma pessoa da Bíblia: suas escolhas, falhas, fé e o que Deus fez através dela.',
    passos: [
      { id: 'quem', label: 'Quem é', placeholder: 'Nome e onde a história aparece.', dica: '' },
      { id: 'carater', label: 'Caráter e escolhas', placeholder: 'Virtudes, falhas, decisões marcantes.', dica: 'O que os atos revelam sobre o coração?' },
      { id: 'deus', label: 'Deus na história', placeholder: 'Como Deus agiu na vida dessa pessoa?', dica: '' },
      { id: 'licao', label: 'Lição para mim', placeholder: 'O que imitar e o que evitar.', dica: '' },
    ],
  },
  {
    id: 'lectio', nome: 'Leitura Orante (Lectio Divina)', emoji: '🕯️',
    resumo: 'Quatro movimentos antigos: ler, meditar, orar e contemplar. Devocional e pausado.',
    passos: [
      { id: 'lectio', label: 'Ler (Lectio)', placeholder: 'Leia devagar. Que palavra salta aos olhos?', dica: 'Leia o mesmo trecho 2 ou 3 vezes.' },
      { id: 'meditatio', label: 'Meditar (Meditatio)', placeholder: 'O que Deus está dizendo a você aqui?', dica: 'Fique com a palavra que tocou você.' },
      { id: 'oratio', label: 'Orar (Oratio)', placeholder: 'Responda a Deus em oração.', dica: '' },
      { id: 'contemplatio', label: 'Contemplar (Contemplatio)', placeholder: 'Descanse na presença de Deus. O que permanece?', dica: '' },
    ],
  },
];

// Perguntas de fixação padrão, reutilizáveis no fim das etapas.
function qsPadrao(prefix) {
  return [
    { id: prefix + '-obs', tipo: 'observacao', texto: 'Resuma com suas palavras o que acontece neste trecho.' },
    { id: prefix + '-apl', tipo: 'aplicacao', texto: 'O que este trecho ensina sobre Deus e sobre você?' },
    { id: prefix + '-pra', tipo: 'pratica', texto: 'Qual atitude concreta você vai tomar esta semana por causa desta leitura?' },
    { id: prefix + '-ora', tipo: 'oracao', texto: 'Escreva uma oração respondendo ao que leu.' },
  ];
}

window.GUIAS = [
  /* ============================ PAULO ============================ */
  {
    id: 'paulo', titulo: 'A vida de Paulo', emoji: '🕊️', cor: 'violeta',
    resumo: 'Cronologia cruzando Atos com as cartas — acompanhe Paulo “em tempo real”.',
    etapas: [
      {
        id: 'e0', titulo: 'Conversão e período silencioso', numero: 'Etapa 0',
        contexto: ['Período na Arábia e em Tarso (sem cartas conhecidas deste período).'],
        leituras: [{ id: 'e0-at9', ref: 'Atos 9', desc: 'Conversão a caminho de Damasco', tag: 'leitura' }],
        metodo: 'biografico',
        perguntas: [
          { id: 'paulo-e0-q1', tipo: 'observacao', texto: 'O que acontece com Saulo no caminho de Damasco e como ele reage?' },
          { id: 'paulo-e0-q2', tipo: 'interpretacao', texto: 'Por que a pergunta “por que me persegues?” liga Jesus à sua igreja?' },
          { id: 'paulo-e0-q3', tipo: 'aplicacao', texto: 'O que a conversão radical de Paulo mostra sobre a graça de Deus para com você?' },
          { id: 'paulo-e0-q4', tipo: 'oracao', texto: 'Ore agradecendo por Deus alcançar até os mais distantes.' },
        ],
      },
      {
        id: 'e1', titulo: 'Primeira viagem missionária', numero: 'Etapa 1',
        contexto: ['Antioquia da Síria → Chipre → Galácia (Antioquia da Pisídia, Icônio, Listra, Derbe).', 'Volta para Antioquia da Síria.'],
        leituras: [
          { id: 'e1-at13-14', ref: 'Atos 13–14', desc: 'A primeira viagem', tag: 'leitura' },
          { id: 'e1-gl', ref: 'Gálatas', desc: '~48–49 d.C.', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e1-q1', tipo: 'observacao', texto: 'Como as pessoas reagem à pregação de Paulo em Atos 13–14 (aceitação e rejeição)?' },
          { id: 'paulo-e1-q2', tipo: 'interpretacao', texto: 'Em Gálatas, qual é o erro que Paulo combate com tanta firmeza?' },
          { id: 'paulo-e1-q3', tipo: 'aplicacao', texto: 'Onde você é tentado a “completar” a graça com esforço próprio?' },
          { id: 'paulo-e1-q4', tipo: 'pratica', texto: 'Que passo dá para viver pela fé, e não pela lei, esta semana?' },
        ],
      },
      {
        id: 'e2', titulo: 'Concílio de Jerusalém', numero: 'Etapa 2',
        contexto: ['Debate sobre gentios e a lei judaica.', 'Contexto importante para entender Gálatas.'],
        leituras: [{ id: 'e2-at15', ref: 'Atos 15', desc: 'O concílio', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e2-q1', tipo: 'observacao', texto: 'Qual era a questão em debate e como a igreja chegou a uma decisão?' },
          { id: 'paulo-e2-q2', tipo: 'aplicacao', texto: 'Como o exemplo deles ajuda a resolver conflitos na igreja hoje?' },
          { id: 'paulo-e2-q3', tipo: 'pratica', texto: 'Há alguma diferença cultural que você impõe aos outros sem ser do Evangelho?' },
          { id: 'paulo-e2-q4', tipo: 'oracao', texto: 'Peça sabedoria para distinguir o essencial do secundário.' },
        ],
      },
      {
        id: 'e3', titulo: 'Segunda viagem missionária', numero: 'Etapa 3',
        contexto: ['Revisita igrejas da Galácia.', 'Macedônia: Filipos, Tessalônica, Bereia.', 'Acaia: Atenas e Corinto (fica 18 meses).'],
        leituras: [
          { id: 'e3-at15-18', ref: 'Atos 15:36 – 18:22', desc: 'A segunda viagem', tag: 'leitura' },
          { id: 'e3-1ts', ref: '1 Tessalonicenses', desc: '~50–51 d.C. · de Corinto', tag: 'carta' },
          { id: 'e3-2ts', ref: '2 Tessalonicenses', desc: '~50–51 d.C. · de Corinto', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e3-q1', tipo: 'observacao', texto: 'O que Paulo elogia e o que ele corrige nos tessalonicenses?' },
          { id: 'paulo-e3-q2', tipo: 'interpretacao', texto: 'O que as cartas ensinam sobre a volta de Cristo?' },
          { id: 'paulo-e3-q3', tipo: 'aplicacao', texto: 'Como a esperança na volta de Jesus muda a sua rotina?' },
          { id: 'paulo-e3-q4', tipo: 'pratica', texto: 'Que trabalho ou serviço você fará “de coração, como para o Senhor”?' },
        ],
      },
      {
        id: 'e4', titulo: 'Terceira viagem missionária', numero: 'Etapa 4',
        contexto: ['Éfeso (cerca de 3 anos, o ministério mais longo em uma cidade).', 'Depois: Macedônia novamente.', 'Depois: Corinto novamente (3 meses).'],
        leituras: [
          { id: 'e4-at18-21', ref: 'Atos 18:23 – 21:16', desc: 'A terceira viagem', tag: 'leitura' },
          { id: 'e4-1co', ref: '1 Coríntios', desc: '~53–54 d.C. · de Éfeso', tag: 'carta' },
          { id: 'e4-2co', ref: '2 Coríntios', desc: '~55–56 d.C. · da Macedônia', tag: 'carta' },
          { id: 'e4-rm', ref: 'Romanos', desc: '~56–57 d.C. · de Corinto', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e4-q1', tipo: 'observacao', texto: 'Quais problemas práticos Paulo trata em 1 Coríntios?' },
          { id: 'paulo-e4-q2', tipo: 'interpretacao', texto: 'Em Romanos, como Paulo explica o Evangelho do começo ao fim?' },
          { id: 'paulo-e4-q3', tipo: 'aplicacao', texto: 'Qual verdade de Romanos você mais precisa crer hoje?' },
          { id: 'paulo-e4-q4', tipo: 'oracao', texto: 'Ore usando Romanos 8 como base.' },
        ],
      },
      {
        id: 'e5', titulo: 'Prisão e viagem a Roma', numero: 'Etapa 5',
        contexto: ['Prisão em Jerusalém.', 'Prisão em Cesareia (2 anos).', 'Apelação a César, naufrágio em Malta.', 'Chegada a Roma, prisão domiciliar (2 anos) — fim de Atos.'],
        leituras: [
          { id: 'e5-at21-28', ref: 'Atos 21–28', desc: 'Prisão e viagem a Roma', tag: 'leitura' },
          { id: 'e5-ef', ref: 'Efésios', desc: '~60–62 d.C. · da prisão', tag: 'carta' },
          { id: 'e5-fp', ref: 'Filipenses', desc: '~60–62 d.C. · da prisão', tag: 'carta' },
          { id: 'e5-cl', ref: 'Colossenses', desc: '~60–62 d.C. · da prisão', tag: 'carta' },
          { id: 'e5-fm', ref: 'Filemom', desc: '~60–62 d.C. · da prisão', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e5-q1', tipo: 'observacao', texto: 'Como Paulo mantém a alegria mesmo preso (veja Filipenses)?' },
          { id: 'paulo-e5-q2', tipo: 'interpretacao', texto: 'O que Efésios ensina sobre a igreja como corpo de Cristo?' },
          { id: 'paulo-e5-q3', tipo: 'aplicacao', texto: 'O que rouba a sua alegria, e o que Filipenses responde a isso?' },
          { id: 'paulo-e5-q4', tipo: 'pratica', texto: 'Como Filemom te inspira a perdoar ou restaurar alguém?' },
        ],
      },
      {
        id: 'e6', titulo: 'Depois de Atos', numero: 'Etapa 6', nota: 'tradição, não narrado no livro',
        contexto: ['Possível soltura e novas viagens (talvez até a Espanha).', 'Nova prisão em Roma.'],
        leituras: [
          { id: 'e6-1tm', ref: '1 Timóteo', desc: '~62–64 d.C. · período de liberdade', tag: 'carta' },
          { id: 'e6-tt', ref: 'Tito', desc: '~62–64 d.C. · período de liberdade', tag: 'carta' },
          { id: 'e6-2tm', ref: '2 Timóteo', desc: '~64–67 d.C. · última carta, 2ª prisão', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'paulo-e6-q1', tipo: 'observacao', texto: 'Que conselhos Paulo dá a líderes jovens como Timóteo e Tito?' },
          { id: 'paulo-e6-q2', tipo: 'interpretacao', texto: 'Em 2 Timóteo 4, como Paulo encara o fim da vida?' },
          { id: 'paulo-e6-q3', tipo: 'aplicacao', texto: 'Que “boa batalha” você está travando agora?' },
          { id: 'paulo-e6-q4', tipo: 'oracao', texto: 'Ore para terminar bem a corrida da fé.' },
        ],
      },
    ],
  },

  /* ========================= PENTATEUCO ========================= */
  {
    id: 'pentateuco', titulo: 'O Pentateuco', emoji: '📜', cor: 'ambar',
    resumo: 'Os cinco primeiros livros: origem do mundo, do povo de Deus e da aliança.',
    etapas: [
      {
        id: 'pt1', titulo: 'Criação e Queda', numero: 'Gênesis 1–11',
        contexto: ['Criação, jardim, queda, Caim e Abel, dilúvio, Babel.'],
        leituras: [{ id: 'pt-gn1-11', ref: 'Gênesis 1–11', desc: 'As origens', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pt1-q1', tipo: 'observacao', texto: 'O que era “muito bom” na criação e o que muda a partir do capítulo 3?' },
          { id: 'pt1-q2', tipo: 'interpretacao', texto: 'O que a queda revela sobre a raiz do pecado (querer ser como Deus)?' },
          { id: 'pt1-q3', tipo: 'aplicacao', texto: 'Onde você vê hoje as consequências descritas em Gênesis 3?' },
          { id: 'pt1-q4', tipo: 'oracao', texto: 'Ore reconhecendo Deus como Criador e Senhor da sua vida.' },
        ],
      },
      {
        id: 'pt2', titulo: 'Abraão e a promessa', numero: 'Gênesis 12–25',
        contexto: ['Chamado de Abraão, aliança, promessa de descendência e terra, fé provada.'],
        leituras: [{ id: 'pt-gn12-25', ref: 'Gênesis 12–25', desc: 'O pai da fé', tag: 'leitura' }],
        metodo: 'biografico',
        perguntas: [
          { id: 'pt2-q1', tipo: 'observacao', texto: 'O que Deus promete a Abraão e o que pede dele?' },
          { id: 'pt2-q2', tipo: 'interpretacao', texto: 'Por que Gênesis 15:6 (“creu e lhe foi imputado justiça”) é tão importante?' },
          { id: 'pt2-q3', tipo: 'aplicacao', texto: 'Em que área Deus está pedindo que você confie sem ver o resultado?' },
          { id: 'pt2-q4', tipo: 'pratica', texto: 'Que passo de obediência “sem mapa” você pode dar?' },
        ],
      },
      {
        id: 'pt3', titulo: 'Jacó e José', numero: 'Gênesis 25–50',
        contexto: ['Isaque, Jacó e os 12 filhos; José vendido, provado e exaltado no Egito.'],
        leituras: [{ id: 'pt-gn25-50', ref: 'Gênesis 25–50', desc: 'A providência de Deus', tag: 'leitura' }],
        metodo: 'biografico',
        perguntas: [
          { id: 'pt3-q1', tipo: 'observacao', texto: 'Quais injustiças José sofre e como ele responde a cada uma?' },
          { id: 'pt3-q2', tipo: 'interpretacao', texto: 'O que significa “vós intentastes o mal, mas Deus o tornou em bem” (Gn 50:20)?' },
          { id: 'pt3-q3', tipo: 'aplicacao', texto: 'Onde você precisa confiar que Deus está agindo por trás do sofrimento?' },
          { id: 'pt3-q4', tipo: 'oracao', texto: 'Entregue a Deus uma injustiça que você viveu.' },
        ],
      },
      {
        id: 'pt4', titulo: 'Êxodo e libertação', numero: 'Êxodo 1–18',
        contexto: ['Escravidão no Egito, Moisés, as pragas, a Páscoa, a travessia do mar.'],
        leituras: [{ id: 'pt-ex1-18', ref: 'Êxodo 1–18', desc: 'A libertação', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pt4-q1', tipo: 'observacao', texto: 'Como Deus se apresenta a Moisés na sarça (Êxodo 3)?' },
          { id: 'pt4-q2', tipo: 'interpretacao', texto: 'O que a Páscoa (cordeiro e sangue) aponta sobre a salvação?' },
          { id: 'pt4-q3', tipo: 'aplicacao', texto: 'De qual “Egito” (escravidão) você precisa que Deus te liberte?' },
          { id: 'pt4-q4', tipo: 'oracao', texto: 'Louve a Deus como Aquele que salva e liberta.' },
        ],
      },
      {
        id: 'pt5', titulo: 'A Lei e a Aliança no Sinai', numero: 'Êxodo 19–40',
        contexto: ['Os Dez Mandamentos, a aliança, o bezerro de ouro, o tabernáculo.'],
        leituras: [{ id: 'pt-ex19-40', ref: 'Êxodo 19–40', desc: 'A aliança', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pt5-q1', tipo: 'observacao', texto: 'Qual a lógica dos Dez Mandamentos (relação com Deus e com o próximo)?' },
          { id: 'pt5-q2', tipo: 'interpretacao', texto: 'Por que Deus quer habitar no meio do povo (o tabernáculo)?' },
          { id: 'pt5-q3', tipo: 'aplicacao', texto: 'Qual mandamento fala mais diretamente com a sua vida agora?' },
          { id: 'pt5-q4', tipo: 'pratica', texto: 'Que ídolo (bezerro de ouro) moderno você precisa abandonar?' },
        ],
      },
      {
        id: 'pt6', titulo: 'Santidade e deserto', numero: 'Levítico e Números',
        contexto: ['Levítico: como se aproximar de um Deus santo. Números: 40 anos no deserto.'],
        leituras: [
          { id: 'pt-lv', ref: 'Levítico (panorama)', desc: 'Santidade', tag: 'leitura' },
          { id: 'pt-nm', ref: 'Números (panorama)', desc: 'O deserto', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pt6-q1', tipo: 'observacao', texto: 'O que se repete em Levítico sobre ser “santo, porque Eu sou santo”?' },
          { id: 'pt6-q2', tipo: 'interpretacao', texto: 'Por que a incredulidade impediu o povo de entrar na terra (Números 13–14)?' },
          { id: 'pt6-q3', tipo: 'aplicacao', texto: 'Em que área você tem “murmurado” em vez de confiar?' },
          { id: 'pt6-q4', tipo: 'oracao', texto: 'Peça um coração que crê nas promessas de Deus.' },
        ],
      },
      {
        id: 'pt7', titulo: 'Renovação da aliança', numero: 'Deuteronômio',
        contexto: ['Moisés relembra a Lei à nova geração antes de entrar na terra prometida.'],
        leituras: [{ id: 'pt-dt', ref: 'Deuteronômio (panorama)', desc: 'Lembra e escolhe a vida', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pt7-q1', tipo: 'observacao', texto: 'O que significa amar a Deus “de todo o coração” em Deuteronômio 6?' },
          { id: 'pt7-q2', tipo: 'interpretacao', texto: 'Por que Moisés insiste tanto em “lembrar” o que Deus fez?' },
          { id: 'pt7-q3', tipo: 'aplicacao', texto: 'Como você pode ensinar a fé a quem está ao seu redor (Dt 6:7)?' },
          { id: 'pt7-q4', tipo: 'pratica', texto: 'Escolha uma forma concreta de “escolher a vida” esta semana.' },
        ],
      },
    ],
  },

  /* ========================= DISCÍPULOS ========================= */
  {
    id: 'discipulos', titulo: 'Os Doze Discípulos', emoji: '🎣', cor: 'esmeralda',
    resumo: 'Homens comuns chamados por Jesus para mudar o mundo.',
    etapas: [
      {
        id: 'dc1', titulo: 'O chamado', numero: 'Etapa 1',
        contexto: ['Jesus chama pescadores e um cobrador de impostos para segui-lo.'],
        leituras: [
          { id: 'dc-mc1', ref: 'Marcos 1:16-20', desc: 'Vinde após mim', tag: 'leitura' },
          { id: 'dc-lc6', ref: 'Lucas 6:12-16', desc: 'A escolha dos Doze', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dc1-q1', tipo: 'observacao', texto: 'O que os primeiros discípulos deixam para seguir Jesus?' },
          { id: 'dc1-q2', tipo: 'interpretacao', texto: 'Por que Jesus passa a noite orando antes de escolher os Doze?' },
          { id: 'dc1-q3', tipo: 'aplicacao', texto: 'O que “seguir Jesus” custa a você hoje?' },
          { id: 'dc1-q4', tipo: 'oracao', texto: 'Coloque-se à disposição de Deus como os discípulos.' },
        ],
      },
      {
        id: 'dc2', titulo: 'Pedro: da queda à rocha', numero: 'Etapa 2',
        contexto: ['Impulsivo, nega Jesus, é restaurado e se torna líder da igreja.'],
        leituras: [
          { id: 'dc-mt16', ref: 'Mateus 16:13-23', desc: 'A confissão e a repreensão', tag: 'leitura' },
          { id: 'dc-jo21', ref: 'João 21:15-19', desc: 'A restauração', tag: 'leitura' },
        ],
        metodo: 'biografico',
        perguntas: [
          { id: 'dc2-q1', tipo: 'observacao', texto: 'Como Pedro passa do acerto (v.16) ao erro (v.23) tão rápido?' },
          { id: 'dc2-q2', tipo: 'interpretacao', texto: 'O que a tríplice pergunta “tu me amas?” significa depois da tríplice negação?' },
          { id: 'dc2-q3', tipo: 'aplicacao', texto: 'Onde você precisa da restauração que Jesus ofereceu a Pedro?' },
          { id: 'dc2-q4', tipo: 'pratica', texto: 'A quem você pode “apascentar” (cuidar) como Jesus pediu a Pedro?' },
        ],
      },
      {
        id: 'dc3', titulo: 'Tiago e João, filhos do trovão', numero: 'Etapa 3',
        contexto: ['Ambiciosos e intensos; João se torna o “apóstolo do amor”, Tiago o primeiro mártir.'],
        leituras: [
          { id: 'dc-mc10', ref: 'Marcos 10:35-45', desc: 'Quem quer ser grande', tag: 'leitura' },
          { id: 'dc-at12', ref: 'Atos 12:1-2', desc: 'O martírio de Tiago', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dc3-q1', tipo: 'observacao', texto: 'O que os irmãos pedem e como Jesus redefine grandeza?' },
          { id: 'dc3-q2', tipo: 'aplicacao', texto: 'Em que você busca posição em vez de servir?' },
          { id: 'dc3-q3', tipo: 'pratica', texto: 'Que serviço humilde você pode fazer sem ninguém ver?' },
          { id: 'dc3-q4', tipo: 'oracao', texto: 'Peça um coração de servo como o de Jesus.' },
        ],
      },
      {
        id: 'dc4', titulo: 'Tomé, Mateus e os outros', numero: 'Etapa 4',
        contexto: ['O que duvidou, o cobrador de impostos, e os menos citados — todos usados por Deus.'],
        leituras: [
          { id: 'dc-jo20', ref: 'João 20:24-29', desc: 'A dúvida de Tomé', tag: 'leitura' },
          { id: 'dc-mt9', ref: 'Mateus 9:9-13', desc: 'O chamado de Mateus', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dc4-q1', tipo: 'observacao', texto: 'Como Jesus trata a dúvida de Tomé?' },
          { id: 'dc4-q2', tipo: 'interpretacao', texto: 'Por que Jesus come com “pecadores” como Mateus?' },
          { id: 'dc4-q3', tipo: 'aplicacao', texto: 'Que dúvida você precisa levar honestamente a Jesus?' },
          { id: 'dc4-q4', tipo: 'oracao', texto: 'Ore: “Senhor meu e Deus meu” (Jo 20:28).' },
        ],
      },
      {
        id: 'dc5', titulo: 'Judas: o que se perdeu', numero: 'Etapa 5',
        contexto: ['Um dos Doze que traiu Jesus — um alerta solene sobre o coração.'],
        leituras: [{ id: 'dc-mt26', ref: 'Mateus 26:14-16, 47-50', desc: 'A traição', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dc5-q1', tipo: 'observacao', texto: 'O que motiva Judas e como ele se aproxima de Jesus para traí-lo?' },
          { id: 'dc5-q2', tipo: 'interpretacao', texto: 'O que o caso de Judas ensina sobre estar “perto” de Jesus sem segui-lo de verdade?' },
          { id: 'dc5-q3', tipo: 'aplicacao', texto: 'Que amor ao dinheiro ou aparência você precisa examinar?' },
          { id: 'dc5-q4', tipo: 'oracao', texto: 'Peça a Deus um coração verdadeiro, não apenas religioso.' },
        ],
      },
      {
        id: 'dc6', titulo: 'A missão dos apóstolos', numero: 'Etapa 6',
        contexto: ['Cheios do Espírito, os mesmos homens fracos viram testemunhas corajosas.'],
        leituras: [
          { id: 'dc-mt28', ref: 'Mateus 28:16-20', desc: 'A Grande Comissão', tag: 'leitura' },
          { id: 'dc-at2', ref: 'Atos 2', desc: 'Pentecostes', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dc6-q1', tipo: 'observacao', texto: 'O que muda nos discípulos entre os evangelhos e Atos 2?' },
          { id: 'dc6-q2', tipo: 'interpretacao', texto: 'Qual é a tarefa central da Grande Comissão?' },
          { id: 'dc6-q3', tipo: 'aplicacao', texto: 'A quem você poderia falar de Jesus nesta semana?' },
          { id: 'dc6-q4', tipo: 'pratica', texto: 'Escreva o nome de uma pessoa e comece a orar por ela.' },
        ],
      },
    ],
  },

  /* ============================ JESUS ============================ */
  {
    id: 'jesus', titulo: 'A vida de Jesus', emoji: '✝️', cor: 'ouro',
    resumo: 'Do nascimento à ressurreição — o centro de toda a Escritura.',
    etapas: [
      {
        id: 'js1', titulo: 'Nascimento e infância', numero: 'Etapa 1',
        contexto: ['A encarnação: Deus se faz homem.'],
        leituras: [
          { id: 'js-lc2', ref: 'Lucas 2:1-20', desc: 'O nascimento', tag: 'leitura' },
          { id: 'js-jo1', ref: 'João 1:1-18', desc: 'O Verbo se fez carne', tag: 'leitura' },
        ],
        metodo: 'lectio',
        perguntas: [
          { id: 'js1-q1', tipo: 'observacao', texto: 'A quem o nascimento de Jesus é anunciado primeiro, e por quê?' },
          { id: 'js1-q2', tipo: 'interpretacao', texto: 'O que João 1 ensina sobre quem Jesus é desde a eternidade?' },
          { id: 'js1-q3', tipo: 'aplicacao', texto: 'O que significa para você que Deus se fez próximo (Emanuel)?' },
          { id: 'js1-q4', tipo: 'oracao', texto: 'Adore Jesus, a Palavra que habitou entre nós.' },
        ],
      },
      {
        id: 'js2', titulo: 'Batismo e tentação', numero: 'Etapa 2',
        contexto: ['O início do ministério: aprovação do Pai e vitória sobre a tentação.'],
        leituras: [{ id: 'js-mt3-4', ref: 'Mateus 3:13 – 4:11', desc: 'Batismo e deserto', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'js2-q1', tipo: 'observacao', texto: 'Como Jesus responde a cada tentação no deserto?' },
          { id: 'js2-q2', tipo: 'interpretacao', texto: 'Por que Jesus vence usando a Escritura (“está escrito”)?' },
          { id: 'js2-q3', tipo: 'aplicacao', texto: 'Qual Palavra você pode ter na ponta da língua para vencer a tentação?' },
          { id: 'js2-q4', tipo: 'pratica', texto: 'Memorize um versículo que combata sua tentação mais comum.' },
        ],
      },
      {
        id: 'js3', titulo: 'O Sermão do Monte', numero: 'Etapa 3',
        contexto: ['O ensino central sobre o Reino de Deus.'],
        leituras: [{ id: 'js-mt5-7', ref: 'Mateus 5–7', desc: 'O manifesto do Reino', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'js3-q1', tipo: 'observacao', texto: 'Quem Jesus chama de “bem-aventurados” e por quê?' },
          { id: 'js3-q2', tipo: 'interpretacao', texto: 'Como Jesus vai além da lei (“ouvistes... eu, porém, vos digo”)?' },
          { id: 'js3-q3', tipo: 'aplicacao', texto: 'Qual ensino do sermão mais confronta você?' },
          { id: 'js3-q4', tipo: 'pratica', texto: 'Escolha um mandamento do sermão para obedecer hoje.' },
        ],
      },
      {
        id: 'js4', titulo: 'Milagres e compaixão', numero: 'Etapa 4',
        contexto: ['Sinais do Reino: cura, provisão, poder sobre a natureza e a morte.'],
        leituras: [
          { id: 'js-mc4', ref: 'Marcos 4:35-41', desc: 'Acalma a tempestade', tag: 'leitura' },
          { id: 'js-jo11', ref: 'João 11:1-44', desc: 'Ressuscita Lázaro', tag: 'leitura' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'js4-q1', tipo: 'observacao', texto: 'O que os milagres revelam sobre a autoridade e o coração de Jesus?' },
          { id: 'js4-q2', tipo: 'interpretacao', texto: 'Por que Jesus chora antes de ressuscitar Lázaro (Jo 11:35)?' },
          { id: 'js4-q3', tipo: 'aplicacao', texto: 'Que “tempestade” você precisa entregar ao Senhor?' },
          { id: 'js4-q4', tipo: 'oracao', texto: 'Leve a Jesus algo que parece sem solução.' },
        ],
      },
      {
        id: 'js5', titulo: 'A cruz', numero: 'Etapa 5',
        contexto: ['A última semana, a ceia, o Getsêmani e a crucificação.'],
        leituras: [
          { id: 'js-lc22', ref: 'Lucas 22–23', desc: 'Ceia, prisão e cruz', tag: 'leitura' },
          { id: 'js-is53', ref: 'Isaías 53', desc: 'O servo sofredor (profecia)', tag: 'leitura' },
        ],
        metodo: 'lectio',
        perguntas: [
          { id: 'js5-q1', tipo: 'observacao', texto: 'O que Jesus diz e faz nas horas finais antes da cruz?' },
          { id: 'js5-q2', tipo: 'interpretacao', texto: 'Como Isaías 53, escrito séculos antes, descreve a cruz?' },
          { id: 'js5-q3', tipo: 'aplicacao', texto: 'O que significa para você que Ele levou o seu pecado?' },
          { id: 'js5-q4', tipo: 'oracao', texto: 'Agradeça diante da cruz, versículo por versículo.' },
        ],
      },
      {
        id: 'js6', titulo: 'A ressurreição', numero: 'Etapa 6',
        contexto: ['A vitória sobre a morte e o início da nova vida.'],
        leituras: [
          { id: 'js-jo20', ref: 'João 20', desc: 'O túmulo vazio', tag: 'leitura' },
          { id: 'js-1co15', ref: '1 Coríntios 15:1-26', desc: 'O sentido da ressurreição', tag: 'carta' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'js6-q1', tipo: 'observacao', texto: 'Como as pessoas reagem ao encontrar Jesus ressurreto?' },
          { id: 'js6-q2', tipo: 'interpretacao', texto: 'Por que Paulo diz que sem a ressurreição a fé seria vã (1 Co 15:14)?' },
          { id: 'js6-q3', tipo: 'aplicacao', texto: 'Que esperança a ressurreição te dá diante da morte e do medo?' },
          { id: 'js6-q4', tipo: 'pratica', texto: 'Viva hoje como quem serve a um Salvador vivo — como?' },
        ],
      },
    ],
  },

  /* ========================== PARÁBOLAS ========================== */
  {
    id: 'parabolas', titulo: 'As Parábolas', emoji: '🌾', cor: 'verde',
    resumo: 'Histórias simples que revelam verdades profundas do Reino.',
    etapas: [
      {
        id: 'pb1', titulo: 'O semeador', numero: 'Etapa 1',
        contexto: ['Quatro tipos de solo, quatro respostas à Palavra.'],
        leituras: [{ id: 'pb-mt13', ref: 'Mateus 13:1-23', desc: 'A semente e os solos', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pb1-q1', tipo: 'observacao', texto: 'Quais são os quatro solos e o que acontece com a semente em cada um?' },
          { id: 'pb1-q2', tipo: 'interpretacao', texto: 'O que cada solo representa no coração das pessoas?' },
          { id: 'pb1-q3', tipo: 'aplicacao', texto: 'Que tipo de solo o seu coração tem sido ultimamente?' },
          { id: 'pb1-q4', tipo: 'pratica', texto: 'Que “espinho” (afã, riqueza) você precisa arrancar para dar fruto?' },
        ],
      },
      {
        id: 'pb2', titulo: 'O bom samaritano', numero: 'Etapa 2',
        contexto: ['Quem é o meu próximo?'],
        leituras: [{ id: 'pb-lc10', ref: 'Lucas 10:25-37', desc: 'O amor ao próximo', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pb2-q1', tipo: 'observacao', texto: 'Quem passa pelo homem ferido e como cada um reage?' },
          { id: 'pb2-q2', tipo: 'interpretacao', texto: 'Por que Jesus faz um samaritano ser o herói da história?' },
          { id: 'pb2-q3', tipo: 'aplicacao', texto: 'De quem você tem “passado ao largo” em vez de ajudar?' },
          { id: 'pb2-q4', tipo: 'pratica', texto: 'Qual ato concreto de misericórdia você fará esta semana?' },
        ],
      },
      {
        id: 'pb3', titulo: 'O filho pródigo', numero: 'Etapa 3',
        contexto: ['O amor do Pai que corre ao encontro do filho perdido.'],
        leituras: [{ id: 'pb-lc15', ref: 'Lucas 15:11-32', desc: 'O Pai que perdoa', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pb3-q1', tipo: 'observacao', texto: 'Como o pai recebe o filho que voltou, e como reage o filho mais velho?' },
          { id: 'pb3-q2', tipo: 'interpretacao', texto: 'Quais dois modos de estar “longe” do pai a parábola mostra?' },
          { id: 'pb3-q3', tipo: 'aplicacao', texto: 'Você se parece mais com o filho mais novo ou com o mais velho agora?' },
          { id: 'pb3-q4', tipo: 'oracao', texto: 'Volte para casa em oração e receba o abraço do Pai.' },
        ],
      },
      {
        id: 'pb4', titulo: 'O Reino escondido', numero: 'Etapa 4',
        contexto: ['O tesouro, a pérola e o grão de mostarda: o valor supremo do Reino.'],
        leituras: [{ id: 'pb-mt13b', ref: 'Mateus 13:31-46', desc: 'Tesouro, pérola, mostarda', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pb4-q1', tipo: 'observacao', texto: 'O que o homem faz ao achar o tesouro e a pérola?' },
          { id: 'pb4-q2', tipo: 'interpretacao', texto: 'O que essas parábolas ensinam sobre o valor do Reino?' },
          { id: 'pb4-q3', tipo: 'aplicacao', texto: 'O que você tem colocado acima do Reino de Deus?' },
          { id: 'pb4-q4', tipo: 'pratica', texto: 'Que “venda tudo” Deus está pedindo de você?' },
        ],
      },
      {
        id: 'pb5', titulo: 'Prontidão e mordomia', numero: 'Etapa 5',
        contexto: ['As dez virgens e os talentos: vigiar e usar bem o que recebemos.'],
        leituras: [{ id: 'pb-mt25', ref: 'Mateus 25:1-30', desc: 'Virgens e talentos', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'pb5-q1', tipo: 'observacao', texto: 'Por que cinco virgens ficam de fora e um servo é repreendido?' },
          { id: 'pb5-q2', tipo: 'interpretacao', texto: 'O que significa “vigiar” e “multiplicar os talentos”?' },
          { id: 'pb5-q3', tipo: 'aplicacao', texto: 'Que dom ou recurso você tem “enterrado” por medo?' },
          { id: 'pb5-q4', tipo: 'pratica', texto: 'Como investir seus dons no Reino esta semana?' },
        ],
      },
    ],
  },

  /* ============================= DAVI ============================= */
  {
    id: 'davi', titulo: 'A vida de Davi', emoji: '👑', cor: 'azul',
    resumo: 'Do pastor ao rei: um coração segundo o coração de Deus, com grandes quedas e restaurações.',
    etapas: [
      {
        id: 'dv1', titulo: 'A unção do pastor', numero: '1 Samuel 16',
        contexto: ['Deus escolhe o mais novo, olhando o coração, não a aparência.'],
        leituras: [{ id: 'dv-1sm16', ref: '1 Samuel 16', desc: 'Deus vê o coração', tag: 'leitura' }],
        metodo: 'biografico',
        perguntas: [
          { id: 'dv1-q1', tipo: 'observacao', texto: 'Por que Samuel quase escolhe o irmão errado?' },
          { id: 'dv1-q2', tipo: 'interpretacao', texto: 'O que significa “o Senhor olha para o coração” (v.7)?' },
          { id: 'dv1-q3', tipo: 'aplicacao', texto: 'Onde você julga pela aparência — nos outros ou em si mesmo?' },
          { id: 'dv1-q4', tipo: 'oracao', texto: 'Peça a Deus que forme o seu coração por dentro.' },
        ],
      },
      {
        id: 'dv2', titulo: 'Davi e Golias', numero: '1 Samuel 17',
        contexto: ['A fé de um jovem contra o gigante que aterrorizava Israel.'],
        leituras: [{ id: 'dv-1sm17', ref: '1 Samuel 17', desc: 'A batalha é do Senhor', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dv2-q1', tipo: 'observacao', texto: 'Qual a diferença entre a visão de Davi e a do exército sobre Golias?' },
          { id: 'dv2-q2', tipo: 'interpretacao', texto: 'De onde vem a confiança de Davi (v.37, v.45-47)?' },
          { id: 'dv2-q3', tipo: 'aplicacao', texto: 'Qual “gigante” hoje parece grande demais para você?' },
          { id: 'dv2-q4', tipo: 'pratica', texto: 'Que passo de fé você dá lembrando das vitórias passadas de Deus?' },
        ],
      },
      {
        id: 'dv3', titulo: 'Perseguido por Saul', numero: '1 Samuel 18–26',
        contexto: ['Anos de fuga; Davi poupa Saul e espera o tempo de Deus.'],
        leituras: [{ id: 'dv-1sm24', ref: '1 Samuel 24', desc: 'Davi poupa Saul', tag: 'leitura' }],
        metodo: 'biografico',
        perguntas: [
          { id: 'dv3-q1', tipo: 'observacao', texto: 'Davi tem a chance de matar Saul — o que ele faz e por quê?' },
          { id: 'dv3-q2', tipo: 'interpretacao', texto: 'O que significa respeitar o “tempo de Deus” em vez de forçar o próprio caminho?' },
          { id: 'dv3-q3', tipo: 'aplicacao', texto: 'Onde você é tentado a “resolver com as próprias mãos”?' },
          { id: 'dv3-q4', tipo: 'oracao', texto: 'Entregue a Deus uma situação em que você precisa esperar.' },
        ],
      },
      {
        id: 'dv4', titulo: 'Rei em Jerusalém', numero: '2 Samuel 5–7',
        contexto: ['Davi unifica Israel e recebe a promessa de um reino eterno.'],
        leituras: [{ id: 'dv-2sm7', ref: '2 Samuel 7', desc: 'A aliança davídica', tag: 'leitura' }],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dv4-q1', tipo: 'observacao', texto: 'O que Davi quer fazer por Deus, e o que Deus promete fazer por Davi?' },
          { id: 'dv4-q2', tipo: 'interpretacao', texto: 'Como essa promessa de um trono eterno aponta para Jesus?' },
          { id: 'dv4-q3', tipo: 'aplicacao', texto: 'Como reagir quando Deus abençoa de um jeito diferente do que você planejou?' },
          { id: 'dv4-q4', tipo: 'oracao', texto: 'Ore como Davi ora em 2 Samuel 7:18-29.' },
        ],
      },
      {
        id: 'dv5', titulo: 'A queda e o arrependimento', numero: '2 Samuel 11–12',
        contexto: ['O pecado com Bate-Seba, o encobrimento e o quebrantamento.'],
        leituras: [
          { id: 'dv-2sm11-12', ref: '2 Samuel 11–12', desc: 'O pecado e a confrontação', tag: 'leitura' },
          { id: 'dv-sl51', ref: 'Salmo 51', desc: 'A oração de arrependimento', tag: 'salmo' },
        ],
        metodo: 'indutivo',
        perguntas: [
          { id: 'dv5-q1', tipo: 'observacao', texto: 'Quais passos levam Davi do olhar ao adultério e ao assassinato?' },
          { id: 'dv5-q2', tipo: 'interpretacao', texto: 'O que o Salmo 51 revela sobre um verdadeiro arrependimento?' },
          { id: 'dv5-q3', tipo: 'aplicacao', texto: 'Que pecado “pequeno” você precisa cortar antes que cresça?' },
          { id: 'dv5-q4', tipo: 'oracao', texto: 'Faça o Salmo 51 a sua própria oração.' },
        ],
      },
      {
        id: 'dv6', titulo: 'O coração adorador', numero: 'Salmos de Davi',
        contexto: ['Davi nos ensinou a orar em toda circunstância pelos Salmos.'],
        leituras: [
          { id: 'dv-sl23', ref: 'Salmo 23', desc: 'O Senhor é o meu pastor', tag: 'salmo' },
          { id: 'dv-sl103', ref: 'Salmo 103', desc: 'Bendize, ó minha alma', tag: 'salmo' },
        ],
        metodo: 'lectio',
        perguntas: [
          { id: 'dv6-q1', tipo: 'observacao', texto: 'Que imagens de Deus aparecem no Salmo 23 e no 103?' },
          { id: 'dv6-q2', tipo: 'aplicacao', texto: 'Qual verso desses salmos fala com a sua situação hoje?' },
          { id: 'dv6-q3', tipo: 'chave', texto: 'Escolha um versículo para levar no coração esta semana.' },
          { id: 'dv6-q4', tipo: 'oracao', texto: 'Ore o Salmo 103 louvando por cada benefício citado.' },
        ],
      },
    ],
  },
];
