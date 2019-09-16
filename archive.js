const fs = require("fs")
const execSync = require('child_process').execSync

const app = "tkfm"
const arch = "x64"

// TravisCIの環境変数の値をelectron-packagerで使われる名称に変換
let os = process.env.TRAVIS_OS_NAME

// TravisCIの環境変数の設定されていないローカルで動作確認する時用に
if (!os) {
  os = "linux"
}

switch (os) {
  case "windows":
    os = "win32"
    break
  case "osx":
    os = "darwin"
    break
}
const dst = `${app}-${os}-${arch}`

process.chdir("release")
fs.copyFileSync("../README.md", `${dst}/README.md`)

// OSに合わせた圧縮コマンドのセット
let archiveCmd = `tar czf ${dst}.tar.gz ${dst}`
if (process.env.TRAVIS_OS_NAME === "windows") {
  archiveCmd = `zip -r ${dst}.zip ${dst}`
}

execSync(archiveCmd)
