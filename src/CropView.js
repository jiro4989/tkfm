import React, {useState} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Paper, Typography, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {Scrollbars} from 'react-custom-scrollbars';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    height: 40,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 60,
  },
}));

const inputNumberStyle = {width: 80}

const CropView = ({image, cropX, setCropX, cropY, setCropY, cropWidth, setCropWidth, cropHeight, setCropHeight, scale, setScale}) => {
  const classes = useStyles();

  const [imageRef, setImageRef] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [crop, setCrop] = useState({
    // x: 0,
    // y: 0,
    // aspect: 16 / 9,
    // width: cropWidth,
    // height: cropHeight,
  });

  const getCroppedImg = (image, crop, fileName) => {
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
    setImageRef(image)
    setCrop({x: cropX, y: cropY, width: cropWidth, height: cropHeight});
    return false;
  };

  const onCropComplete = (crop, percentCrop) => {
    setCropX(crop.x)
    setCropY(crop.y)
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    crop.width = cropWidth;
    crop.height = cropHeight;
    setCrop(crop);
  };

  const onDragStart = () => {
  };

  const onDragEnd = () => {
  };

  const setCropXAndRedrawCrop = (v) => {
    setCropX(v.target.value);
    crop.x = v.target.value;
    setCrop(crop);
  }

  const setCropYAndRedrawCrop = (v) => {
    setCropY(v.target.value);
    crop.y = v.target.value;
    setCrop(crop);
  }

  const setCropWidthAndRedrawCrop = (v) => {
    setCropWidth(v.target.value);
    crop.width = v.target.value;
    setCrop(crop);
  }

  const setCropHeightAndRedrawCrop = (v) => {
    setCropHeight(v.target.value);
    crop.height = v.target.value;
    setCrop(crop);
  }

  const buttons = [
    {label: "X", value: cropX, onChange: setCropXAndRedrawCrop},
    {label: "Y", value: cropY, onChange: setCropYAndRedrawCrop},
    {label: "Width", value: cropWidth, onChange: setCropWidthAndRedrawCrop},
    {label: "Height", value: cropHeight, onChange: setCropHeightAndRedrawCrop},
    {label: "Scale", value: scale, onChange: setScale},
  ]

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" component="h3">
        Crop view
      </Typography>
      <hr />

      <Scrollbars style={ imageRef ? {width: imageRef.naturalWidth, height: 300} : {width: 500, height: 300} }>
        {image && <ReactCrop
          src={image}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          locked={true}
          style={{width: `${scale}%`, height: 'auto'}}
        />}
      </Scrollbars>

      {buttons.map(v => {
        return (
          <TextField
            key={v.label}
            label={v.label}
            value={v.value}
            onChange={v.onChange}
            type="number"
            className={classes.textField}
            InputLabelProps={{shrink: true}}
            margin="normal"
          />
        )
      })}
      <Slider value={scale} onChange={setScale} />
    </Paper>
  );
}
export default CropView;
