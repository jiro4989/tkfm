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
requires "nigui >= 0.1.1"
