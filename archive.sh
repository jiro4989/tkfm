#!/bin/bash

# releases配下のディレクトリを圧縮する。
#
# windows向けのディレクトリの場合はzip圧縮をする。
# それ以外の環境向けの場合はtar.gz圧縮する。

set -eu

cd release
for dir in *; do
  cp ../README.* "$dir/"

  echo -n "Archive $dir ... "
  if [[ "$dir" =~ .*win.* ]]; then
    zip -q -r "$dir"{.zip,}
  else
    tar czf "$dir"{.tar.gz,}
  fi
  echo "Done"
done
