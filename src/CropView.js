import React, {useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

const inputNumberStyle = {width: 80}
const LabeledInputNumber = ({label, value, onChange, style}) => {
  return (
    <label>
      {label}:
      <InputNumber value={value} style={style} onChange={onChange} />
    </label>
  )
}

const CropView = () => {
  const [src, setSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [cropWidth, setCropWidth] = useState(144);
  const [cropHeight, setCropHeight] = useState(144);
  const [scale, setScale] = useState(150);
  const [crop, setCrop] = useState({
    // aspect: 16 / 9,
    // width: cropWidth,
    // height: cropHeight,
  });

  const loadImage = (evt) => {
    const file = evt.target.files[0]
    const dataURL = URL.createObjectURL(file)
    setSrc(dataURL)
  }

  const getCroppedImg = (image, crop, fileName) => {
    console.log("getCroppedImg:", image);
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        blob.name = fileName; // eslint-disable-line no-param-reassign
        // window.URL.revokeObjectURL(this.fileUrl);
        // this.fileUrl = window.URL.createObjectURL(blob);
        // resolve(this.fileUrl);
        resolve(window.URL.createObjectURL(blob));
      }, 'image/png');
    });
  }

  const makeClientCrop = (crop) => {
    if (imageRef && crop.width && crop.height) {
      getCroppedImg(imageRef, crop, 'newFile.png').then(croppedImageURL =>
        setCroppedImageURL(croppedImageURL)
      );
    }
  }

  const onImageLoaded = image => {
    console.log("onImageLoaded:", image);
    setImageRef(image)
    setCrop({x: 0, y: 0, width: cropWidth, height: cropHeight});
    return false;
  };

  const onCropComplete = (crop, percentCrop) => {
    //console.log('onCropComplete', crop, percentCrop);
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    crop.width = cropWidth;
    crop.height = cropHeight;
    setCrop(crop);
  };

  const onDragStart = () => {
    //console.log('onDragStart');
  };

  const onDragEnd = () => {
    //console.log('onDragEnd');
  };

  const setCropWidthAndRedrawCrop = (v) => {
    setCropWidth(v);
    crop.width = v;
    setCrop(crop);
  }

  const setCropHeightAndRedrawCrop = (v) => {
    setCropHeight(v);
    crop.height = v;
    setCrop(crop);
  }

  return (
    <div>
      <h2>CropView</h2>
      <hr />
      <input type="file" onChange={(evt) => loadImage(evt)} />
      <br />
      <LabeledInputNumber value={cropWidth} onChange={setCropWidthAndRedrawCrop} style={inputNumberStyle} label={"Crop width"} />
      <br />
      <LabeledInputNumber value={cropHeight} onChange={setCropHeightAndRedrawCrop} style={inputNumberStyle} label={"Crop height"} />
      <br />
      <LabeledInputNumber value={scale} onChange={setScale} style={inputNumberStyle} label={"Crop scale"} />
      <Slider value={scale} onChange={setScale} />
      <br />
      {src && <ReactCrop
        src={src}
        crop={crop}
        onImageLoaded={onImageLoaded}
        onComplete={onCropComplete}
        onChange={onCropChange}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        locked={true}
        style={{width: scale + '%', height: 'auto'}}
      />}
      {croppedImageURL && <img alt="Crop" src={croppedImageURL} />}
    </div>
  );
}
export default CropView;
