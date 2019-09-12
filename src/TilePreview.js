import React from "react";

const TilePreview = ({tileImages, width, height}) => {
  const images = tileImages.map((img, i) => {
    return (
      <img key={i} src={img} width={width} height={height} />
    )
  })
  return (
    <div>
      {images}
    </div>
  )
}

export default TilePreview;
