import React, {useState} from "react";
import FileList from "./FileList";
import CropView from "./CropView";
import TilePreview from "./TilePreview";

import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

// const remote = require('remote');
// const dialog = require('electron').remote.dialog;
// const BrowserWindow = remote.require('browser-window');

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  right: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
}));

const {ipcRenderer} = window.require("electron");

let waitResp = false

const App = () => {
  const classes = useStyles();

  const [selectedImageFiles, setSelectedImageFiles] = useState([])
  const [cropTargetImage, setCropTargetImage] = useState(null)
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(144);
  const [cropHeight, setCropHeight] = useState(144);
  const [scale, setScale] = useState(100);
  const [listItems, setListItems] = useState([])
  const [tileColumn, setTileColumn] = useState(4);
  const [tileRow, setTileRow] = useState(2);
  // FIXME 変更すると落ちる
  const [tileImages, setTileImages] = useState(Array.from(new Array(tileColumn * tileRow)).map(v => null));

  if (!ipcRenderer._events['add-list-item-req']) {
    console.log('SET: add-list-item-req')
    ipcRenderer.on('add-list-item-req', (evt, files) => {
      console.log('add-list-item-req', files)
      const cnt = listItems.length;
      const f = files.map((item, i) => {return {id: i + cnt, label: item.label, path: item.path}})
      f.forEach(v => listItems.push(v))
      setListItems([...listItems])
      ipcRenderer.removeAllListeners('add-list-item-req')
      evt.sender.send('add-list-item-resp', 'ping');
    })
  }

  if (!ipcRenderer._events['read-image-file-resp']) {
    console.log('SET: read-image-file-resp')
    ipcRenderer.on('read-image-file-resp', (evt, arg) => {
      const blob = new Blob([arg], {type: 'application/octet-binary'})
      const img = URL.createObjectURL(blob)
      if (!waitResp) return;
      waitResp = false;
      // if (Object.is(img, cropTargetImage)) return;
      setCropTargetImage(img)
      ipcRenderer.removeAllListeners('read-image-file-resp')
    })
  }

  if (!ipcRenderer._events['crop-images-resp']) {
    console.log('SET: crop-images-resp')
    ipcRenderer.on('crop-images-resp', (evt, args) => {
      console.log(args)
      args.forEach(arg => {
        const i = arg.index
        const blob = new Blob([arg.data], {type: 'application/octet-binary'})
        const img = URL.createObjectURL(blob)
        tileImages[i] = img
      });
      setTileImages([...tileImages])
      ipcRenderer.removeAllListeners('crop-images-resp')
    })
  }

  if (0 < selectedImageFiles.length) {
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
          scale: scale,
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={5}>
          <FileList
            files={listItems}
            selectedImageFiles={selectedImageFiles}
            setSelectedImageFiles={setSelectedImageFiles}
            bulkInsert={bulkInsert}
          />
        </Grid>
        <Grid item xs={7}>
          <Grid container>
            <Grid item xs={12} className={classes.right}>
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
            </Grid>
            <Grid item xs={12}>
              <TilePreview
                tileImages={tileImages}
                width={cropWidth}
                height={cropHeight}
                tileRow={tileRow}
                tileColumn={tileColumn}
                setTileRow={setTileRow}
                setTileColumn={setTileColumn}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default App;
