# Plan de lancement — Afroicons v0.3

Vérifié le 29/10/2026 : les noms `afroicons` et `afroicons-react` sont **libres sur npm**.
À noter : un pack payant « Afro React Icons » (5 icônes) existe sur Gumroad. Le nom est différent, mais proche.

## 1. GitHub (15 min)
- [ ] Créer le dépôt public `afroicons` (compte perso ou organisation `afroicons`)
- [ ] Remplacer `OWNER` par le compte dans `packages/*/package.json`
- [ ] `git init && git add . && git commit -m "Afroicons v0.3.0" && git branch -M main`
- [ ] `git remote add origin git@github.com:OWNER/afroicons.git && git push -u origin main`
- [ ] Réglages > Pages > Source : **GitHub Actions** (le site se publie tout seul via `pages.yml`)
- [ ] Ajouter les topics : `icons`, `svg`, `africa`, `react`, `icon-set`

## 2. npm (10 min)
- [ ] Créer un compte sur npmjs.com, activer la double authentification
- [ ] Créer un token *Granular* avec le droit « publish » et l'ajouter dans GitHub > Settings > Secrets > `NPM_TOKEN`
- [ ] `git tag v0.3.0 && git push --tags` : le workflow `release.yml` teste puis publie les deux paquets
- [ ] Ou, en local : `npm test`, puis `npm publish --access public` dans chaque dossier `packages/*`

## 3. Domaine : afroicons.org
- [ ] Acheter `afroicons.org` chez un registrar (Gandi, OVH, Namecheap, Cloudflare…), et `afroicons.com` si possible pour le rediriger
- [ ] Dans GitHub > Settings > Pages, saisir `afroicons.org` comme domaine personnalisé (le fichier `apps/web/public/CNAME` le contient aussi)
- [ ] Chez le registrar, ajouter les enregistrements DNS :
  - `A` @ → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  - `AAAA` @ → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
  - `CNAME` www → `OWNER.github.io`
- [ ] GitHub > Settings > Pages : vérifier le domaine, puis cocher **Enforce HTTPS**
- [ ] Recommandé : GitHub > Settings (compte) > Pages > *Verified domains* pour empêcher toute usurpation du domaine
- [ ] `afroicons.com` → redirection 301 vers `https://afroicons.org`

## 4. Licence
- MIT est le choix par défaut (comme Heroicons). Utilisation libre, y compris commerciale, sans obligation de citer la source hors fichier de licence.
- Alternative : CC BY 4.0 si vous voulez **obliger** une mention « Afroicons » partout où les icônes sont utilisées.
- Les symboles traditionnels (adinkra, croix touarègue…) sont des formes du patrimoine commun ; seuls les dessins sont sous licence.

## 5. Annonce
- [ ] Post LinkedIn / X avec une vidéo de l'atelier de motifs (vous pouvez filmer votre écran)
- [ ] Soumettre sur Product Hunt, Hacker News (« Show HN »), r/webdev, communautés tech africaines (Dev Cameroon, GDG, Africa's Talking…)
- [ ] Ouvrir les premières *issues* à partir des idées les plus votées de la boîte à idées
- [ ] Prochaine étape produit : plugin Figma, police d'icônes, version « remplie » (solid)
