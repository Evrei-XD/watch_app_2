/** Период между отправкой Bluetooth-команд (в миллисекундах). */
const PERIOD_MESSAGE_SENDING = 250;
/** Таймер для работы конвейера. */
let timerConveyor;
/** Состояние конвейера. */
let isRunConveyor = false;
/** Список Bluetooth-команд для отправки. */
let bluetoothCommandList = [];

/**
 * Функция добавления новой команды на конвейер.
 * @param {string} command Bluetooth-команда.
 */
const addBluetoothCommandToConveyor = (command) => {
  bluetoothCommandList.push(command);
  // console.log('Added conveyor command: ' + command);
  if (!isRunConveyor) {
    startConveyor();
    isRunConveyor = true;
  }
};

/**
 * Функция проверки наличия команд для отправки.
 * @returns {boolean} Есть ли команды для отправки.
 */
const checkExistConveyorCommands = () => {
  return bluetoothCommandList.length > 0;
};

/**
 * Функция запуска конвейера.
 */
const startConveyor = () => {
  sendConveyorCommand();
  timerConveyor = setInterval(tickConveyor, PERIOD_MESSAGE_SENDING);
};

/**
 * Функция отправки команды с конвеера.
 */
const sendConveyorCommand = () => {
  const currentConveyorCommand = bluetoothCommandList.shift();
  sendBluetoothMessage(currentConveyorCommand);
  console.log('Sent conveyor command: ' + currentConveyorCommand);
};

/**
 * Функция обновления конвейера.
 */
const tickConveyor = () => {
  if (checkExistConveyorCommands()) {
    sendConveyorCommand();
  }
};

// noinspection JSUnusedGlobalSymbols
/**
 * Функция остановки конвейера.
 */
const stopConveyor = () => {
  clearInterval(timerConveyor);
  isRunConveyor = false;
};
