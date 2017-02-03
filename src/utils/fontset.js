function setFontSize () {
    const domEl = window.document.documentElement
    const dpr = window.devicePixelRatio || 1
    const size = domEl.clientWidth / 10

    domEl.style.fontSize = size + 'px'
    domEl.setAttribute('data-dpr', dpr)
}

setFontSize()

window.addEventListener('resize', setFontSize)