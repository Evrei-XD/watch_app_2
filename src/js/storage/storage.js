/** Ключ для извлечения из хранилища данных о состоянии протеза. */
const STORAGE_DATA_KEY = 'status_data';
/** Ключ для извлечения из хранилица времени последнего сбора данных о протезе. */
const STORAGE_TIME_KEY = 'status_time';

/**
 * Функция сохранения списка с JSON данными о статусе протеза в хранилище.
 */
function saveToStorage() {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(listStatistics));
    localStorage.setItem(STORAGE_TIME_KEY, JSON.stringify(statisticsRequestLastTime));
}

/**
 * Функция подгрузки списка с JSON данными о статусе протеза из хранилища.
 */
function loadFromStorage() {
    const localData = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY));
    if (localData != null) {
        listStatistics = localData;
    }
    statisticsRequestLastTime = JSON.parse(localStorage.getItem(STORAGE_TIME_KEY));
}
