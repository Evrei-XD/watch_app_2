const bluetoothApi = () => {
  var bluetoothDevices = [];
  var socket;
  var adapter = tizen.bluetooth.getDefaultAdapter();

  function clearBluetoothDevices() {
    document.getElementById('bluetooth_list').innerHTML = '';
  }

  function addBluetoothDevice(device) {
    isExist = false;
    for (var i = 0; i < bluetoothDevices.length; i++) {
      if (bluetoothDevices[i].address == device.address) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      bluetoothDevices.push(device);
      showBluetoothDevices();
    }
  }

  function showBluetoothDevices() {
    clearBluetoothDevices();
    for (var i = 0; i < bluetoothDevices.length; i++) {
      var ul = document.getElementById('bluetooth_list');
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(bluetoothDevices[i].name));
      li.setAttribute('class', 'page__list-item');
      if (i == 0) {
        li.classList.add(`page__list-item--selected`);
      }
      ul.appendChild(li);
      devices = devicesContainer.querySelectorAll(`.page__list-item`);
      bluetooth();
    }
  }

  function onClickDevice() {
    console.log(
      'On click bluetooth device: ' +
        bluetoothDevices[selectedBluetoothDeviceIndex].name
    );
    if (
      bluetoothDevices.length > 0 &&
      selectedBluetoothDeviceIndex < bluetoothDevices.length
    ) {
      if (bluetoothDevices[selectedBluetoothDeviceIndex].isBonded) {
        connectToDevice();
      } else {
        bindToDevice();
      }
    }
  }

  function enableBluetooth() {
    var bluetoothSwitchAppControl = new tizen.ApplicationControl(
      'http://tizen.org/appcontrol/operation/edit',
      null,
      'application/x-bluetooth-on-off'
    );

    function launchSuccess() {
      alert('Bluetooth Settings application is successfully launched.');
    }

    function launchError(error) {
      alert(
        'An error occurred: ' +
          error.name +
          '. Please enable Bluetooth through the Settings application.'
      );
    }

    var serviceReply = {
      onsuccess: function (data) {
        if (adapter.powered) {
          alert('Bluetooth is successfully turned on.');
          startBluetooth();
        } else {
          alert('Bluetooth is still switched off.');
        }
      },
      onfailure: function () {
        alert('Bluetooth Settings application reported failure.');
      }
    };

    tizen.application.launchAppControl(
      bluetoothSwitchAppControl,
      null,
      launchSuccess,
      launchError,
      serviceReply
    );
  }

  function setVisibility() {
    var bluetoothVisibilityAppControl = new tizen.ApplicationControl(
      'http://tizen.org/appcontrol/operation/edit',
      null,
      'application/x-bluetooth-visibility'
    );

    function launchVisibilityError(error) {
      alert(
        'An error occurred: ' +
          error.name +
          '. Please enable Bluetooth visibility through the Settings application.'
      );
    }

    var serviceVisibilityReply = {
      /* Called when the launched application reports success */
      onsuccess: function (data) {
        //alert('Bluetooth is ' + (adapter.visible ? 'now discoverable.' : 'still not visible.'));
        findDevices();
      },
      /* Called when launched application reports failure */
      onfailure: function () {
        alert('Bluetooth Settings application reported failure.');
      }
    };

    tizen.application.launchAppControl(
      bluetoothVisibilityAppControl,
      null,
      null,
      launchVisibilityError,
      serviceVisibilityReply
    );
  }

  function findDevices() {
    var discoverDevicesSuccessCallback = {
      onstarted: function () {
        console.log('Device discovery started');
      },
      ondevicefound: function (device) {
        console.log(
          'Found device - name: ' + device.name + ', Address: ' + device.address
        );
        addBluetoothDevice(device);
        for (let i = 0; i < device.uuids.length; i++) {
          // console.log('  UUID: ' + device.uuids[i]);
        }
      },
      ondevicedisappeared: function (address) {
        console.log('Device disappeared: ' + address);
      },
      onfinished: function (devices) {
        console.log('Found Devices');
        for (var i = 0; i < devices.length; i++) {
          // console.log(' Name: ' + devices[i].name + ', Address: ' + devices[i].address);
        }
        // console.log('Total: ' + devices.length);

        document.getElementById('header_bluetooth').innerHTML =
          'Bluetooth<br>устройства';
      }
    };

    adapter.discoverDevices(discoverDevicesSuccessCallback, function (e) {
      alert('Failed to search devices: ' + e.message + '(' + e.name + ')');
    });
  }

  function getKnownDevices() {
    function onGotDevices(devices) {
      console.log('Known devices');
      for (var i = 0; i < devices.length; i++) {
        console.log(
          ' Name: ' + devices[i].name + ', Address: ' + devices[i].address
        );
        addBluetoothDevice(devices[i]);
      }
      console.log('Total: ' + devices.length);
    }

    function onError(e) {
      console.log('Error: ' + e.message);
    }

    adapter.getKnownDevices(onGotDevices, onError);
  }

  function breakDevices() {
    for (var i = 0; i < bluetoothDevices.length; i++) {
      adapter.destroyBonding(bluetoothDevices[i].address);
      console.log(
        'Destroy bonding with ' +
          bluetoothDevices[i].name +
          ' (' +
          bluetoothDevices[i].address +
          ')'
      );
    }
  }

  function bindToDevice() {
    function onBondingSuccessCallback(device) {
      alert('A bond is created - name: ' + device.name);
      connectToDevice();
    }

    function onErrorCallback(e) {
      alert('Cannot create a bond, reason: ' + e.message);
    }

    adapter.createBonding(
      bluetoothDevices[selectedBluetoothDeviceIndex].address,
      onBondingSuccessCallback,
      onErrorCallback
    );
  }

  function connectToDevice() {
    // 00001101-0000-1000-8000-00805F9B34FB - протез (физический)
    // 9f2c4ce3-0801-42d1-ba41-1a6bfe1ccb70 - симулятор (на Android)
    var SERVICE_UUID = '00001101-0000-1000-8000-00805F9B34FB';

    bluetoothDevices[selectedBluetoothDeviceIndex].connectToServiceByUUID(
      SERVICE_UUID,
      function (sock) {
        console.log('Socket connected: ' + sock.peer.address);
        bluetoothSocket = sock;
        bluetoothSocket.onmessage = function () {
          let tmp_bytes = bluetoothSocket.readData();
          if (tmp_bytes[2] === 0x29) {
            // Данные миограммы
            let chartValue1 = tmp_bytes[5].toString(16) + tmp_bytes[6].toString(16);
            let chartValue2 = tmp_bytes[7].toString(16) + tmp_bytes[8].toString(16);
            updateSqueezeData(parseInt(chartValue1, 16) / 120);
            updateEnfeebleData(parseInt(chartValue2, 16) / 120);
            onGetClenchMyogram(parseInt(chartValue1, 16));
            onGetUnclenchMyogram(parseInt(chartValue2, 16))
          } else if (tmp_bytes[2] === 0x27) {
            // Разжатие
            const commandValue = parseInt(tmp_bytes[5].toString(16) + tmp_bytes[6].toString(16), 16);
            if (!alternate) {
              enfeebleThreshold = Math.max(0, Math.min(180, 180 - (commandValue) / 16));
              document.querySelector(`.page__threshold--enfeeble`).style.top = `${89 + enfeebleThreshold}px`;
            } else {
              squeezeThreshold = Math.max(0, Math.min(180, 180 - (commandValue) / 16));
              document.querySelector(`.page__threshold--squeeze`).style.top = `${89 + squeezeThreshold}px`;
            }
            onGetUnclenchThreshold(commandValue);
          } else if (tmp_bytes[2] === 0x26) {
            // Сжатие
            const commandValue = parseInt(tmp_bytes[5].toString(16) + tmp_bytes[6].toString(16), 16);
            if (alternate) {
              enfeebleThreshold = Math.max(0, Math.min(180, 180 - (commandValue) / 16));
              document.querySelector(`.page__threshold--enfeeble`).style.top = `${89 + enfeebleThreshold}px`;
            } else {
              squeezeThreshold = Math.max(0, Math.min(180, 180 - (commandValue) / 16));
              document.querySelector(`.page__threshold--squeeze`).style.top = `${89 + squeezeThreshold}px`;
            }
            onGetClenchThreshold(commandValue);
          } else if (tmp_bytes[2] === 0x28) {
            // Сила хвата
            const commandValue = parseInt(tmp_bytes[5].toString(16) + tmp_bytes[6].toString(16), 16);
            gripForce = Math.max(0, Math.min(100, Math.round(commandValue / 30)));
            $('#force-slider').roundSlider('setValue', gripForce);
            document.getElementById("info_force").innerText = Math.round(commandValue / 30) + '%';
          } else if (tmp_bytes[2] === 0x31) {
            // Заряд аккумулятора
            const commandValue = parseInt(tmp_bytes[5].toString(16), 16);
            document.getElementById("info_power").innerText = commandValue + '%';
            onGetBatteryCharge(commandValue);
          } else if (tmp_bytes[2] === 0x2F) {
            // Блокировка протеза
            if (tmp_bytes[5] === 0x03) {
              locked = true;
              showLocked();
            } else if (tmp_bytes[5] === 0x00 || tmp_bytes[5] === 0x01) {
              locked = false;
              showLocked();
            }
          }
        };

        isNeedToUploadOnlyHumanActivity = false;
        page = `top1`;
        render();
        let timerId = setInterval(requestMyogramBluetoothData, 1000);
        requestBrushOptionsViaBluetooth();
        const requestBrushOptionsInterval = setInterval(requestBrushOptionsViaBluetooth, 10000);
      },
      function (error) {
        alert('Error while connecting: ' + error.message);
        adapter.destroyBonding(
          bluetoothDevices[selectedBluetoothDeviceIndex].address
        );
        startBluetooth();
      }
    );
  }

  function requestMyogramBluetoothData() {
    if (page === 'left1' || page === 'left2') {
      //addBluetoothCommandToConveyor('0xFA 0x01 0x29 0x95');
    }
  }

  function startBluetooth() {
    bluetoothDevices = [];
    document.getElementById('header_bluetooth').innerHTML =
      'Поиск Bluetooth<br>устройств';
    document.getElementById(`top2`).addEventListener(`click`, onClickDevice);
    clearBluetoothDevices();
    //getKnownDevices();
    findDevices();
  }

  if (adapter.powered) {
    console.log('Bluetooth is already enabled');
    startBluetooth();
  } else {
    console.log('Try to launch the Bluetooth Settings application');
    enableBluetooth();
  }
};

let triggerSendThreshold = true;

function requestBrushOptionsViaBluetooth() {
  if (page === 'center' || page === 'top1' || page === 'left1') {
    // Разжатие
    if (triggerSendThreshold) {
      //addBluetoothCommandToConveyor('0xFA 0x01 0x27 0x8A');
      triggerSendThreshold = false;
    }
  }
  if (page === 'center' || page === 'top1' || page === 'left2') {
    // Сжатие
    if (triggerSendThreshold) {
      //addBluetoothCommandToConveyor('0xFA 0x01 0x26 0xBB');
      triggerSendThreshold = false;
    }
  }
  if (page === 'center' || page === 'top1' || page === 'right2') {
    // Сила хвата
    //addBluetoothCommandToConveyor('0xFA 0x01 0x28 0xA4');
  }
  if (page === 'center' || page === 'top1' || page === 'right3') {
    // Сила хвата
    //addBluetoothCommandToConveyor('0xFA 0x01 0x2F 0x33');
  }
  if (page === 'center' || page === 'top1') {
    // Заряд аккумулятора
    //addBluetoothCommandToConveyor('0xFA 0x01 0x31 0x46');
  }
}

const sendBluetoothMessage = (message) => {
  let tmp_bytes = message.split(' ').map(function (s) {
    return parseInt(s, 16);
  });
  if (bluetoothSocket != null) {
    bluetoothSocket.writeData(tmp_bytes);
  }
};

bluetoothApi();
