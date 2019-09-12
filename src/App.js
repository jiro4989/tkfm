import React, {useState} from "react";
import FileList from "./FileList";
import CropView from "./CropView";
import TilePreview from "./TilePreview";

const {ipcRenderer} = window.require("electron");

const files = [
  {id: 0, label: "actor004_l_stand_001_001.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_001.png"},
  {id: 1, label: "actor004_l_stand_001_002.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_002.png"},
  {id: 2, label: "actor004_l_stand_001_003.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_003.png"},
  {id: 3, label: "actor004_l_stand_001_004.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_004.png"},
  {id: 4, label: "actor004_l_stand_001_005.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_005.png"},
  {id: 5, label: "actor004_l_stand_001_006.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_006.png"},
  {id: 6, label: "actor004_l_stand_001_007.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_007.png"},
  {id: 7, label: "actor004_l_stand_001_008.png", path: "testdata/actor004/stand/left/actor004_l_stand_001_008.png"},
]

let waitResp = false

const App = () => {
  const [selectedImageFiles, setSelectedImageFiles] = useState([])
  const [cropTargetImage, setCropTargetImage] = useState(null)
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(144);
  const [cropHeight, setCropHeight] = useState(144);
  const [scale, setScale] = useState(150);
  const [tileImages, setTileImages] = useState([null, null, null, null, null, null, null, null]);

  console.log('App:', selectedImageFiles)

  ipcRenderer.on('read-image-file-resp', (evt, arg) => {
    console.log('read-image-file-resp:', arg)
    const blob = new Blob([arg], {type: 'application/octet-binary'})
    const img = URL.createObjectURL(blob)
    if (!waitResp) return;
    waitResp = false;
    console.log('OK')
    // if (Object.is(img, cropTargetImage)) return;
    setCropTargetImage(img)
    ipcRenderer.removeAllListeners('read-image-file-resp')
  })

  ipcRenderer.on('crop-images-resp', (evt, args) => {
    console.log('crop-images-resp', args)
    args.forEach(arg => {
      const i = arg.index
      const blob = new Blob([arg.data], {type: 'application/octet-binary'})
      const img = URL.createObjectURL(blob)
      console.log(img)
      tileImages[i] = img
    });
    setTileImages([...tileImages])
    ipcRenderer.removeAllListeners('crop-images-resp')
  })

  if (0 < selectedImageFiles.length) {
    console.log('File request')
    waitResp = true
    const file = selectedImageFiles[0];
    ipcRenderer.send('read-image-file-req', file.path);
  }

  const sendCropImage = () => {
    if (0 < selectedImageFiles.length) {
      const args = selectedImageFiles.map((file, i) => {
        const arg = {
          x: cropX,
          y: cropY,
          width: cropWidth,
          height: cropHeight,
          filepath: file.path,
          index: i,
        }
        return arg
      })
      ipcRenderer.send('crop-images-req', args);
    }
  }

  return (
    <div className="App">
      <FileList
        files={files}
        selectedImageFiles={selectedImageFiles}
        setSelectedImageFiles={setSelectedImageFiles}
      />
      <button onClick={sendCropImage}>
        テスト送信
      </button>
      <CropView
        image={cropTargetImage}
        cropX={cropX}
        cropY={cropY}
        cropWidth={cropWidth}
        cropHeight={cropHeight}
        scale={scale}
        setCropX={setCropX}
        setCropY={setCropY}
        setCropWidth={setCropWidth}
        setCropHeight={setCropHeight}
        setScale={setScale}
      />
      <TilePreview
        tileImages={tileImages}
        width={cropWidth}
        height={cropHeight}
      />
    </div>
  )
}

export default App;
