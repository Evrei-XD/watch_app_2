function runInBackground() {
    tizen.power.request("CPU", "CPU_AWAKE");
}

(() => {
    runInBackground();
})();
