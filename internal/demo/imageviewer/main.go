package main

import (
	"fmt"
	"os"

	"github.com/therecipe/qt/core"
	"github.com/therecipe/qt/gui"
	"github.com/therecipe/qt/widgets"
)

var (
	displayArea   *widgets.QWidget
	scene         *widgets.QGraphicsScene
	view          *widgets.QGraphicsView
	item          *widgets.QGraphicsPixmapItem
	mainApp       *widgets.QApplication
	imageFileName string
)

func imageViewer() *widgets.QWidget {
	displayArea = widgets.NewQWidget(nil, 0)
	scene = widgets.NewQGraphicsScene(nil)
	view = widgets.NewQGraphicsView(nil)

	var imageReader = gui.NewQImageReader3(imageFileName, core.NewQByteArray())
	// test to see if we are dealing with animated GIF
	fmt.Println("Animated GIF : ", imageReader.SupportsAnimation())

	if imageReader.SupportsAnimation() {
		// instead of reading from file(disk) again, we take from memory
		var movie = gui.NewQMovie2(imageReader.Device(), core.NewQByteArray(), nil)

		// see http://stackoverflow.com/questions/5769766/qt-how-to-show-gifanimated-image-in-qgraphicspixmapitem
		var movieLabel = widgets.NewQLabel(nil, core.Qt__Widget)
		movieLabel.SetMovie(movie)
		movie.Start()
		scene.AddWidget(movieLabel, core.Qt__Widget)
	} else {

		var pixmap = gui.QPixmap_FromImageReader(imageReader, core.Qt__AutoColor)
		item = widgets.NewQGraphicsPixmapItem2(pixmap, nil)

		scene.AddItem(item)
	}

	view.SetScene(scene)

	//create a button and connect the clicked signal
	var button = widgets.NewQPushButton2("Quit", nil)
	button.ConnectClicked(func(flag bool) {

		//os.Exit(0)

		widgets.QApplication_Beep()
		widgets.QMessageBox_Information(nil, "OK", "You clicked quit button!", widgets.QMessageBox__Ok, widgets.QMessageBox__Ok)

		// errmm... proper way to quit Qt application
		// https://godoc.org/github.com/therecipe/qt/widgets#QApplication.Quit
		mainApp.Quit()
	})

	var layout = widgets.NewQVBoxLayout()

	layout.AddWidget(widgets.NewQWidget(nil, 0), 0, 0)
	layout.AddWidget(view, 0, core.Qt__AlignCenter)
	layout.AddWidget(button, 0, core.Qt__AlignCenter)

	displayArea.SetLayout(layout)

	return displayArea
}

func main() {

	if len(os.Args) != 2 {
		fmt.Printf("Usage : %s <image file>\n", os.Args[0])
		os.Exit(0)
	}

	imageFileName = os.Args[1]

	fmt.Println("Loading image : ", imageFileName)

	mainApp = widgets.NewQApplication(len(os.Args), os.Args)

	imageViewer().Show()

	widgets.QApplication_Exec()
}
