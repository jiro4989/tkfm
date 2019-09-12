import React, {Component, useState} from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"

// 通常のrequireだとfsモジュールのロードをしようとして失敗する。
// fsはファイルシステムにアクセスするモジュールなので、ブラウザのレンダラープロ
// セスからはアクセスできない。
//
// window.requireを使うことで解決できる。
// https://github.com/electron/electron/issues/7300
const electron = window.require("electron");

const FileList = ({files, selectedImageFiles, setSelectedImageFiles}) => {
  console.log('FileList: rendered')

  return (
    <MultiSelect
      items={files}
      selectedItems={selectedImageFiles}
      onChange={setSelectedImageFiles}
      showSelectedItems={false}
    />
  )
}

export default FileList;
