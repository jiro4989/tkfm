# tkfm

TKoolFacetileMakerのGo言語移植

## コンパイル方法

下記のコマンドを実行する

```bash
# ビルド用のコンテナを起動してデプロイスクリプトを実行する
make bc deploy
```

コンテナ起動済みの場合は`make`だけでよい。

## 成果物

deployディレクトリが生成されて、その配下にtkfmというバイナリが生成される。

iupを使っています。

 npm -g i electron electron-packager
