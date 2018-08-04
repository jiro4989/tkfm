import QtQuick 2.2
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.3

ApplicationWindow {
    visible: true
    title: "tkfm"
    property int margin: 11
    minimumWidth: 1280
    minimumHeight: 720

    ColumnLayout {
        id: mainLayout
        anchors.fill: parent
        anchors.margins: margin
        GroupBox {
            id: rowBox
            title: "Row layout"
            Layout.fillWidth: true

            RowLayout {
                id: rowLayout
                anchors.fill: parent
                TextField {
                    placeholderText: "This wants to grow horizontally"
                    Layout.fillWidth: true
                }
                Button {
                    text: "Button"
                }
            }
        }

        GroupBox {
          id: gridBox
          title: "Grid layout"
          Layout.fillWidth: true

          GridLayout {
              id: gridLayout
              rows: 3
              flow: GridLayout.TopToBottom
              anchors.fill: parent

              Label { text: "Line 1" }
              Label { text: "Line 2" }
              Label { text: "Line 3" }

              TextField { }
              TextField { id: textField }
              TextField { }

              Flickable {
                  anchors {
                      top: parent.top
                      left: textField.right
                      right: parent.right
                      bottom: parent.bottom
                  }

                  contentHeight: textid.width
                  contentWidth: textid.height

                  TextArea.flickable: TextArea {
                    id: textid
                    text: "This widget spans over three rows in the GridLayout.\n"
                        + "All items in the GridLayout are implicitly positioned from top to bottom."
                    wrapMode: TextArea.Wrap
                  }

                  ScrollBar.vertical: ScrollBar { }
              }
          }
        }
        TextArea {
            id: t3
            text: "This fills the whole cell"
            Layout.minimumHeight: 30
            Layout.fillHeight: true
            Layout.fillWidth: true
        }
        GroupBox {
            id: stackBox
            title: "Stack layout"
            implicitWidth: 200
            implicitHeight: 60
            Layout.fillWidth: true
            Layout.fillHeight: true
            StackLayout {
                id: stackLayout
                anchors.fill: parent

                function advance() { currentIndex = (currentIndex + 1) % count }

                Repeater {
                    id: stackRepeater
                    model: 5
                    Rectangle {
                        color: Qt.hsla((0.5 + index)/stackRepeater.count, 0.3, 0.7, 1)
                        Button { anchors.centerIn: parent; text: "Page " + (index + 1); onClicked: { stackLayout.advance() } }
                    }
                }
            }
        }
    }
}
