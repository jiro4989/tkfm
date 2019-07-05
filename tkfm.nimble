# Package

version       = "0.1.0"
author        = "jiro4989"
description   = "A new awesome nimble package"
license       = "MIT"
srcDir        = "src"
bin           = @["tkfm"]
binDir        = "bin"

import strformat

# Dependencies

requires "nim >= 0.20.0"
requires "ipu >= 3.0.0"

task bb, "Build":
  exec "nim c -d:release -o:bin/tkfm --dynlibOverride:iup -L:lib/iup/libiup.a -L:lib/iup/libiupcd.a -L:lib/iup/libiupim.a src/tkfm.nim"

task setup, "Setup":
  rmDir "lib"
  mkDir "lib/iup"
  let fn = "iup-3.27_Linux415_64_lib.tar.gz"
  exec &"wget https://jaist.dl.sourceforge.net/project/iup/3.27/Linux%20Libraries/{fn} -O lib/iup/{fn}"
  withDir "lib/iup":
    exec &"tar xzf {fn}"
