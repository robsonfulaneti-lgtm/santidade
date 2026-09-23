/* ============================================================
   PROVÉRBIOS — os 31 capítulos (um por dia do mês).
   Cada capítulo: n, t (tema), a (autor/coleção), ref e v
   (versículo-chave, Almeida Revista e Atualizada), p (sobre o
   capítulo), q (pergunta para refletir).
   ============================================================ */

window.PROVERBIOS = {
  intro: 'Provérbios é o manual de sabedoria prática da Bíblia: como viver bem diante de Deus no trabalho, na fala, no dinheiro, nas amizades e na família. A maior parte é de Salomão, com coleções de outros sábios. São 31 capítulos — ler um por dia do mês é uma forma clássica de estudá-lo. O fio que amarra tudo: "o temor do Senhor é o princípio do saber".',
  blocos: [
    { id: 'pv1', nome: 'O chamado da sabedoria', faixa: 'Capítulos 1–9', cor: 'violeta', de: 1, ate: 9,
      resumo: 'Discursos de um pai ao filho: por que buscar a sabedoria acima de tudo.' },
    { id: 'pv2', nome: 'Provérbios de Salomão', faixa: 'Capítulos 10–22', cor: 'ouro', de: 10, ate: 22,
      resumo: 'Ditos curtos em contraste: justo e perverso, diligente e preguiçoso.' },
    { id: 'pv3', nome: 'Palavras dos sábios', faixa: 'Capítulos 23–24', cor: 'esmeralda', de: 23, ate: 24,
      resumo: 'Conselhos práticos de outros sábios (a coleção começa em 22:17).' },
    { id: 'pv4', nome: 'Copiados no tempo de Ezequias', faixa: 'Capítulos 25–29', cor: 'azul', de: 25, ate: 29,
      resumo: 'Mais provérbios de Salomão, reunidos séculos depois pelos homens do rei Ezequias.' },
    { id: 'pv5', nome: 'Agur e Lemuel', faixa: 'Capítulos 30–31', cor: 'rosa', de: 30, ate: 31,
      resumo: 'A oração de Agur e a mulher virtuosa: o livro termina no temor do Senhor.' },
  ],
  lista: [
    // ---------- O chamado da sabedoria (1–9) ----------
    { n:1, t:'O princípio do saber', ref:'Pv 1:7', v:'"O temor do Senhor é o princípio do saber."',
      p:'Abre dizendo para que o livro existe: dar sabedoria, disciplina e discernimento aos simples e aos jovens. Logo vem o primeiro alerta do pai ao filho — não se juntar a quem ganha a vida com violência — e a Sabedoria aparece clamando nas praças, avisando quem a despreza.',
      q:'Quem são as vozes que mais influenciam suas decisões hoje? Elas te levam para perto ou para longe do temor do Senhor?' },
    { n:2, t:'Buscar como a um tesouro', ref:'Pv 2:6', v:'"Porque o Senhor dá a sabedoria, da sua boca vem a inteligência e o entendimento."',
      p:'A sabedoria não cai do céu para o preguiçoso: é preciso buscá-la como prata e tesouro escondido. Mas quem busca descobre que ela é presente de Deus — e ela guarda do homem perverso e da mulher que abandona a aliança.',
      q:'Quanto do seu tempo você investe buscando sabedoria, comparado ao que investe em coisas passageiras?' },
    { n:3, t:'Confia no Senhor', ref:'Pv 3:5-6', v:'"Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento."',
      p:'Um dos capítulos mais conhecidos da Bíblia: confiar em Deus em vez de na própria esperteza, honrá-lo com os bens e as primícias, e aceitar a disciplina dele como sinal de amor de Pai. A sabedoria vale mais que prata e ouro.',
      q:'Em que decisão atual você está se apoiando mais no seu entendimento do que em Deus?' },
    { n:4, t:'Guarda o teu coração', ref:'Pv 4:23', v:'"Sobre tudo o que se deve guardar, guarda o coração, porque dele procedem as fontes da vida."',
      p:'O pai passa adiante o que aprendeu com o próprio pai: adquira sabedoria acima de tudo. Dois caminhos: o dos justos, que brilha cada vez mais como a luz da aurora, e o dos perversos, que é escuridão. Termina com um chamado a vigiar coração, boca, olhos e pés.',
      q:'O que tem entrado no seu coração pelos olhos e ouvidos nesta semana?' },
    { n:5, t:'Fidelidade no casamento', ref:'Pv 5:18', v:'"Seja bendito o teu manancial, e alegra-te com a mulher da tua mocidade."',
      p:'Um alerta direto contra o adultério: a sedução parece doce como mel, mas termina amarga como absinto. A resposta não é só "não pecar", mas encontrar alegria dentro da aliança do casamento. Os caminhos do homem estão diante dos olhos do Senhor.',
      q:'Que proteções práticas você mantém para guardar a fidelidade (no casamento ou na pureza)?' },
    { n:6, t:'Vai ter com a formiga', ref:'Pv 6:6', v:'"Vai ter com a formiga, ó preguiçoso, considera os seus caminhos e sê sábio."',
      p:'Avisos práticos: não ser fiador de dívidas alheias, vencer a preguiça observando a formiga, reconhecer o homem perverso, e a lista das "seis coisas que o Senhor aborrece, e a sétima a sua alma abomina" — entre elas a língua mentirosa e quem semeia contendas entre irmãos.',
      q:'Qual das sete coisas que Deus aborrece (vv. 16-19) mais precisa de atenção na sua vida?' },
    { n:7, t:'O jovem sem juízo', ref:'Pv 7:25', v:'"Não se desvie o teu coração para os caminhos dela."',
      p:'Uma cena narrada como um filme: da janela, o pai vê um jovem inexperiente passando perto da casa errada, na hora errada, sendo seduzido passo a passo — "como o boi que vai ao matadouro". O pecado raramente é um salto; é uma sequência de pequenas concessões.',
      q:'Quais são as "esquinas" (lugares, horários, telas) onde você costuma baixar a guarda?' },
    { n:8, t:'A Sabedoria que estava com Deus', ref:'Pv 8:35', v:'"Porque o que me acha acha a vida e alcança favor do Senhor."',
      p:'A Sabedoria fala em primeira pessoa: suas palavras são retas, seu fruto é melhor que ouro. Depois revela que estava com Deus antes da criação, alegrando-se diante dele. Muitos leem aqui um retrato de Cristo, "a sabedoria de Deus" (1 Co 1:24).',
      q:'O que muda em você saber que a sabedoria não é só uma ideia, mas tem a ver com uma Pessoa?' },
    { n:9, t:'Dois banquetes', ref:'Pv 9:10', v:'"O temor do Senhor é o princípio da sabedoria."',
      p:'Fecha a introdução com dois convites iguais na forma e opostos no fim: a Sabedoria prepara um banquete e chama os simples para a vida; a Loucura, barulhenta, oferece "águas roubadas" que parecem doces, mas seus convidados estão na morte. Todo dia escolhemos em qual mesa sentar.',
      q:'Que "águas roubadas" (prazeres escondidos) parecem mais doces para você do que realmente são?' },

    // ---------- Provérbios de Salomão (10–22) ----------
    { n:10, t:'O justo e o perverso', ref:'Pv 10:19', v:'"No muito falar não falta transgressão, mas o que modera os lábios é prudente."',
      p:'Começa a coleção dos provérbios de Salomão: ditos curtos, quase sempre em contraste — justo e perverso, diligente e preguiçoso, quem fala demais e quem sabe calar. Cada versículo é uma lição completa, para ser meditada devagar.',
      q:'Escolha um versículo deste capítulo que te confronta e escreva por quê.' },
    { n:11, t:'Integridade e generosidade', ref:'Pv 11:25', v:'"A alma generosa prosperará, e quem dá a beber será dessedentado."',
      p:'A integridade guia os retos; a balança enganosa é abominação ao Senhor. Com a soberba vem a desonra, mas com os humildes está a sabedoria. E um paradoxo do Reino: quem reparte ainda recebe mais; quem retém além do justo, empobrece.',
      q:'Onde você tem sido "balança enganosa" — mesmo em coisas pequenas?' },
    { n:12, t:'Palavras que ferem ou curam', ref:'Pv 12:18', v:'"Alguém há cuja tagarelice é como pontas de espada, mas a língua dos sábios é medicina."',
      p:'Quem ama a disciplina ama o conhecimento. O justo cuida até dos seus animais. A mão diligente dominará; a preguiçosa será sujeita. E um tema que atravessa o livro: nossas palavras constroem ou destroem.',
      q:'Suas palavras desta semana foram mais "espada" ou "medicina" para quem está perto de você?' },
    { n:13, t:'Diz-me com quem andas', ref:'Pv 13:20', v:'"Quem anda com os sábios será sábio, mas o companheiro dos insensatos se tornará mau."',
      p:'A esperança adiada faz adoecer o coração, mas o desejo cumprido é árvore de vida. Riqueza de origem vã diminui; a juntada aos poucos cresce. O que retém a vara aborrece o filho. E as companhias moldam quem nos tornamos.',
      q:'Quem são as três pessoas com quem você mais convive? Elas te aproximam da sabedoria?' },
    { n:14, t:'Há caminho que parece direito', ref:'Pv 14:12', v:'"Há caminho que ao homem parece direito, mas ao cabo dá em caminhos de morte."',
      p:'A mulher sábia edifica a casa; a insensata a derriba com as próprias mãos. O coração conhece a sua própria amargura. E um aviso sério: nem tudo que parece certo para nós é certo diante de Deus. No temor do Senhor há firme confiança.',
      q:'Existe algo na sua vida que "parece direito" mas você nunca levou honestamente a Deus?' },
    { n:15, t:'A resposta branda', ref:'Pv 15:1', v:'"A resposta branda desvia o furor, mas a palavra dura suscita a ira."',
      p:'Os olhos do Senhor estão em todo lugar. Melhor é o pouco com o temor do Senhor do que grande tesouro com inquietação. Onde não há conselho, fracassam os projetos. E a primeira linha já é uma regra de ouro para qualquer conflito.',
      q:'Pense na última discussão que você teve. Como teria sido com uma "resposta branda"?' },
    { n:16, t:'O Senhor dirige os passos', ref:'Pv 16:9', v:'"O coração do homem traça o seu caminho, mas o Senhor lhe dirige os passos."',
      p:'Planejar não é pecado — mas quem planeja precisa confiar ao Senhor as suas obras. A soberba precede a ruína, e a altivez do espírito, a queda. Melhor é o que domina o seu espírito do que o que toma uma cidade.',
      q:'Que plano seu você precisa confiar a Deus (v. 3) em vez de tentar controlar?' },
    { n:17, t:'O amigo em todo tempo', ref:'Pv 17:17', v:'"Em todo tempo ama o amigo, e na angústia se faz o irmão."',
      p:'Melhor é um bocado seco com tranquilidade do que a casa farta com contendas. Começar a contenda é soltar as águas de uma represa. O coração alegre é bom remédio. E um retrato do verdadeiro amigo: aquele que fica quando tudo aperta.',
      q:'De quem você tem sido "amigo em todo tempo"? Quem precisa de você agora?' },
    { n:18, t:'Morte e vida na língua', ref:'Pv 18:21', v:'"A morte e a vida estão no poder da língua."',
      p:'O solitário busca o seu próprio interesse. Responder antes de ouvir é estultícia e vergonha. Torre forte é o nome do Senhor. E há amigo mais chegado do que um irmão. Nossas palavras têm peso de vida ou de morte.',
      q:'Você costuma responder antes de ouvir até o fim? Como praticar o v. 13 esta semana?' },
    { n:19, t:'O conselho do Senhor permanece', ref:'Pv 19:21', v:'"Muitos propósitos há no coração do homem, mas o desígnio do Senhor permanecerá."',
      p:'Melhor é o pobre que anda na sua integridade do que o perverso de lábios. A discrição torna o homem longânimo, e sua glória é perdoar as injúrias. Quem se compadece do pobre ao Senhor empresta. E no fim, é o plano de Deus que prevalece.',
      q:'Que ofensa você precisa "perdoar" (v. 11) em vez de guardar?' },
    { n:20, t:'Não te vingues', ref:'Pv 20:22', v:'"Não digas: Vingar-me-ei do mal; espera pelo Senhor, e ele te livrará."',
      p:'O vinho é escarnecedor e engana. Dois pesos e duas medidas são abominação ao Senhor. O espírito do homem é a lâmpada do Senhor, que esquadrinha o mais íntimo. E, diante do mal sofrido, a resposta não é vingança, mas esperar em Deus.',
      q:'Há alguém de quem você ainda quer "ir à forra"? O que significaria esperar no Senhor?' },
    { n:21, t:'Justiça mais que sacrifício', ref:'Pv 21:3', v:'"Exercitar justiça e juízo é mais aceitável ao Senhor do que sacrifício."',
      p:'Como ribeiros de águas, o coração do rei está na mão do Senhor. Todo caminho parece reto aos olhos de quem anda nele, mas é Deus quem sonda os corações. Praticar a justiça agrada mais a Deus do que rituais. E não há sabedoria nem conselho contra o Senhor.',
      q:'Sua fé tem se mostrado mais em rituais ou em justiça praticada no dia a dia?' },
    { n:22, t:'Ensina a criança', ref:'Pv 22:6', v:'"Ensina a criança no caminho em que deve andar, e, ainda quando for velho, não se desviará dele."',
      p:'Mais vale o bom nome do que as muitas riquezas. O rico e o pobre se encontram: o Senhor é o criador de ambos. A formação na infância marca a vida inteira. No v. 17 começa uma nova coleção, as "palavras dos sábios".',
      q:'Que "caminho" você está ensinando, com a própria vida, a quem te observa?' },

    // ---------- Palavras dos sábios (23–24) ----------
    { n:23, t:'As riquezas criam asas', ref:'Pv 23:4-5', v:'"Não te fatigues para seres rico... pois, certamente, a riqueza fará para si asas."',
      p:'Palavras dos sábios: cuidado à mesa dos poderosos, não se mate de trabalhar para enriquecer, não remova os limites dos órfãos. A disciplina livra a criança. E um retrato vivo da embriaguez: "Para quem são os ais? Para quem os pesares?".',
      q:'Quanto do seu cansaço hoje vem de correr atrás de coisas que "criam asas"?' },
    { n:24, t:'Sete vezes cai e se levanta', ref:'Pv 24:16', v:'"Porque sete vezes cairá o justo e se levantará."',
      p:'Não inveje os maus. Com a sabedoria edifica-se a casa. Livre os que estão sendo levados para a morte — e não diga "não o sabíamos". O justo não é quem nunca cai, mas quem se levanta. E o campo do preguiçoso, tomado de espinhos, ensina uma lição silenciosa.',
      q:'Em que área você caiu recentemente? Qual é o próximo passo para se levantar?' },

    // ---------- Copiados no tempo de Ezequias (25–29) ----------
    { n:25, t:'A palavra dita a seu tempo', ref:'Pv 25:11', v:'"Como maçãs de ouro em salvas de prata, assim é a palavra dita a seu tempo."',
      p:'Nova coleção: provérbios de Salomão que os homens de Ezequias, rei de Judá, copiaram. A glória de Deus é encobrir as coisas; a dos reis, esquadrinhá-las. Não se exalte na presença do rei. Se o inimigo tiver fome, dá-lhe pão — Paulo cita isso em Romanos 12.',
      q:'Quem precisa ouvir de você uma "palavra dita a seu tempo" — um encorajamento, um perdão?' },
    { n:26, t:'O tolo, o preguiçoso e o maldizente', ref:'Pv 26:20', v:'"Sem lenha, o fogo se apaga; e, não havendo maldizente, cessa a contenda."',
      p:'Uma galeria de retratos a evitar: o insensato que repete a estultícia "como o cão que torna ao seu vômito", o preguiçoso que diz "um leão está no caminho", quem se mete em briga alheia, e o maldizente que sopra o fogo das contendas.',
      q:'Você tem sido "lenha" em alguma contenda? Como parar de alimentá-la?' },
    { n:27, t:'Ferro com ferro se afia', ref:'Pv 27:17', v:'"Como o ferro com o ferro se afia, assim, o homem, ao seu amigo."',
      p:'Não te glories do dia de amanhã, porque não sabes o que ele trará. Leais são as feridas feitas pelo que ama. O amigo verdadeiro afia o outro — às vezes com atrito. E um conselho de prudência: procura conhecer o estado das tuas ovelhas.',
      q:'Quem é o "ferro" que te afia? Você permite que alguém te confronte com amor?' },
    { n:28, t:'Confessar e deixar', ref:'Pv 28:13', v:'"O que encobre as suas transgressões jamais prosperará; mas o que as confessa e deixa alcançará misericórdia."',
      p:'Fogem os perversos sem que ninguém os persiga, mas o justo é intrépido como o leão. Melhor é o pobre que anda na sua integridade. E uma das promessas mais preciosas do livro: há misericórdia para quem para de esconder o pecado e o abandona.',
      q:'Existe algo que você tem "encoberto"? O que seria confessar e deixar?' },
    { n:29, t:'O temor do homem é laço', ref:'Pv 29:25', v:'"Quem teme ao homem arma ciladas, mas o que confia no Senhor está seguro."',
      p:'O homem que muitas vezes repreendido endurece a cerviz será quebrantado de repente. Não havendo profecia, o povo se corrompe. E um alerta atual: viver para agradar as pessoas é uma armadilha; a segurança está em confiar em Deus.',
      q:'Em que decisão você está mais preocupado com a opinião dos outros do que com a de Deus?' },

    // ---------- Agur e Lemuel (30–31) ----------
    { n:30, t:'Nem pobreza nem riqueza', a:'Agur, filho de Jaque', ref:'Pv 30:8', v:'"Não me dês nem a pobreza nem a riqueza; dá-me o pão que me for necessário."',
      p:'Agur começa confessando sua pequenez diante de Deus: toda palavra de Deus é pura. Faz uma das orações mais sábias da Bíblia — nem riqueza que o faça esquecer Deus, nem pobreza que o leve a furtar. Depois observa a criação em listas numéricas: coisas insaciáveis, maravilhosas, pequenas e sábias.',
      q:'Como seria viver o "suficiente" de Agur na sua vida financeira e de consumo?' },
    { n:31, t:'A mulher virtuosa', a:'Rei Lemuel (ensino de sua mãe)', ref:'Pv 31:30', v:'"Enganosa é a graça, e vã, a formosura, mas a mulher que teme ao Senhor, essa será louvada."',
      p:'Uma mãe ensina o filho rei: não se entregue a vícios e abra a boca a favor dos que não têm voz. Depois, um poema acróstico (cada verso começa com uma letra do alfabeto hebraico) sobre a mulher de valor — trabalhadora, generosa, sábia — cuja raiz é o temor do Senhor. O livro termina onde começou: no temor do Senhor.',
      q:'O que a "mulher virtuosa" ensina sobre caráter para qualquer pessoa, homem ou mulher?' },
  ],
};

// Autoria das coleções (os capítulos 30 e 31 já trazem a sua).
for (const c of window.PROVERBIOS.lista) {
  if (!c.a) c.a = (c.n === 23 || c.n === 24) ? 'Palavras dos sábios'
    : (c.n >= 25 && c.n <= 29) ? 'Salomão (copiado pelos homens de Ezequias)' : 'Salomão';
}
