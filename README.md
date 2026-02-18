# 🌆 Portfolio Cyberpunk — Next.js + Three.js

Portfolio 3D interativo com estética cyberpunk, cidade animada em WebGL e suporte bilíngue PT/EN.

---

## 🚀 Instalação

```bash
# 1. Entre na pasta
cd portfolio-cyberpunk

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 4. Acesse
# http://localhost:3000
```

---

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Root layout + providers
│   └── page.tsx            # Página principal
│
├── components/
│   ├── 3d/
│   │   ├── Building.tsx    # Prédio 3D com janelas, antenas e neon
│   │   ├── CityScene.tsx   # Cena completa: prédios, partículas, chão
│   │   └── CityCanvas.tsx  # Canvas wrapper (client-only)
│   │
│   ├── sections/
│   │   ├── Hero.tsx        # Seção inicial com título glitch
│   │   ├── About.tsx       # Sobre mim com avatar animado
│   │   ├── Skills.tsx      # Barras de habilidades animadas
│   │   ├── Projects.tsx    # Cards de projetos com hover
│   │   ├── Experience.tsx  # Timeline profissional
│   │   └── Contact.tsx     # Formulário + links de contato
│   │
│   └── ui/
│       ├── Cursor.tsx      # Cursor neon customizado
│       ├── Navbar.tsx      # Nav com scroll behavior + lang toggle
│       ├── Divider.tsx     # Separador entre seções
│       └── Footer.tsx      # Rodapé
│
├── hooks/
│   └── useMousePosition.ts # Hook para posição do mouse
│
├── lib/
│   └── lang.tsx            # Context + hook para PT/EN
│
└── styles/
    └── globals.css         # Variáveis CSS, animações, utilitários
```

---

## ✏️ Como Personalizar

### Trocar nome e dados
- **`src/components/sections/Hero.tsx`** — nome, subtítulo, stats
- **`src/components/sections/About.tsx`** — texto sobre mim, iniciais do avatar
- **`src/components/sections/Skills.tsx`** — skills e percentuais
- **`src/components/sections/Projects.tsx`** — meus projetos reais
- **`src/components/sections/Experience.tsx`** — experiências profissionais
- **`src/components/sections/Contact.tsx`** — e-mail e links

### Mudar a cidade 3D
- **`src/components/3d/CityScene.tsx`** — array `BUILDINGS` para adicionar/mover prédios
- **`src/components/3d/Building.tsx`** — detalhes dos prédios (janelas, antenas, neon)
- **`src/components/3d/CityCanvas.tsx`** — posição da câmera e velocidade de rotação

### Alterar cores do tema
Em **`src/styles/globals.css`**, edite as variáveis:
```css
:root {
  --cyan:    #00f5ff;   /* cor principal */
  --magenta: #ff006e;   /* cor de destaque */
  --yellow:  #ffe600;   /* cor terciária */
}
```

---

## 📦 Dependências Principais

| Pacote | Uso |
|--------|-----|
| `next` | Framework React |
| `@react-three/fiber` | React renderer para Three.js |
| `@react-three/drei` | Helpers 3D (Stars, OrbitControls, Float…) |
| `three` | Biblioteca 3D WebGL |
| `framer-motion` | Animações de UI (opcional) |
| `react-intersection-observer` | Scroll reveal |

---

## 🌐 Deploy na Vercel

```bash
npm run build
# ou conecte o repositório diretamente na Vercel
```

---

## 📱 Responsividade

Para adaptar ao mobile, adicione breakpoints nos componentes de seção.
Recomendado desativar o canvas 3D em dispositivos com `window.innerWidth < 768` para performance.

```tsx
// Em CityCanvas.tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
if (isMobile) return null
```
