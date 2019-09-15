import React from "react";

import {Paper, Typography, TextField} from '@material-ui/core';
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
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 60,
  },
}));

const TilePreview = ({tileImages, width, height, tileRow, tileColumn, setTileRow, setTileColumn}) => {
  const classes = useStyles();

  const rows = []
  let row = []
  tileImages.forEach((img, i) => {
    row.push(<img key={i} src={img} width={width} height={height} />)
    if ((i + 1) % tileColumn === 0) {
      rows.push(row)
      row = []
    }
  })
  const images = rows.map((row, i) => {
    const r = row.map((v,j) => {
      return (
        <td key={j}>{v}</td>
      )
    })
    return (
      <tr key={i}>
        {r}
      </tr>
    )
  })

  const buttons = [
    {label: "Row", value: tileRow, onChange: setTileRow},
    {label: "Column", value: tileColumn, onChange: setTileColumn},
  ]

  return (
    <Paper className={classes.paper}>
      <Typography variant="h3" component="h3">
        Tile preview
      </Typography>
      <hr />

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

      <table>
        <tbody>
          {images}
        </tbody>
      </table>
    </Paper>
  )
}

export default TilePreview;
