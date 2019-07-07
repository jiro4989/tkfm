const $ = (q) => document.querySelector(q);

function removeAllChildren(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

// documentにドラッグされた場合 / ドロップされた場合
// ドラッグ＆ドロップイベントを定義する時は事前準備として必要
document.ondragover = document.ondrop = function (event) {
    event.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
    return false;
};

// 画像選択リストに画像ファイルをドラッグ＆ドロップしたときのイベント
const imageFileSelect = $('#imageFileSelect');
imageFileSelect.ondragover = () => false;
imageFileSelect.ondragleave = imageFileSelect.ondragend = () => false;
imageFileSelect.ondrop = function (event) {
    event.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする

    removeAllChildren(imageFileSelect);
    for (let file of event.dataTransfer.files) {
        let option = document.createElement('option');
        option.value = file.path;
        option.text = file.path;
        imageFileSelect.appendChild(option);
    }

    return false;
}

// 画像ファイルselectを選択したときに、トリミング用キャンバスに画像を描画する。
// 画像を描画する際には、キャンバスサイズを画像サイズに合わせて拡縮する。
const canvas = $('#trimPreviewCanvas');
const ctx = canvas.getContext("2d");
const focus = $('#focusLayerCanvas');
imageFileSelect.onchange = (event) => {
    const img = new Image();
    const idx = imageFileSelect.selectedIndex;
    const item = imageFileSelect.children[idx];
    img.src = item.value;
    img.onload = function () {
        const w = this.naturalWidth;
        const h = this.naturalHeight;
        canvas.setAttribute('width', w.toString());
        canvas.setAttribute('height', h.toString());
        focus.setAttribute('width', w.toString());
        focus.setAttribute('height', h.toString());
        ctx.drawImage(img, 0, 0, w, h);
    }
}

let moveFlag = false;
const trimWidth = 144;
const trimHeight = 144;
let trimRect = {
    x: 0,
    y: 0,
    width: trimWidth,
    height: trimHeight
}

/**
 * moveFocus はトリミング位置のレイヤーを移動する。
 * 上下左右のレイヤを更新し、トリミング位置だけcanvas描画を消す。
 * @param {*} state 
 */
function moveFocus(event) {
    event.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
    console.log(event);

    if (!moveFlag) return false;

    const context = focus.getContext("2d");
    context.clearRect(0, 0, focus.width, focus.height);

    const x = event.offsetX - trimWidth / 2;
    const y = event.offsetY - trimHeight / 2;
    const layer = Util.calcLayerRects(
        x,
        y,
        trimWidth, // TODO
        trimHeight, // TODO
        focus.width,
        focus.height);

    // 上下左右の位置を描画
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    const fill = (r) => context.fillRect(r.x, r.y, r.width, r.height);
    const bgRect = layer.backgroundRects;
    fill(bgRect.top);
    fill(bgRect.right);
    fill(bgRect.bottom);
    fill(bgRect.left);

    // トリミング位置のcanvas描画を削除
    const foc = layer.focusRect;
    context.clearRect(foc.x, foc.y, foc.width, foc.height);
    trimRect = foc;
    return false;
}

canvas.onmousedown = focus.onmousedown = function (event) {
    moveFlag = true;
}
canvas.onmouseup = focus.onmouseup = function (event) {
    moveFlag = false;
}
canvas.onmousemove = moveFocus;
focus.onmousemove = moveFocus;

const outputCanvas = $('#outputPreviewCanvas');
outputCanvas.onclick = function (event) {
    console.log("onclick");
    // クリックした位置を判定してトリミングした画像を貼り付ける。
}

// //html内の要素取得とリスナーの設定
// document.querySelector("#openFile").addEventListener('click', () => {
//     openFile();
// })

// document.querySelector("#saveFile").addEventListener('click', () => {
//     saveFile();
// })

// const preview = document.getElementById('preview');

// //openFileボタンが押されたとき（ファイル名取得まで）
// function openFile() {
//     const win = BrowserWindow.getFocusedWindow();
//     dialog.showOpenDialog(
//         win, {
//             properties: ['openFile'],
//             filters: [{
//                 name: 'Document',
//                 extensions: ['csv', 'txt']
//             }]
//         },
//         (fileNames) => {
//             if (fileNames) {
//                 // alert(fileNames[0]);
//                 readFile(fileNames[0]); //複数選択の可能性もあるので配列となる。
//             }
//         }
//     )
// }

// //指定したファイルを読み込む
// function readFile(path) {
//     fs.readFile(path, (error, data) => {
//         if (error != null) {
//             alert("file open error.");
//             return;
//         }
//         preview.textContent = data.toString();
//     })
// }

// //saveFileボタンが押されたとき
// function saveFile() {
//     const win = BrowserWindow.getFocusedWindow();
//     dialog.showSaveDialog(
//         win, {
//             properties: ['openFile'],
//             filters: [{
//                 name: 'Documents',
//                 extensions: ['csv', 'txt']
//             }]
//         },
//         (fileName) => {
//             if (fileName) {
//                 const data = preview.textContent;
//                 console.log(data);
//                 writeFile(fileName, data);
//             }
//         }
//     )
// }

// //fileを保存（Pathと内容を指定）
// function writeFile(path, data) {
//     fs.writeFile(path, data, (error) => {
//         if (error != null) {
//             alert("save error.");
//             return;
//         }
//     })
// }