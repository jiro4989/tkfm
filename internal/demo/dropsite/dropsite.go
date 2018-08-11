package main

import (
	"os"

	"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/gui"
	"github.com/therecipe/qt/widgets"
)

type Valuelist struct{ *widgets.QListWidget }

func main() {

	widgets.NewQApplication(len(os.Args), os.Args)

	var window = widgets.NewQMainWindow(nil, 0)

	var vlayout = widgets.NewQVBoxLayout()
	// window.Layout().DestroyQObject()
	window.SetLayout(vlayout)

	var gp = struct{ ValueList Valuelist }{}

	gp.ValueList = Valuelist{widgets.NewQListWidget(nil)}

	gp.ValueList.SetAcceptDrops(true)

	vlayout.AddWidget(gp.ValueList, 0, 0)

	gp.ValueList.ConnectDragEnterEvent(gp.ValueList.DragEnterEvent_Implementation)
	gp.ValueList.ConnectDragMoveEvent(gp.ValueList.DragMoveEvent_Implementation)
	gp.ValueList.ConnectDropEvent(gp.ValueList.DropEvent_Implementation)

	window.ShowMaximized()

	widgets.QApplication_Exec()
}

func (v *Valuelist) DragEnterEvent_Implementation(e *gui.QDragEnterEvent) {
	e.AcceptProposedAction()
	//  if e.MimeData().HasUrls() {
	//      e.AcceptProposedAction()
	//  }
}

func (v *Valuelist) DragMoveEvent_Implementation(e *gui.QDragMoveEvent) {
	e.AcceptProposedAction()
}

func (v *Valuelist) DropEvent_Implementation(e *gui.QDropEvent) {
	//  if e.MimeData().HasUrls() {
	e.SetDropAction(core.Qt__CopyAction)
	e.AcceptProposedAction()
	e.SetAccepted(true)
}
