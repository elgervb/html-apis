/**
 * Class for loading dynamic content
 */
export default class StaticLoader {

    /**
     * Load javascript dynamicaly on the page
     *
     * @param url the url of the javascript resource to loading
     *
     * @return HTMLScriptElement fileref the script tag
     */
    static loadJs(url) {
        const fileref = document.createElement('script');
        fileref.setAttribute('type', 'text/javascript');
        fileref.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(fileref);

        return fileref;
    }

}
