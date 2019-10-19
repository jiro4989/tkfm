import unittest

import nigui, nimPNG

const
  imgFile = "tests/actor004/actor004_r_stand_001_001.png"

app.init()

suite "nigui":
  test "画像ファイルの読み取り":
    var img = newImage()
    img.loadFromFile(imgFile)

  test "画像ファイルの保存":
    var img = newImage()
    img.loadFromFile(imgFile)
    img.saveToPngFile("tests/out/out1.png")

  test "画像の拡大 (200x200)":
    var img = newImage()
    img.loadFromFile(imgFile)
    img.resize(200, 200)
    img.saveToPngFile("tests/out/out2_200x200.png")

  test "画像の拡大 (200x100)":
    var img = newImage()
    img.loadFromFile(imgFile)
    img.resize(200, 100)
    img.saveToPngFile("tests/out/out3_200x100.png")

  test "画像の縮小":
    var img = newImage()
    img.loadFromFile(imgFile)
    img.resize(50, 50)
    img.saveToPngFile("tests/out/out4_50x50.png")

  test "画像のトリミング":
    discard

suite "nimPNG":
  test "画像ファイルの読み取り":
    var img = loadPNG32(imgFile)
    echo img.width
    echo img.height
    echo img.data.len

  # test "画像ファイルの保存":
  #   var img = newImage()
  #   img.loadFromFile(imgFile)
  #   img.saveToPngFile("tests/out/out1.png")
  #
  # test "画像の拡大 (200x200)":
  #   var img = newImage()
  #   img.loadFromFile(imgFile)
  #   img.resize(200, 200)
  #   img.saveToPngFile("tests/out/out2_200x200.png")
  #
  # test "画像の拡大 (200x100)":
  #   var img = newImage()
  #   img.loadFromFile(imgFile)
  #   img.resize(200, 100)
  #   img.saveToPngFile("tests/out/out3_200x100.png")
  #
  # test "画像の縮小":
  #   var img = newImage()
  #   img.loadFromFile(imgFile)
  #   img.resize(50, 50)
  #   img.saveToPngFile("tests/out/out4_50x50.png")
  #
  # test "画像のトリミング":
  #   discard
  #
