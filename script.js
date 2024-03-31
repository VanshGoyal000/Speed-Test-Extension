function reloadPopup() {
    location.reload();
}

function showProgressMessage(msg) {
    console.log(msg);
    var progressElement = document.getElementById("progress");
    if (progressElement) {
        progressElement.innerHTML = Array.isArray(msg) ? msg.join("<br>") : msg;
    }
}

function initiateSpeedDetection() {
    showProgressMessage("Loading, please wait...");
    setTimeout(measureConnectionSpeed, 1);
}

function measureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();

    download.onload = function () {
        endTime = Date.now();
        showResults();
    };

    download.onerror = function () {
        showProgressMessage("Invalid image or error downloading");
    };

    startTime = Date.now();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedMbps = ((bitsLoaded / duration) / (1024 * 1024)).toFixed(2);
        showProgressMessage(speedMbps + " Mbps");
    }
}

document.getElementById("refreshButton").addEventListener("click", reloadPopup);

if (window.addEventListener) {
    window.addEventListener('load', initiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', initiateSpeedDetection);
}
