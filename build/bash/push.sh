#!/bin/bash
node build/node/push/index.js
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
echo >> package.json
git add --all
git commit -m "$PACKAGE_VERSION"
git push git@github.com:ariiiman/copper-front.git
#git push --set-upstream git@github.com:ariiiman/copper-front.git master
