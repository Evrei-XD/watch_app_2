/** Период между отправкой данных на сервер (в миллисекундах). */
const PERIOD_DATA_SENDING = 10 * 1000;
/** Период между проверками необходимости отправки данных на сервер (в миллисекундах). */
const PERIOD_CHECK_STATUS = 3000;
/** Время, отведённое на сбор данных с протеза (в миллисекундах) */
const TIME_DATA_REQUEST = 8000;
/** Время начала сбора данных с протеза (timestamp в миллисекундах) */
let timeDataStartRequest;
/** Список данных о состоянии протеза. */
let listStatistics = {
    sn: "TEST_ST2_SW_00012",
    data: []
};
/** Информация о текущем состоянии протеза. */
let currentStatistics = {
    tm: 1594318181,
    data: {
        "1_48": {
            fm: 0,
            uptime: Math.round(PERIOD_DATA_SENDING / 1000),
            comp_val: -1,
            de_comp_val: -1,
            col_steps: -1
        },
        "2_47": {
            ch1: -1,
            ch2: -1,
            ch4: -1,
            ch5: -1,
            ch6: -1,
            ch7: -1
        },
        "3_47": {
            ch1: -1,
            ch2: -1,
            ch4: -1,
            ch5: -1,
            ch6: -1,
            ch7: -1
        },
        "4_46": {
            ch: -1
        }
    }
};
/** Время последнего получения информации о состоянии протеза. */
let statisticsRequestLastTime;
/** Интервал для проверки заполненности информации о состоянии протеза. */
let completenessInterval;
/** Флаг для отпределение типа собираемых данных (true - только физическая активность пользователя). */
let isNeedToUploadOnlyHumanActivity = false;

/**
 * Функция, вызываемая при получении порогового значения для сжатия протеза.
 */
function onGetClenchThreshold(threshold) {
    currentStatistics.data["1_48"].comp_val = threshold;
}

/**
 * Функция, вызываемая при получении порогового значения для разжатия протеза.
 */
function onGetUnclenchThreshold(threshold) {
    currentStatistics.data["1_48"].de_comp_val = threshold;
}

/**
 * Функция, вызываемая при получении данных о сжатии протеза.
 */
function onGetClenchMyogram(myogramData) {
    for (let i = 1; i < 8; i++) {
        if (currentStatistics.data["2_47"]["ch" + i] === -1) {
            currentStatistics.data["2_47"]["ch" + i] = myogramData;
            break;
        }
    }
}

/**
 * Функция, вызываемая при получении данных о разжатии протеза.
 */
function onGetUnclenchMyogram(myogramData) {
    for (let i = 1; i < 8; i++) {
        if (currentStatistics.data["3_47"]["ch" + i] === -1) {
            currentStatistics.data["3_47"]["ch" + i] = myogramData;
            break;
        }
    }
}

/**
 * Функция, вызываемая при получении уровня заряда аккумулятора протеза.
 */
function onGetBatteryCharge(charge) {
    currentStatistics.data["4_46"].ch = charge;
}

/**
 * Функция, вызываемая при получении количества шагов пользователя.
 */
function onGetHumanActivityPedometer(steps) {
    currentStatistics.data["1_48"].col_steps = steps;
}

/** Функция, вызываемая при сборе всех необходимых данных для отправки. */
function onDataCompleteness() {
    statisticsRequestLastTime = Date.now();
    currentStatistics.tm = Math.floor(statisticsRequestLastTime / 1000);
    listStatistics.data.push(currentStatistics);
    saveToStorage();
    currentStatistics = {
        tm: 1594318181,
        data: {
            "1_48": {
                fm: 0,
                uptime: Math.round(PERIOD_DATA_SENDING / 1000),
                comp_val: -1,
                de_comp_val: -1,
                col_steps: currentStatistics.data["1_48"].col_steps
            },
            "2_47": {
                ch1: -1,
                ch2: -1,
                ch4: -1,
                ch5: -1,
                ch6: -1,
                ch7: -1
            },
            "3_47": {
                ch1: -1,
                ch2: -1,
                ch4: -1,
                ch5: -1,
                ch6: -1,
                ch7: -1
            },
            "4_46": {
                ch: -1
            }
        }
    };
    clearInterval(completenessInterval);
    completenessInterval = null;
}

/**
 * Функция проверки полноты информации о состоянии протеза.
 */
function checkCompleteness() {
    let isCompleteness = true;
    if (isNeedToUploadOnlyHumanActivity) {
        if (currentStatistics.data["1_48"].col_steps === -1) {
            isCompleteness = false;
        } else {
            currentStatistics = {
                tm: 1594318181,
                data: {
                    "1_48": {
                        fm: 0,
                        uptime: currentStatistics.data["1_48"].uptime,
                        comp_val: -1,
                        de_comp_val: -1,
                        col_steps: currentStatistics.data["1_48"].col_steps
                    },
                    "2_47": {
                        ch1: -1,
                        ch2: -1,
                        ch4: -1,
                        ch5: -1,
                        ch6: -1,
                        ch7: -1
                    },
                    "3_47": {
                        ch1: -1,
                        ch2: -1,
                        ch4: -1,
                        ch5: -1,
                        ch6: -1,
                        ch7: -1
                    },
                    "4_46": {
                        ch: -1
                    }
                }
            };
        }
    } else {
        if (currentStatistics.data["1_48"].comp_val === -1) {
            addBluetoothCommandToConveyor('0xFA 0x01 0x26 0xBB');
            isCompleteness = false;
        }
        if (currentStatistics.data["1_48"].de_comp_val === -1) {
            addBluetoothCommandToConveyor('0xFA 0x01 0x27 0x8A');
            isCompleteness = false;
        }
        for (let i = 1; i < 8; i++) {
            if (currentStatistics.data["2_47"]["ch" + i] === -1 || currentStatistics.data["3_47"]["ch" + i] === -1) {
                addBluetoothCommandToConveyor('0xFA 0x01 0x29 0x95');
                isCompleteness = false;
            }
        }
        if (currentStatistics.data["4_46"].ch === -1) {
            addBluetoothCommandToConveyor('0xFA 0x01 0x31 0x46');
            isCompleteness = false;
        }
    }
    if (isCompleteness || Date.now() >= timeDataStartRequest + TIME_DATA_REQUEST && !isNeedToUploadOnlyHumanActivity) {
        onDataCompleteness();
    }
}

/**
 * Функция проверки необходимости обновления данных о протезе.
 */
function checkNeedToRequestStatistics() {
    const currentTimestamp = Date.now();
    if (statisticsRequestLastTime == null || currentTimestamp - statisticsRequestLastTime >= PERIOD_DATA_SENDING) {
        if (completenessInterval == null) {
            timeDataStartRequest = Date.now();
            completenessInterval = setInterval(checkCompleteness, 500);
        }
    }
}

/**
 * Функция проверки необходимости загрузки данных на сервер.
 */
function checkNeedToUpload() {
    if (listStatistics.data.length > 0) {
        if (checkInternetConnection()) {
            console.log(listStatistics);
            // noinspection JSUnusedLocalSymbols
            sendDataToServer(listStatistics).then((data) => {
                if (data !== 'ERROR') {
                    console.log("Data send to server " + data.tm);
                    listStatistics = {
                        sn: "TEST_ST2_SW_00012",
                        data: []
                    };
                    saveToStorage();
                } else {
                    console.log("Error data send to server");
                }
            });
        }
        else {
            saveToStorage();
        }
    }
}

/**
 * Функция запуска сбора информации о протезе.
 */
function startStatistics() {
    // Подгрузка данных о состоянии протеза из кэша
    loadFromStorage();
    checkNeedToRequestStatistics();
    // noinspection JSUnusedLocalSymbols
    const statisticsRequestInterval = setInterval(checkNeedToRequestStatistics, PERIOD_DATA_SENDING);
    // Проверка необходимости выгрузки данных на сервер
    checkNeedToUpload();
    // Установка таймера, который раз в PERIOD_CHECK_STATUS вызывает функцию проверки необходимости отправки данных
    // noinspection JSUnusedLocalSymbols
    const statisticsUploadInterval = setInterval(checkNeedToUpload, PERIOD_CHECK_STATUS);
}

(() => {
    isNeedToUploadOnlyHumanActivity = true;
    startStatistics();
})();
