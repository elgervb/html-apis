import WebWorker from './webworkers.worker';

/* global document */
function log(msg) {
    const container = document.querySelector('#log');
    const node = document.createElement('p');
    node.innerHTML = msg;

    container.appendChild(node);
    /* eslint-disable no-console */
    console.log(msg);
    /* eslint-enable */
}

if (window.Worker) {
    const worker = new WebWorker();

    worker.onmessage = (e) => {
        log(`Client: Base64 encode <em>${e.data.text}</em> into <em>${e.data.result}</em>`);
    };

    const input = document.querySelector('#text');
    input.value = Math.random().toString(36).substr(2, 10);

    document.querySelector('#generate').addEventListener('click', () => {
        worker.postMessage(input.value);
        log(`Sending ${input.value} to worker.`);

        input.value = Math.random().toString(36).substr(2, 10);
    });
}

