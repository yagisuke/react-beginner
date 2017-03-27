# 以前のバージョンのクリーンアップ
rm -rf __deployme
mkdir __deployme

# ビルド
sh scripts/build.sh

# JavaScriptのminify
uglify -s bundle.js -o __deployme/bundle.js

# CSSのminify
csshrink bundle.css > __depolyme/bundle.css

# HTMLと画像のコピー
cp index.html __deployme/index.html
cp -r images/ __deployme/images/

# 完了
date; echo;
