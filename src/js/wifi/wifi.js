/** URL сервера на который отправляются данные. */
const SERVER_URL = 'https://dev-api.motorica.org/';
/** Путь для POST запроса на сервер для добавления данных. */
const SERVER_METHOD = 'v2/parser';

/**
 * Функция проверки наличия доступа в Интернет.
 * @return {boolean} есть ли доступ в Интернет.
 */
function checkInternetConnection() {
    return navigator.onLine;
}

/**
 * Функция отправки данных о статусе протеза на сервер.
 * @param {Object} data объект с данными о статусе протеза.
 */
async function sendDataToServer(data) {
    let urlParams = new URLSearchParams();
    urlParams.append('data', JSON.stringify(data));
    const response = await fetch(SERVER_URL + SERVER_METHOD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlParams
    });
    return await response.json();
}
