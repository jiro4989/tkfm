import React, {Component} from "react";
const {ipcRenderer} = window.require("electron");

const LabelInput = ({label, value, setValue}) => {
  return (
    <div>
      <label>
        {label}
        <input type="number" value={value} onChange={setValue} />
      </label>
    </div>
  )
}

class TestCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      width: 144,
      height: 144,
      file: null,
      fileBlob: null,
    }
    ipcRenderer.on('test-crop-resp', (e, arg) => {
      //console.log("test-crop-resp:",arg)
      const blob = new Blob([arg],{type: 'application/octet-binary'})
      this.setState({fileBlob: URL.createObjectURL(blob)})
      //this.props.setImage(image);
    })
  }

  sendCropRequest = () => {
    const data = {
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
      filepath: this.state.file.path,
    }
    ipcRenderer.send('test-crop-req', data);
  }

  render() {
    return (
      <div>
        <h2>TestCrop</h2>
        <hr />
        <LabelInput label={"X:"} value={this.state.x} setValue={evt => this.setState({x: evt.target.value})} />
        <LabelInput label={"Y:"} value={this.state.y} setValue={evt => this.setState({y: evt.target.value})} />
        <LabelInput label={"Width:"} value={this.state.width} setValue={evt => this.setState({width: evt.target.value})} />
        <LabelInput label={"Height:"} value={this.state.height} setValue={evt => this.setState({height: evt.target.value})} />
        <div>
          <label>
            Select image file:
            <input type="file" onChange={evt => this.setState({file: evt.target.files[0], fileBlob: URL.createObjectURL(evt.target.files[0])}) } />
          </label>
        </div>
        <div>
          <img src={this.state.fileBlob} width={400} height={400} style={{backgroundColor: 'red'}} />
        </div>
        <div>
          <button onClick={this.sendCropRequest} >
            Send requst
          </button>
        </div>
      </div>
    );
  }
}

export default TestCrop;
