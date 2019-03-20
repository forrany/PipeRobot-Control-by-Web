
export const utils = {
    streamAds() {
        var url = document.location.href;
        var reg = /http:\/\/\d+\.\d+\.\d+.\d+:\d{4}\/content\/(.*)/
        var result = decodeURIComponent(url.match(reg)[1]);
        return result;
    },
    clientCheck() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return 'Moboil';
        } else {
            return 'PC'
        }
    },
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    },
    rad2deg(rad) {
        return rad * (180 / Math.PI);
    },
    debounce(func,wait,immedate) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            if(timeout) {clearTimeout(timeout)};
            if(immedate) {
                var callnow = !timeout;
                timeout = setTimeout(() => {
                    timeout = null;
                }, wait);
                if(callnow) {
                    func.apply(context,args);
                }
            } else {
                timeout = setTimeout(() => {
                    func.apply(context,args)
                }, wait);
            }
        }
    }
}