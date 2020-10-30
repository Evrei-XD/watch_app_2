/** Разрешение на доступ к датчикам устройства. */
const HUMAN_ACTIVITY_PERMISSION = "http://tizen.org/privilege/healthinfo";
/** Доступен ли сбор данных об активности пользователя. */
let isAvailableHumanActivity = false;
/** (устаревшее) Временной промежуток для извлечения данных. */
let queryHumanActivity = {
    startTime: 0,
    endTime: 1
};
/** Общее количество шагов пользователя. */
let countHumanSteps = -1;

/**
 * Функция запуска сервиса с активностью пользователя.
 */
function startHumanActivity() {
    // Проверяем наличие разрешения на доступ к датчикам
    // noinspection JSUnresolvedVariable, JSUnresolvedFunction
    const permission = tizen.ppm.checkPermission(HUMAN_ACTIVITY_PERMISSION);
    if (permission === 'PPM_ALLOW') {
        isAvailableHumanActivity = true;
        setPedometerListener();
    } else {
        requestHumanActivityPermission();
    }
}

/**
 * Функция запроса на доступ к датчикам устройства.
 */
function requestHumanActivityPermission() {
    // noinspection JSUnresolvedVariable, JSIgnoredPromiseFromCall
    tizen.ppm.requestPermission(HUMAN_ACTIVITY_PERMISSION,
        onSuccessHumanActivityPermission, onErrorHumanActivityPermission);
}

/**
 * Функция, вызываемая при успешном получении разрешения на доступ к датчикам устройства.
 */
function onSuccessHumanActivityPermission() {
    isAvailableHumanActivity = true;
    setPedometerListener();
}

/**
 * Функция, вызываемая при неудачном получении разрешения на доступ к датчикам устройства.
 */
function onErrorHumanActivityPermission(error) {
    console.log(error);
}

/**
 * Функция, вызываемая при обновлении состояния активности пользователя.
 */
function onUpdateHumanActivity(data) {
    // noinspection JSUnresolvedVariable
    countHumanSteps = data.accumulativeTotalStepCount;
    console.log("Count Steps: " + countHumanSteps);
    onGetHumanActivityPedometer(countHumanSteps);
}

/**
 * Функция установки слушателя на обновление состояния активности пользователя.
 */
function setPedometerListener() {
    // noinspection JSUnresolvedVariable, JSUnresolvedFunction
    tizen.humanactivitymonitor.setAccumulativePedometerListener(onUpdateHumanActivity);
}

/** (устаревшее) Функция установки временного промежутка для извлечения данных. */
function setQueryHumanActivity() {
    let time = new Date();
    queryHumanActivity['startTime'] = (new Date(time.getFullYear(), time.getMonth(), time.getDate())).getTime() / 1000;
    queryHumanActivity['endTime'] = Math.floor(Date.now() / 1000);
}

// noinspection JSUnusedGlobalSymbols
/**
 * (устаревшее) Функция получения данных об активности пользователя.
 */
function readHumanActivityData() {
    setQueryHumanActivity();
    try {
        // noinspection JSUnresolvedVariable, JSUnresolvedFunction
        tizen.humanactivitymonitor.readRecorderData('PEDOMETER', queryHumanActivity,
            onSuccessReadHumanActivity, onErrorReadHumanActivity);
    } catch(error) {
        console.log(error)
    }
}

/**
 * (устаревшее) Функция, вызываемая при успешном получении данных о количестве шагов пользователя.
 */
function onSuccessReadHumanActivity(data) {
    countHumanSteps = 0;
    for (let i = 0; i < data.length; i++) {
        // noinspection JSUnresolvedVariable
        countHumanSteps += data[i].totalStepCount;
        // noinspection JSUnresolvedVariable
        // console.log('Step Count: ' + data[i].totalStepCount);
    }
}

/**
 * (устаревшее) Функция, вызываемая при неудачном получении данных о количестве шагов пользователя.
 */
function onErrorReadHumanActivity(error) {
    console.log(error);
}

(() => {
    startHumanActivity();
})();
