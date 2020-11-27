const robot = require("robotjs")
const ioHook = require("iohook")
const fs = require("fs")

// Config
let recordMouse = true

let mouseHistory = []

ioHook.on("mousemove", mouseEvent => {
    if (recordMouse) recordMouseHistory(mouseEvent)
    //console.log(event);
});

ioHook.on("keydown", event => {
    if (event.rawcode === 82) saveMouseHistory(mouseHistory)
    if (event.rawcode === 70) editAndShot()
    //console.log(event)
})

const recordMouseHistory = mouseEvent => {
    mouseHistory.push(mouseEvent)
}

const saveMouseHistory = mouseHistory => {
    recordMouse = false;
    loadMouseMovementList(mouseHistory)
    fs.writeFile("./record.txt", JSON.stringify(mouseHistory), err => {
        if (err === null) console.log("File written")
        recordMouse = true;
    })
}

const loadMouseMovementList = mouseList => {
    let clicks = 0
    mouseList.forEach(mouseValue => {
        if (mouseValue.clicks > clicks) {
            robot.mouseClick()
            clicks++
        }
        robot.dragMouse(mouseValue.x, mouseValue.y)
    })
}

// Robotrrr

robot.setMouseDelay(1);
robot.setKeyboardDelay(1);

var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

const editAndShot = () => {
    var pos = robot.getMousePos()
    robot.keyTap("z")
    robot.mouseClick("right")
    robot.mouseToggle("down")
    robot.dragMouse(pos.x + 1, pos.y + 1)
    robot.mouseToggle("up")
    robot.dragMouse(pos.x, pos.y)
    robot.keyTap("2")
}

ioHook.start()