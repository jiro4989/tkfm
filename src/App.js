import React, {Component, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import FileList from "./FileList";
import CropView from "./CropView";
import TilePreview from "./TilePreview";
import TestCrop from "./TestCrop";

// 練習用のコード
import TestCounter from "./TestCounter";
import TestTextInput from "./TestTextInput";
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

const App = () => {
  const [selectedImageFiles, setSelectedImageFiles] = useState([])
  const [cropTargetImage, setCropTargetImage] = useState(null)

  console.log('App:', selectedImageFiles)

  ipcRenderer.on('read-image-file-resp', (evt, arg) => {
    console.log('read-image-file-resp:', arg)
    const blob = new Blob([arg], {type: 'application/octet-binary'})
    //setCropTargetImage(URL.createObjectURL(blob))
  })

  if (0 < selectedImageFiles.length) {
    console.log('File request')
    const file = selectedImageFiles[0];
    ipcRenderer.send('read-image-file-req', file.path);
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React/Electron</h2>
      </div>
      <p className="App-intro">Hello Electron!</p>

      <TestCounter />
      <TestTextInput />
      <TestCrop />

      <FileList files={files} selectedImageFiles={selectedImageFiles} setSelectedImageFiles={setSelectedImageFiles} />
      <CropView image={cropTargetImage} />
      <TilePreview />
    </div>
  )
}

export default App;
