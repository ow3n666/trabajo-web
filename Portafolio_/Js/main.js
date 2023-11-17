const startDownloadButton = document.getElementById('start-download');
const progressElement = document.getElementById('progress');

startDownloadButton.addEventListener('click', () => {
    startDownloadButton.disabled = true;

    //Crear un Web Worker para descargar el archivo
    const worker = new Worker('/Js/download-worker.js');

    worker.onmessage = (event) => {
        const message = event.data;

        if(message.type === 'progress'){
            const percent = (message.value / message.total) * 100;
            progressElement.textContent = 'Progreso: ${percent.toFixed(2)}%';
        } else if(message.type === 'complete'){
            progressElement.textContent = 'Descarga completa';
            startDownloadButton.disabled = false;
        }
    };
    worker.postMessage('start'); //Iniciar la descarga
})