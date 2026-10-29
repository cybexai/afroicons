# Plan de lancement — Afroicons v0.3

Vérifié le 29/10/2026 : les noms `afroicons` et `afroicons-react` sont **libres sur npm**.
À noter : un pack payant « Afro React Icons » (5 icônes) existe sur Gumroad. Le nom est différent, mais proche.

## 1. GitHub (15 min)
- [ ] Créer le dépôt public `afroicons` (compte perso ou organisation `afroicons`)
- [ ] Remplacer `OWNER` par le compte dans `packages/*/package.json`
- [ ] `git init && git add . && git commit -m "Afroicons v0.3.0" && git branch -M main`
- [ ] `git remote add origin git@github.com:OWNER/afroicons.git && git push -u origin main`
- [ ] AWS Amplify > *Host web app* > GitHub > `cybexai/afroicons`, branche `main` : la configuration est lue dans `amplify.yml`, le site se republie à chaque push
- [ ] Ajouter les topics : `icons`, `svg`, `africa`, `react`, `icon-set`

## 2. npm (10 min)
- [ ] Créer un compte sur npmjs.com, activer la double authentification
- [ ] Créer un token *Granular* avec le droit « publish » et l'ajouter dans GitHub > Settings > Secrets > `NPM_TOKEN`
- [ ] `git tag v0.3.0 && git push --tags` : le workflow `release.yml` teste puis publie les deux paquets
- [ ] Ou, en local : `npm test`, puis `npm publish --access public` dans chaque dossier `packages/*`

## 3. Domaine : afroicons.org
- [ ] Acheter `afroicons.org` chez un registrar (Gandi, OVH, Namecheap, Cloudflare…), et `afroicons.com` si possible pour le rediriger
- [ ] AWS Amplify > *Hosting* > *Custom domains* : ajouter `afroicons.org` (et `www`)
- [ ] Chez le registrar, ajouter les enregistrements DNS indiqués par Amplify (ou laisser Amplify les créer si le domaine est sur Route 53)
- [ ] Attendre la validation du certificat SSL émis par Amplify (HTTPS automatique)
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
