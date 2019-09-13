import React, {Component, useState} from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"
import {Button, Box} from '@material-ui/core';

const FileList = ({files, selectedImageFiles, setSelectedImageFiles, bulkInsert}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <MultiSelect
        items={files}
        selectedItems={selectedImageFiles}
        onChange={setSelectedImageFiles}
        showSelectedItems={false}
      />
      <Box component="span" m={1}>
        <Button />
        <Button variant="contained" color="primary" onClick={bulkInsert}>一括挿入</Button>
        <Button variant="contained" color="primary">クリア</Button>
        <Button variant="contained" color="primary">リスト削除</Button>
        <Button variant="contained" color="primary">リストクリア</Button>
      </Box>
    </div>
  )
}

export default FileList;
