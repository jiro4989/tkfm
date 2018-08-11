#!/bin/bash

# build.sh はQTアプリをデプロイするスクリプト
#
# 概要
#   Docker内部から呼び出される想定です。
#   docker runに本スクリプトを渡すと
#   docker内でこのスクリプトを実行して
#   実行可能バイナリを生成します。
# 引数
#   target_dir
#     ビルド対象のソースコードの存在するディレクトリ
#     引数に渡すのはtkfm配下のディレクトリでtkfmは省略
#     渡さなければtkfm直下でqtdeployを実行します。

target_dir=$1

if [ -z "$target_dir" ]; then
  cd $GOPATH/src/github.com/jiro4989/tkfm
else
  cd $GOPATH/src/github.com/jiro4989/tkfm/$target_dir
fi
qtdeploy
