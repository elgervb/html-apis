
export default class GeoLocation {

    /**
     * @param {function(Coordinates) : void} onSuccess
     * @param {function(string) : void} onError
     */
    constructor(onSuccess, onError) {
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.onSuccess(position);
            }, (err) => {
                let msg;
                switch (err.code) {
                case err.PERMISSION_DENIED :
                    msg = 'Permission denied';
                    break;
                case err.POSITION_UNAVAILABLE :
                    msg = 'Position unavailable';
                    break;
                case err.TIMEOUT :
                    msg = 'Timeout while determining position';
                    break;
                default :
                    msg = 'Unknown error occured';
                }
                this.onError(msg);
            });
        } else {
            this.onError('HTML 5 GeoLocation API not supported');
        }
    }

}
