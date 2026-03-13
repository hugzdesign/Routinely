# 🌿 Routinely — Générateur de routines personnalisées par IA

Une app Next.js qui génère des routines sur mesure grâce à Claude AI.

---

## 🚀 Installation en 5 minutes

### 1. Ouvre le projet dans Cursor

```bash
cd routine-app
code .   # ou ouvre avec Cursor
```

### 2. Installe les dépendances

```bash
npm install
```

### 3. Configure ta clé API Anthropic

```bash
# Copie le fichier d'exemple
cp .env.local.example .env.local
```

Puis ouvre `.env.local` et remplace `sk-ant-XXXXXXXXXXXXXXXX` par ta vraie clé.

**Où trouver ta clé :** https://console.anthropic.com → API Keys → Create Key

### 4. Lance l'app

```bash
npm run dev
```

Ouvre http://localhost:3000 🎉

---

## 📁 Structure du projet

```
routine-app/
├── app/
│   ├── api/
│   │   └── generate-routine/
│   │       └── route.ts        ← API qui appelle Claude
│   ├── globals.css             ← Styles globaux
│   ├── layout.tsx              ← Layout racine
│   └── page.tsx                ← Page principale
├── components/
│   ├── Questionnaire.tsx       ← Formulaire 5 étapes
│   └── RoutineDisplay.tsx      ← Affichage de la routine
├── lib/
│   └── types.ts                ← Types TypeScript
└── .env.local                  ← Clé API (ne pas committer !)
```

---

## 🛠️ Personnalisation avec Cursor

Quelques prompts à utiliser dans Cursor pour étendre l'app :

### Ajouter Stripe (monétisation)
> "Ajoute un système freemium avec Stripe : 1 routine gratuite, puis abonnement 4,99€/mois pour les routines illimitées. Utilise next-auth pour l'authentification."

### Export PDF
> "Ajoute un bouton 'Exporter en PDF' qui génère un beau PDF de la routine avec le logo Routinely en haut."

### Sauvegarder les routines
> "Ajoute une base de données Supabase pour que les utilisateurs puissent sauvegarder leurs routines et y accéder plus tard."

### Mode sombre
> "Ajoute un toggle dark/light mode qui respecte les préférences système."

---

## 🚀 Déploiement sur Vercel (gratuit)

```bash
# Installe Vercel CLI
npm i -g vercel

# Déploie
vercel
```

N'oublie pas d'ajouter `ANTHROPIC_API_KEY` dans les variables d'environnement Vercel.

---

## 💰 Roadmap monétisation

1. **Phase 1** (maintenant) : App gratuite, génération simple
2. **Phase 2** : Freemium — 1 gratuit / illimité à 4,99€/mois
3. **Phase 3** : PDF export, historique, rappels par email
4. **Phase 4** : Plan annuel, programme sur 4 semaines

---

## 📞 Stack technique

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS
- **IA** : Claude claude-sonnet-4-20250514 via SDK Anthropic
- **Fonts** : Playfair Display + DM Sans
- **Déploiement** : Vercel
