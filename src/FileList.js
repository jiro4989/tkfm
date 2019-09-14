import React from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"
import {Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  btn: {
    height: 40,
    width: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const FileList = ({files, selectedImageFiles, setSelectedImageFiles, bulkInsert}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={8}>
        <MultiSelect
          items={files}
          selectedItems={selectedImageFiles}
          onChange={setSelectedImageFiles}
          showSelectedItems={false}
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button className={classes.btn} variant="contained" color="primary" onClick={bulkInsert}>一括挿入</Button>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.btn} variant="contained" color="primary">クリア</Button>
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.btn} variant="contained" color="primary">リスト削除</Button>
          </Grid>
          <Grid item xs={12}>
          <Button className={classes.btn} variant="contained" color="primary">リストクリア</Button>
        </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FileList;
