import React, { Component } from "react";

class TilePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const options = [
      { dispText: "unko.png", path: "img/unko.png" },
      { dispText: "unko2.png", path: "img/unko2.png" }
    ].map((v, i) => {
      return (
        <option key={i} value={v.path}>
          {v.dispText}
        </option>
      );
    });

    return (
      <div className="TilePreview">
        <select multiple size="10">
          {options}
        </select>
        <button>一括挿入</button>
        <button>クリア</button>
        <button>リスト削除</button>
        <button>一括挿入</button>
      </div>
    );
  }
}

export default TilePreview;
