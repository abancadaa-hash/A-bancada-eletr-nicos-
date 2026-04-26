# A Bancada Eletrônicos 🛍️
**Tecnologia prática, sem complicações.**
Site oficial da loja A Bancada Eletrônicos — Luanda, Angola.

---

## 🚀 Como publicar no Vercel (passo a passo)

### PASSO 1 — Cria uma conta GitHub
1. Vai a **github.com**
2. Clica em **Sign up**
3. Cria a tua conta gratuita

### PASSO 2 — Cria um repositório e faz upload dos ficheiros
1. Faz login no GitHub
2. Clica no **+** (canto superior direito) → **New repository**
3. Nome: `a-bancada-eletronicos`
4. Deixa como **Public** e clica **Create repository**
5. Clica em **uploading an existing file**
6. Arrasta TODOS os ficheiros desta pasta (excepto `node_modules`)
7. Clica **Commit changes**

### PASSO 3 — Publica no Vercel
1. Vai a **vercel.com**
2. Clica **Sign up** → escolhe **Continue with GitHub**
3. Clica **Add New Project**
4. Selecciona o repositório `a-bancada-eletronicos`
5. Em **Framework Preset** selecciona **Vite**
6. Clica **Deploy**
7. Aguarda 1-2 minutos ✅

### PASSO 4 — O teu site está online!
O Vercel dá-te um link tipo:
`https://a-bancada-eletronicos.vercel.app`

Partilha esse link com os teus clientes! 🎉

---

## 🌐 Domínio próprio (opcional)
Para teres `abancada.com` ou `abancada.ao`:
1. Compra o domínio em **namecheap.com** (~$10/ano)
2. No Vercel, vai a **Settings → Domains**
3. Adiciona o teu domínio e segue as instruções

---

## 🛠️ Painel de Administração
- **Como aceder:** Clica **3 vezes seguidas** no logo "A Bancada"
- **Senha:** `bancada2024`
- **O que podes fazer:**
  - ✅ Adicionar novos produtos
  - ✅ Editar nome, preço, descrição, estado
  - ✅ Adicionar fotos de capa e galeria
  - ✅ Marcar produto como disponível ou "em breve"
  - ✅ Remover produtos

---

## 📁 Estrutura do projecto
```
bancada-site/
├── index.html          ← Página principal
├── package.json        ← Configuração do projecto
├── vite.config.js      ← Configuração do Vite
├── vercel.json         ← Configuração do Vercel
├── .gitignore          ← Ficheiros ignorados
└── src/
    ├── main.jsx        ← Ponto de entrada
    └── App.jsx         ← Todo o site
```

---

## ✏️ Como actualizar o site
Sempre que precisares de mudanças (novos produtos, preços, cores):
1. Fala com o Claude no **claude.ai**
2. Pede a alteração
3. Substitui o ficheiro `App.jsx` no GitHub pelo novo
4. O Vercel actualiza automaticamente em segundos ⚡

---

*Desenvolvido com Claude AI · A Bancada Eletrônicos © 2025*
