#!/usr/bin/env bash
# Publie les six paquets Afroicons sur npm depuis votre ordinateur, en une commande :
#
#   npm run publier
#
# - vérifie la connexion à npm (sinon : connexion par le navigateur) ;
# - lance les tests, qui reconstruisent aussi les paquets (Angular compris) ;
# - publie chaque paquet dont la version n'est pas encore sur npm, et passe les autres.
# La double authentification se valide dans le navigateur : npm ouvre (ou affiche) un lien à chaque paquet.
set -euo pipefail
cd "$(dirname "$0")/.."

VERSION=$(node -p 'require("./package.json").version')
PAQUETS=(packages/afroicons packages/afroicons-react packages/afroicons-ui packages/afroicons-angular/dist packages/afroicons-mui packages/afroicons-antd)

echo "▶ Afroicons $VERSION"
if ! npm whoami >/dev/null 2>&1; then
  echo "▶ Connexion à npm (une page s'ouvre dans le navigateur)…"
  npm login --auth-type=web
fi
echo "▶ Connecté en tant que $(npm whoami)"

echo "▶ Tests et construction des paquets…"
npm test >/dev/null
for d in packages/afroicons packages/afroicons-react packages/afroicons-ui packages/afroicons-angular packages/afroicons-angular/dist packages/afroicons-mui packages/afroicons-antd; do cp LICENSE "$d/"; done
echo "✔ Tests réussis"

publies=() ; passes=() ; echecs=()
for d in "${PAQUETS[@]}"; do
  nom=$(node -p "require('./$d/package.json').name")
  version=$(node -p "require('./$d/package.json').version")
  if [ "$(npm view "$nom@$version" version 2>/dev/null)" = "$version" ]; then
    echo "• $nom@$version : déjà sur npm, je passe"
    passes+=("$nom")
    continue
  fi
  echo "▶ $nom@$version : publication (validez dans le navigateur)…"
  if (cd "$d" && npm publish --access public --auth-type=web); then publies+=("$nom"); else echecs+=("$nom"); fi
done

echo
echo "Publiés : ${publies[*]:-aucun}"
echo "Déjà à jour : ${passes[*]:-aucun}"
if [ ${#echecs[@]} -gt 0 ]; then echo "✘ Échecs : ${echecs[*]} — relancez « npm run publier » : les paquets déjà publiés seront passés."; exit 1; fi
echo "✔ Les six paquets sont en $VERSION sur npm."
