let oldPushState = history.pushState;

history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    return ret;
};

window.addEventListener('popstate', function () {
    window.location.reload();
});

require('bootstrap/dist/js/bootstrap.bundle');
require('./components/contact-form');
require('./components/voting-subscribe');
require('./components/competitors-details');
