# replace version
cd alist-web
version=$(git describe --abbrev=0 --tags)
sed -i -e "s/\"version\": \"0.0.0\"/\"version\": \"$version\"/g" package.json
cat package.json

# build
pnpm install
pnpm i18n:release
wget https://crowdin.com/backend/download/project/alist/zh-CN.zip // [!code ++]
unzip zh-CN.zip // [!code ++]
wget https://crowdin.com/backend/download/project/alist/zh-TW.zip // [!code ++]
unzip zh-TW.zip // [!code ++]
wget https://crowdin.com/backend/download/project/alist/ja.zip // [!code ++]
unzip ja.zip // [!code ++]
node ./scripts/i18n.mjs // [!code ++]
rm zh-CN.zip // [!code ++]
rm zh-TW.zip // [!code ++]
rm ja.zip // [!code ++]

pnpm build
cp -r dist ../
cd ..

# commit to web-dist
cd web-dist
rm -rf dist
cp -r ../dist .
git add .
git config --local user.email "i@nn.ci"
git config --local user.name "Noah Hsu"
git commit --allow-empty -m "upload $version dist files" -a
git tag -a $version -m "release $version"
cd ..

mkdir compress
tar -czvf compress/dist.tar.gz dist/*
zip -r compress/dist.zip dist/*
