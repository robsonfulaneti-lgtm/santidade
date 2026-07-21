# Santidade · Diário ✦

PWA de hábitos diários com calendário mensal. Feito para viver **no celular** (local-first): os dados ficam no `localStorage` do aparelho; o servidor é só backup/sync e serve para instalar o app.

## Hábitos registrados por dia

- 📖 **Li a Bíblia** — com campo de texto do que leu
- ⏳ **Jejum** — com campo de horas
- 📚 **Li 1 capítulo de livro** — com campo de texto
- 🙏 **Momento de oração**

Além disso: lista separada de **📕 livros terminados**, sequência de dias (🔥 streak) e **exportar/importar backup** em JSON.

## Como rodar

Requisitos: [Node.js](https://nodejs.org) e, para acesso pelo celular, o [cloudflared](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe) (salve como `cloudflared.exe` na raiz do projeto).

```
iniciar.bat
```

Ou manualmente:

```powershell
node server.js                                     # http://localhost:5173
.\cloudflared.exe tunnel --url http://localhost:5173   # URL https pública
```

Abra a URL `https://...trycloudflare.com` no celular → menu do navegador → **Adicionar à tela inicial**. Depois de instalado, o app funciona offline para sempre; o servidor só é necessário para instalar (a URL do túnel muda a cada reinício).

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
