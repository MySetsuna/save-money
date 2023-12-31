#!/usr/bin/env sh

# 发生错误时终止
set -e

#移除dist
yarn run rimraf dist

# 先进行测试
# yarn run coverage

# 构建
yarn run build:gh

# 进入构建文件夹
cd dist

# 放置 .nojekyll 以绕过 Jekyll 的处理。
echo > .nojekyll

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# 如果你要部署在 https://MySetsuna.github.io
git push -f git@github.com:MySetsuna/save-money.git main:gh-pages

cd -