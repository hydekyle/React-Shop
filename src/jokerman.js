const robot = require("robotjs");
const ioHook = require("iohook");
const fs = require("fs");
const player = require("node-wav-player");

// Config
let active = true;
let recordMouse = true;

let mouseHistory = [];

ioHook.on("keydown", (event) => {
  if (active) {
    if (event.rawcode === 52) shacoUltimateAlarm();
  }

  if (event.rawcode === 112) switchActiveHacks();

  // if (event.rawcode === 82) saveMouseHistory(mouseHistory)
  // if (event.rawcode === 70) editAndShot()
  //console.log(event.rawcode);
});

// ioHook.on("mousemove", mouseEvent => {
//     if (recordMouse) recordMouseHistory(mouseEvent)
//     //console.log(event);
// });

const switchActiveHacks = () => {
  active = !active;
  console.log("Active is now: " + active);
};

let isUltimateOnCD = false;

const shacoUltimateAlarm = () => {
  if (isUltimateOnCD) return;
  isUltimateOnCD = true;
  setTimeout(() => {
    player.play({
      path: "./src/beep.wav",
    });
    setTimeout(() => {
      player.play({
        path: "./src/beep.wav",
      });
      setTimeout(() => {
        player.play({
          path: "./src/beep.wav",
        });
        isUltimateOnCD = false;
      }, 1000);
    }, 1000);
  }, 15600);
};

const recordMouseHistory = (mouseEvent) => {
  mouseHistory.push(mouseEvent);
};

const saveMouseHistory = (mouseHistory) => {
  recordMouse = false;
  loadMouseMovementList(mouseHistory);
  fs.writeFile("./record.txt", JSON.stringify(mouseHistory), (err) => {
    if (err === null) console.log("File written");
    recordMouse = true;
  });
};

const loadMouseMovementList = (mouseList) => {
  let clicks = 0;
  mouseList.forEach((mouseValue) => {
    if (mouseValue.clicks > clicks) {
      robot.mouseClick();
      clicks++;
    }
    robot.dragMouse(mouseValue.x, mouseValue.y);
  });
};

// Robotrrr

robot.setMouseDelay(1);
robot.setKeyboardDelay(1);

var screenSize = robot.getScreenSize();
var height = screenSize.height / 2 - 10;
var width = screenSize.width;

const editAndShot = () => {
  var pos = robot.getMousePos();
  robot.keyTap("z");
  robot.mouseClick("right");
  robot.mouseToggle("down");
  robot.dragMouse(pos.x + 1, pos.y + 1);
  robot.mouseToggle("up");
  robot.dragMouse(pos.x, pos.y);
  robot.keyTap("2");
};

ioHook.start();
