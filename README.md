
# HTML API's

playground for HTML API's

## [see the slides](https://slides.com/elgervanboxtel/html5-api-s/)

# DEMOS

 * http://caniuse.com/#feat=online-status
 * http://caniuse.com/#feat=indexeddb
 * http://caniuse.com/#search=Selection
 * http://caniuse.com/#feat=webworkers
 * http://caniuse.com/#feat=namevalue-storage Web Storage
 * http://caniuse.com/#feat=websockets
 * http://caniuse.com/#feat=eventsource Server send events
 * http://caniuse.com/#feat=mutationobserver
 * http://caniuse.com/#feat=geolocation
 * http://caniuse.com/#search=canvas
 * http://caniuse.com/#feat=stream getUserMedia/Stream API
 * http://caniuse.com/#feat=push-api
 * http://caniuse.com/#feat=channel-messaging
 * http://caniuse.com/#feat=x-doc-messaging
 * http://caniuse.com/#feat=forms
 * http://caniuse.com/#feat=form-validation
 * http://caniuse.com/#feat=filereader
 * http://caniuse.com/#feat=file
 * http://caniuse.com/#feat=page-transition-events
 * http://caniuse.com/#feat=history pushstate
 * http://caniuse.com/#search=audio
 * http://caniuse.com/#search=video
 * http://caniuse.com/#feat=notifications
 * http://caniuse.com/#feat=contenteditable
 * http://caniuse.com/#feat=dragndrop
 * http://caniuse.com/#feat=focusin-focusout-events
 * http://caniuse.com/#feat=registerprotocolhandler
 * http://caniuse.com/#feat=web-animation
 * http://caniuse.com/#feat=fullscreen
 * http://caniuse.com/#feat=screen-orientation
 * http://caniuse.com/#feat=pointerlock
 * http://caniuse.com/#feat=battery-status
 * http://caniuse.com/#feat=speech-synthesis
 * http://caniuse.com/#feat=pagevisibility

# PREREQUISITES

NodeJS V6.3.0

Linux: `apt-get install libnotify-bin` <br />
Mac OS: `brew install terminal-notifier`


# INSTALLATION

install node modules

`npm i`

# RUN

`npm start`

will start a live reloading webpack dev server on the port mentioned in the config of the package.json.

Default port = 4000

# PACKAGE

`npm run clean && npm run build`

will clean the previous build and make a new one inside `/build`

after having ran the build, we can check it by running `npm run start:prod`. This will run a server against the production build.
