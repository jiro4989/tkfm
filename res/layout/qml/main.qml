import QtQuick 2.2
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.3

ApplicationWindow {
  visible: true
  title: "tkfm"
  property int margin: 11
  minimumWidth: 1280
  minimumHeight: 720

  RowLayout {
    anchors.fill: parent
    RowLayout {
      anchors.fill: parent
      ListView {
        id: imageFileNameListView
        width: 300
        currentIndex: -1
        anchors.fill: parent
        delegate: Text { text: fileName }
      }
      ColumnLayout {
        Button { text: "Button1" }
        Button { text: "Button2" }
        Button { text: "Button3" }
        Button { text: "Button4" }
        Button { text: "Button5" }
      }
    }
    ColumnLayout {
      Button { text: "Button1" }
      Button { text: "Button2" }
      Button { text: "Button3" }
    }
  }
}
