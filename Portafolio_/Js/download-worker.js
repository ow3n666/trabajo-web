self.addEventListener('message', (event) => {
    if(event.data === 'start'){
        simulateLargeDownload();
    }
});

function simulateLargeDownload(){
    //Simular una descarga de un archivo grande
    const totalSize = 100 * 1024 * 1024; // 100MB
    const chunkSize = 1024 * 1024; // 1 MB por chunk

    let downloadSize = 0;

    while(downloadSize < totalSize){
        downloadSize += chunkSize;

        //Enviar el progreso al hilo principal
        self.postMessage({type: 'progress', value: downloadSize, total: totalSize});
    }

    //Informar al hilo principal que la descarga está completa
    self.postMessage({type: 'complete'});
}