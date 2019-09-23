import React from "react";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"
import {Button, Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

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
    height: '100%',
  },
}));

const FileList = ({files, selectedImageFiles, setSelectedImageFiles, bulkInsert}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" component="h3">
        File list
      </Typography>
      <hr />
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
    </Paper>
  )
}

export default FileList;
