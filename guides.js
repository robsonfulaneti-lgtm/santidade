/* ============================================================
   GUIAS TEMÁTICOS — Paulo (mantido, IDs preservados para não
   perder o progresso) e os Doze Discípulos (vida e caráter).
   Os IDs de leituras/perguntas do Paulo são estáveis: o
   progresso já feito continua valendo.
   ============================================================ */

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
        perguntas: [
          { id: 'paulo-e6-q1', tipo: 'observacao', texto: 'Que conselhos Paulo dá a líderes jovens como Timóteo e Tito?' },
          { id: 'paulo-e6-q2', tipo: 'interpretacao', texto: 'Em 2 Timóteo 4, como Paulo encara o fim da vida?' },
          { id: 'paulo-e6-q3', tipo: 'aplicacao', texto: 'Que “boa batalha” você está travando agora?' },
          { id: 'paulo-e6-q4', tipo: 'oracao', texto: 'Ore para terminar bem a corrida da fé.' },
        ],
      },
    ],
  },

  /* ======================= OS DOZE DISCÍPULOS ======================= */
  {
    id: 'discipulos', titulo: 'Os Doze Discípulos', emoji: '🎣', cor: 'esmeralda',
    resumo: 'A vida e o caráter de cada um dos doze — homens comuns chamados por Jesus.',
    etapas: [
      {
        id: 'dc-pedro', titulo: 'Pedro (Simão)', numero: 'O líder impulsivo',
        contexto: ['Pescador, irmão de André. Impulsivo, corajoso e falho.', 'Confessou Jesus como o Cristo, mas o negou três vezes — e foi restaurado.', 'Tornou-se líder da igreja primitiva e pregou no Pentecostes.'],
        leituras: [
          { id: 'dc-pedro-l1', ref: 'Mateus 16:13-23', desc: 'A confissão e a repreensão', tag: 'leitura' },
          { id: 'dc-pedro-l2', ref: 'João 21:15-19', desc: 'A restauração', tag: 'leitura' },
        ],
        perguntas: [
          { id: 'dc-pedro-q1', tipo: 'observacao', texto: 'Como Pedro passa do acerto (Mt 16:16) ao erro (16:23) tão rápido?' },
          { id: 'dc-pedro-q2', tipo: 'aplicacao', texto: 'Onde você precisa da restauração que Jesus ofereceu a Pedro?' },
          { id: 'dc-pedro-q3', tipo: 'oracao', texto: 'Ore como quem responde “Senhor, tu sabes que te amo”.' },
        ],
      },
      {
        id: 'dc-andre', titulo: 'André', numero: 'O que trazia pessoas a Jesus',
        contexto: ['Irmão de Pedro, também pescador. Discípulo de João Batista antes.', 'Discreto: aparece sempre levando alguém a Jesus (o próprio Pedro, o menino dos pães, os gregos).'],
        leituras: [{ id: 'dc-andre-l1', ref: 'João 1:40-42; 6:8-9', desc: 'André apresenta pessoas a Jesus', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-andre-q1', tipo: 'observacao', texto: 'O que André faz logo depois de encontrar Jesus?' },
          { id: 'dc-andre-q2', tipo: 'pratica', texto: 'A quem você poderia “trazer a Jesus” como André fez?' },
        ],
      },
      {
        id: 'dc-tiago-z', titulo: 'Tiago (filho de Zebedeu)', numero: 'O “filho do trovão”',
        contexto: ['Irmão de João; do círculo mais próximo de Jesus (com Pedro e João).', 'Intenso e ambicioso; foi o primeiro apóstolo mártir, morto por Herodes.'],
        leituras: [
          { id: 'dc-tiagoz-l1', ref: 'Marcos 10:35-45', desc: 'O pedido por grandeza', tag: 'leitura' },
          { id: 'dc-tiagoz-l2', ref: 'Atos 12:1-2', desc: 'O martírio', tag: 'leitura' },
        ],
        perguntas: [
          { id: 'dc-tiagoz-q1', tipo: 'interpretacao', texto: 'Como Jesus redefine “grandeza” diante do pedido dos irmãos?' },
          { id: 'dc-tiagoz-q2', tipo: 'aplicacao', texto: 'Em que você busca posição em vez de servir?' },
        ],
      },
      {
        id: 'dc-joao', titulo: 'João', numero: 'O discípulo amado',
        contexto: ['Irmão de Tiago; do círculo íntimo de Jesus.', 'De “filho do trovão” a “apóstolo do amor”. Escreveu um evangelho, três cartas e o Apocalipse.', 'Cuidou de Maria e viveu até idade avançada.'],
        leituras: [{ id: 'dc-joao-l1', ref: '1 João 4:7-12', desc: 'Deus é amor', tag: 'carta' }],
        perguntas: [
          { id: 'dc-joao-q1', tipo: 'interpretacao', texto: 'Como o amor de Deus, segundo João, se torna a marca do cristão?' },
          { id: 'dc-joao-q2', tipo: 'aplicacao', texto: 'Que passo de amor concreto Deus pede de você hoje?' },
        ],
      },
      {
        id: 'dc-filipe', titulo: 'Filipe', numero: 'O que calculava',
        contexto: ['De Betsaida, como Pedro e André. Prático e um tanto lento para crer.', 'Calculou o custo de alimentar a multidão; pediu a Jesus “mostra-nos o Pai”.'],
        leituras: [{ id: 'dc-filipe-l1', ref: 'João 14:8-11', desc: '“Mostra-nos o Pai”', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-filipe-q1', tipo: 'observacao', texto: 'O que Jesus responde ao pedido de Filipe?' },
          { id: 'dc-filipe-q2', tipo: 'aplicacao', texto: 'Onde você calcula com a razão o que deveria confiar pela fé?' },
        ],
      },
      {
        id: 'dc-bartolomeu', titulo: 'Bartolomeu (Natanael)', numero: 'O sincero sem engano',
        contexto: ['Provavelmente o Natanael de João. Cético a princípio (“de Nazaré pode sair algo bom?”).', 'Jesus o elogia como “israelita em quem não há dolo” — sincero e íntegro.'],
        leituras: [{ id: 'dc-bart-l1', ref: 'João 1:43-51', desc: 'O chamado de Natanael', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-bart-q1', tipo: 'observacao', texto: 'O que faz o cético Natanael reconhecer Jesus?' },
          { id: 'dc-bart-q2', tipo: 'aplicacao', texto: 'O que significa ser alguém “sem engano” diante de Deus?' },
        ],
      },
      {
        id: 'dc-mateus', titulo: 'Mateus (Levi)', numero: 'O cobrador de impostos',
        contexto: ['Publicano — desprezado como traidor por cobrar impostos para Roma.', 'Deixou tudo ao ser chamado e ofereceu um banquete a Jesus. Escreveu o primeiro evangelho.'],
        leituras: [{ id: 'dc-mateus-l1', ref: 'Mateus 9:9-13', desc: 'O chamado de Mateus', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-mateus-q1', tipo: 'interpretacao', texto: 'Por que Jesus come com “pecadores” como Mateus?' },
          { id: 'dc-mateus-q2', tipo: 'aplicacao', texto: 'O que você precisou (ou precisa) “deixar” para seguir Jesus?' },
        ],
      },
      {
        id: 'dc-tome', titulo: 'Tomé', numero: 'O que duvidou',
        contexto: ['Corajoso (disposto a morrer com Jesus) e honesto em suas dúvidas.', 'Não creu na ressurreição sem ver; ao ver, fez a maior confissão: “Senhor meu e Deus meu”.'],
        leituras: [{ id: 'dc-tome-l1', ref: 'João 20:24-29', desc: 'A dúvida e a fé de Tomé', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-tome-q1', tipo: 'observacao', texto: 'Como Jesus trata a dúvida de Tomé?' },
          { id: 'dc-tome-q2', tipo: 'aplicacao', texto: 'Que dúvida honesta você precisa levar a Jesus em vez de esconder?' },
        ],
      },
      {
        id: 'dc-tiago-a', titulo: 'Tiago (filho de Alfeu)', numero: 'O menor',
        contexto: ['Chamado “o menor”, talvez pela estatura ou pela discrição.', 'Pouco citado, mas fiel: lembra que Deus usa também os que servem em silêncio.'],
        leituras: [{ id: 'dc-tiagoa-l1', ref: 'Marcos 3:13-19', desc: 'A lista dos Doze', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-tiagoa-q1', tipo: 'aplicacao', texto: 'O que significa servir com fidelidade mesmo sem reconhecimento?' },
          { id: 'dc-tiagoa-q2', tipo: 'oracao', texto: 'Peça um coração disposto a servir “nos bastidores”.' },
        ],
      },
      {
        id: 'dc-tadeu', titulo: 'Tadeu (Judas, filho de Tiago)', numero: 'O de pergunta sincera',
        contexto: ['Também chamado Judas (não o Iscariotes). Pouco citado.', 'Perguntou por que Jesus se manifestaria aos discípulos e não ao mundo.'],
        leituras: [{ id: 'dc-tadeu-l1', ref: 'João 14:22-24', desc: 'A pergunta de Judas (não o Iscariotes)', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-tadeu-q1', tipo: 'interpretacao', texto: 'O que a resposta de Jesus liga entre amor e obediência?' },
          { id: 'dc-tadeu-q2', tipo: 'aplicacao', texto: 'Como o seu amor por Jesus aparece na sua obediência?' },
        ],
      },
      {
        id: 'dc-simao', titulo: 'Simão, o Zelote', numero: 'O radical transformado',
        contexto: ['Zelote — provavelmente ligado ao movimento nacionalista contra Roma.', 'Jesus reúne no mesmo grupo um zelote e um publicano (Mateus): o Evangelho une opostos.'],
        leituras: [{ id: 'dc-simao-l1', ref: 'Lucas 6:12-16', desc: 'A escolha dos Doze', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-simao-q1', tipo: 'interpretacao', texto: 'O que significa Jesus unir um zelote e um publicano no mesmo time?' },
          { id: 'dc-simao-q2', tipo: 'aplicacao', texto: 'Que divisão (política, social) o Evangelho pede que você atravesse?' },
        ],
      },
      {
        id: 'dc-judas', titulo: 'Judas Iscariotes', numero: 'O que se perdeu',
        contexto: ['Tesoureiro do grupo; amava o dinheiro. Traiu Jesus por 30 moedas.', 'Um alerta solene: é possível estar perto de Jesus sem segui-lo de verdade.'],
        leituras: [{ id: 'dc-judas-l1', ref: 'Mateus 26:14-16, 47-50', desc: 'A traição', tag: 'leitura' }],
        perguntas: [
          { id: 'dc-judas-q1', tipo: 'interpretacao', texto: 'O que o caso de Judas ensina sobre estar perto de Jesus sem crer nele?' },
          { id: 'dc-judas-q2', tipo: 'aplicacao', texto: 'Que amor (ao dinheiro, à aparência) você precisa examinar no seu coração?' },
          { id: 'dc-judas-q3', tipo: 'oracao', texto: 'Peça a Deus um coração verdadeiro, não apenas religioso.' },
        ],
      },
      {
        id: 'dc-missao', titulo: 'De discípulos a apóstolos', numero: 'A missão',
        contexto: ['Matias substituiu Judas (Atos 1). Cheios do Espírito, os mesmos homens fracos viraram testemunhas corajosas.', 'A maioria morreu mártir por não negar o que viram: Jesus vivo.'],
        leituras: [
          { id: 'dc-missao-l1', ref: 'Mateus 28:16-20', desc: 'A Grande Comissão', tag: 'leitura' },
          { id: 'dc-missao-l2', ref: 'Atos 2:1-4, 14-41', desc: 'Pentecostes', tag: 'leitura' },
        ],
        perguntas: [
          { id: 'dc-missao-q1', tipo: 'observacao', texto: 'O que muda nos discípulos entre os evangelhos e Atos 2?' },
          { id: 'dc-missao-q2', tipo: 'pratica', texto: 'Escreva o nome de uma pessoa e comece a orar por ela e a testemunhar.' },
        ],
      },
    ],
  },
];
