import React, {Component, useState} from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"

const FileList = ({files, selectedImageFiles, setSelectedImageFiles}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <MultiSelect
        items={files}
        selectedItems={selectedImageFiles}
        onChange={setSelectedImageFiles}
        showSelectedItems={false}
      />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button>unko</button>
        <button>unko</button>
        <button>unko</button>
      </div>
    </div>
  )
}

export default FileList;
