/* global onmessage */
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str)
        .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)
    ));
}

/* eslint-disable no-global-assign */
onmessage = (e) => {
    /* eslint-disable no-console */
    console.log('Worker: got ', e.data);
    /* eslint-enable */
    const result = b64EncodeUnicode(e.data);
    setTimeout(() => {
        postMessage({
            result,
            text: e.data,
        });
    }, ((Math.random() * (2 - 1)) + 1) * 1000);
};
/* eslint-enable */
