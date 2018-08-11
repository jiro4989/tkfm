package main

import (
	"fmt"
	"os"

	"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/widgets"
)

var (
	centralLayout       *widgets.QGridLayout
	centralLayoutRow    int
	centralLayoutColumn int
)

func main() {
	widgets.NewQApplication(len(os.Args), os.Args)

	mainWindow := widgets.NewQMainWindow(nil, 0)
	mainWindow.SetWindowTitle("Common Widgets")

	scrollWidget := widgets.NewQScrollArea(nil)

	centralWidget := widgets.NewQWidget(nil, 0)
	centralLayout = widgets.NewQGridLayout(centralWidget)

	itemViews()

	scrollWidget.SetWidget(centralWidget)

	mainWindow.SetCentralWidget(scrollWidget)
	mainWindow.ShowMaximized()

	widgets.QApplication_Exec()
}

func addWidget(widget widgets.QWidget_ITF) {

	if centralLayoutColumn > 6 {
		centralLayoutColumn = 0
		centralLayoutRow++
	}

	wrappedWidget := widgets.NewQGroupBox2(widget.QWidget_PTR().WindowTitle(), nil)
	wrappedWidgetLayout := widgets.NewQVBoxLayout2(wrappedWidget)
	wrappedWidgetLayout.AddWidget(widget, 0, core.Qt__AlignCenter)
	wrappedWidget.SetFixedSize2(250, 250)

	centralLayout.AddWidget(wrappedWidget, centralLayoutRow, centralLayoutColumn, core.Qt__AlignCenter)

	centralLayoutColumn++
}

type Person struct {
	name string
	age  int
}

func itemViews() {

	//List View
	listView := widgets.NewQListView(nil)
	listView.SetWindowTitle("List View")

	list := []Person{
		Person{name: "Taro", age: 1},
		Person{name: "Jiro", age: 2},
		Person{name: "Saburo", age: 3},
		Person{name: "Shiro", age: 4},
		Person{name: "Goro", age: 5},
	}

	listModel := core.NewQAbstractListModel(nil)
	listModel.ConnectRowCount(func(parent *core.QModelIndex) int {
		return len(list)
	})
	listModel.ConnectData(func(index *core.QModelIndex, role int) *core.QVariant {
		if role != int(core.Qt__DisplayRole) {
			return core.NewQVariant()
		}
		fmt.Println(list[index.Row()].age)
		return core.NewQVariant14(list[index.Row()].name)
	})
	listView.SetModel(listModel)
	addWidget(listView)
}
