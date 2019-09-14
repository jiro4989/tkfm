import React, {useState} from "react";
import FileList from "./FileList";
import CropView from "./CropView";
import TilePreview from "./TilePreview";

// const remote = require('remote');
// const dialog = require('electron').remote.dialog;
// const BrowserWindow = remote.require('browser-window');

const {ipcRenderer} = window.require("electron");

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
  const [listItems, setListItems] = useState([])

  console.log('App:', selectedImageFiles)

  ipcRenderer.on('add-list-item-req', (evt, files) => {
    console.log('add-list-item-req', files)
    const cnt = listItems.length;
    const f = files.map((item, i) => {return {id: i + cnt, label: item.label, path: item.path}})
    f.forEach(v => listItems.push(v))
    setListItems([...listItems])
    ipcRenderer.removeAllListeners('add-list-item-req')
    evt.sender.send('add-list-item-resp', 'ping');
  })

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

  const bulkInsert = () => {
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

  const deleteListItem = () => {}
  const clearList = () => {

  }

  return (
    <div className="App">
      <FileList
        files={listItems}
        selectedImageFiles={selectedImageFiles}
        setSelectedImageFiles={setSelectedImageFiles}
        bulkInsert={bulkInsert}
      />
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
