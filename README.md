# Santidade · Diário ✦

**App no ar:** https://robsonfulaneti-lgtm.github.io/santidade/

PWA de hábitos diários com calendário mensal. Feito para viver **no celular** (local-first): os dados ficam no `localStorage` do aparelho. Não precisa de servidor — está hospedado no GitHub Pages, com endereço fixo.

## Atualizar o app

```
publicar.bat
```

Envia a `main` e publica a pasta `public/` na branch `gh-pages` (que o GitHub Pages serve). Em 1–2 minutos está no ar; no celular o app troca de versão sozinho ao abrir e fechar.

> Ao mudar qualquer arquivo de `public/`, **incremente a versão do cache** em `public/sw.js` (`santidade-vN`), senão o service worker continua servindo a versão antiga.

## O que o app tem

**Aba Calendário** — hábitos registrados por dia:

- 📖 **Li a Bíblia** — com campo de texto do que leu
- ⏳ **Jejum** — com campo de horas
- 📚 **Li 1 capítulo de livro** — com campo de texto
- 🙏 **Momento de oração**

**Aba Estudos** — vários registros por dia, cada um com **livro**, **capítulo** e **o que entendi**, agrupados por data e com horário.

Além disso: lista de **📕 livros terminados**, sequência de dias (🔥 streak) e **exportar/importar backup** em JSON.

## Rodar localmente (opcional — só para desenvolver)

O servidor Node é **opcional**: serve os arquivos e guarda uma cópia dos dados em `data.json`. O app funciona sem ele.

Requisitos: [Node.js](https://nodejs.org) e, para acesso pelo celular via túnel, o [cloudflared](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe) (salve como `cloudflared.exe` na raiz).

```
iniciar.bat
```

Ou manualmente:

```powershell
node server.js                                     # http://localhost:5173
.\cloudflared.exe tunnel --url http://localhost:5173   # URL https pública
```

Abra a URL `https://...trycloudflare.com` no celular → menu do navegador → **Adicionar à tela inicial**. Depois de instalado, o app funciona offline para sempre; o servidor só é necessário para instalar (a URL do túnel muda a cada reinício).

### Se o link não abrir

O túnel rápido da Cloudflare é instável: o processo pode morrer sozinho (o endereço passa a responder **530**) e às vezes o DNS do subdomínio demora ou nem chega a ser publicado. Nesses casos:

1. Confira se o servidor está de pé: `curl http://localhost:5173` deve responder 200.
2. Reinicie só o túnel — ele gera um endereço novo.
3. Se a Cloudflare estiver fora do ar, use `iniciar-alternativo.bat` (localtunnel). Ele pede uma senha na primeira visita, que é o IP público do PC.

Sempre teste o endereço novo antes de usá-lo no celular — `nslookup` dá falso positivo, prefira uma requisição HTTP de verdade.

## Estrutura

```
server.js            servidor Node sem dependências (estáticos + API /api/entries e /api/books)
public/              app (HTML/CSS/JS puro, service worker, manifest, ícones)
gen-icons.js         gera os PNGs dos ícones a partir de nada (sem libs)
iniciar.bat          sobe servidor + túnel com um clique
data.json            backup dos dados no PC (não versionado)
```

## Detalhes técnicos

- Sem nenhuma dependência (nem `package.json`) — Node puro no servidor, vanilla JS no cliente.
- `localStorage` é a fonte primária dos dados; o servidor recebe uma cópia quando está acessível.
- Service worker cache-first (`public/sw.js`) — ao mudar assets, **incremente a versão do cache**.
