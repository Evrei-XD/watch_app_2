//Start page
let page = `top2`;
let previousPage = `center`;

//Sliders
let gripForce = 0;
let controlLevel = 0;
let slidersDebounceTimeout = 200;

//Bluetooth devices list
const devicesContainer = document.querySelector(`.page__list--bluetooth`);
let devices = devicesContainer.querySelectorAll(`.page__list-item`);
let selectedBluetoothDeviceIndex = 0;
let bluetoothSocket;

//gestures
let idCurrentGesture = 0;
let gesture = 0;
const gesturesSrcAndSource = [
  {
    angle: 0,
    src: `src/img/gestures/g3.png`,
    name: `1`
  },
  {
    angle: 30,
    src: `src/img/gestures/g4.png`,
    name: `2`
  },
  {
    angle: 60,
    src: `src/img/gestures/g5.png`,
    name: `3`
  },
//  {
//    angle: 120,
//    src: `src/img/gestures/l5.png`,
//    name: `Литерал`
//  },
//  {
//    angle: 150,
//    src: `src/img/gestures/l4.png`,
//    name: `Фак`
//  },
//  {
//    angle: 180,
//    src: `src/img/gestures/l3.png`,
//    name: `Пинцет`
//  },
//  {
//    angle: 210,
//    src: `src/img/gestures/l2.png`,
//    name: `Палец вверх`
//  },
//  {
//    angle: 240,
//    src: `src/img/gestures/l1.png`,
//    name: `Естест. пол.`
//  },
//  {
//    angle: 300,
//    src: `src/img/gestures/g1.png`,
//    name: `Щепоть`
//  },
//  {
//    angle: 330,
//    src: `src/img/gestures/g2.png`,
//    name: `Указ.`
//  }
];

//bezel
let direction;

//screens
let screen = 1;
const screensData = [
  {
    src: `src/img/screens/squeeze@2x.svg`,
    title: `Сжатие`,
    color: `#ff0055`,
    shadow: `#ff006a`,
    to: `left2`
  },
  {
    src: `src/img/screens/enfeeble@2x.svg`,
    title: `Разжатие`,
    color: `#00ffb8`,
    shadow: `#00ffb8`,
    to: `left1`
  },
  {
    src: `src/img/screens/info@2x.svg`,
    title: `Информация`,
    color: `#c9ff26`,
    shadow: `#c9ff26`,
    to: `top1`
  },
  {
    src: `src/img/screens/gestures@2x.svg`,
    title: `Жесты`,
    color: `#ffffff`,
    shadow: `#ffffff`,
    to: `center`
  },
  {
    src: `src/img/screens/control@2x.svg`,
    title: `Управление`,
    color: `#ff00e8`,
    shadow: `#ff00e8`,
    to: `right1`
  },
  {
    src: `src/img/screens/force@2x.svg`,
    title: `Сила хвата`,
    color: `#ff5600`,
    shadow: `#ff5600`,
    to: `right2`
  },
  {
    src: `src/img/screens/unlocked@2x.svg`,
    title: `Блокировка`,
    color: `#00e1ff`,
    shadow: `#00e1ff`,
    to: `right3`
  }
];

//charts
let squeezeThreshold = 90;
let squeezeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let enfeebleThreshold = 90;
let enfeebleData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let alternate = false;
let enfeebleGradient = `rgba(20, 247, 246, 0.46)`;
let squeezeGradient = `rgba(247, 20, 71, 0.46)`;
let enfeebleLine = `#00ffb8`;
let squeezeLine = `#ff006a`;
let debounceTimeout = 1000;
