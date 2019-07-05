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

const canvas = $('#trimPreviewCanvas');
const ctx = canvas.getContext("2d");
const focus = $('#focusLayerCanvas');
imageFileSelect.onchange = (event) => {
    const img = new Image();

    const idx = imageFileSelect.selectedIndex;
    const item = imageFileSelect.children[idx];
    img.src = item.value;
    img.onload = function() {
        const w = this.naturalWidth;
        const h = this.naturalHeight;
        console.log(`width = ${w}`);
        console.log(`height = ${h}`);
        canvas.setAttribute('width', w.toString());
        canvas.setAttribute('height', h.toString());
        focus.setAttribute('width', w.toString());
        focus.setAttribute('height', h.toString());
        ctx.drawImage(img, 0, 0, w, h);
    }

    console.log(item);
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