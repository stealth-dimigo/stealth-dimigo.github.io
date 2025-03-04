var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = true;
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function hideScrollBar() {
    document.body.style.overflow = 'hidden';
}

function showScrollBar() {
    document.body.style.overflow = 'scroll';
}

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

window.onload = () => {
    boxes = document.querySelectorAll('.scroll_on');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('scroll_active');

                    // observer.unobserve(entry.target);
                }, 50); // delay
            } else {
                entry.target.classList.remove('scroll_active');
            }
        });
    }, options);

    boxes.forEach(box => {
        observer.observe(box);
    });

}

window.onpageshow = function (event) {
    // history.back() checker

    let isBack = event.persisted || (window.performance && window.performance.navigation.type == 2);
    if (isBack || (window.scrollY > 0)) {
        Array.from(document.querySelectorAll('.enterAnimationLogo')).forEach(ele => {
            ele.classList.remove('enterAnimationLogo')
        })
        Array.from(document.querySelectorAll('.enterAnimationElement')).forEach(ele => {
            ele.classList.remove('enterAnimationElement')
        })

    } else {
        // var PageLocation = document.querySelector('body').offsetTop;
        // document.querySelector('html').scrollTo({ top: 0, behavior: 'smooth' });
        disableScroll();
        setTimeout(enableScroll, 1600) // -0.2s
    }
}