const debug001 = $elem('#debug001');
const debug002 = $elem('#debug002');

debug001.addEventListener('click', () => {
    carrEye = naveyeiconElem.getAttribute('src');
    (carrEye === eyeOpen) ?
        naveyeiconElem.setAttribute('src', eyeClose)
        : naveyeiconElem.setAttribute('src', eyeOpen);
});

debug002.addEventListener('click', () => {

});
