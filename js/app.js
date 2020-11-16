const choose = document.querySelectorAll('.choose')

let points;
let opt;
let animationFight;

if(!localStorage.getItem('points')){
    points = 0
}else {
    points = parseInt(localStorage.getItem('points'))
    $('.score-wins').text(points)
}

choose.forEach(el => {
    el.addEventListener('click', function (e) {
        const ene = randomChoose()
        opt = this

        checkWhoWin(opt, ene)

        animationFight = gsap.to($('.align'), { scale: 0,  onComplete: () => showFight(ene, opt) })
    })
})

function showFight(ene, opt) {
    // layout styles
    setStyles('.btn-play', {'display': 'flex', 'justify-content': 'center', 'align-items': 'center'})
    $('.align').css('display', 'none')
    $('.game').css('flex-direction', 'column')
    $('.container-fight').css('display', 'flex')

    // you style
    setStyles('.you', {
        'height': $(opt).css('height'),
        'padding': $(opt).css('padding'),
        'border-radius': $(opt).css('border-radius'),
        'background': $(opt).css('background'),
        'border': $(opt).css('border'),
        'cursor': $(opt).css('cursor')
    })
    $('.you').attr({'src': opt.attributes[1].value})

    // house style
    setStyles('.house', {
        'height': $(ene).css('height'),
        'padding': $(ene).css('padding'),
        'border-radius': $(ene).css('border-radius'),
        'background': $(ene).css('background'),
        'border': $(ene).css('border'),
        'cursor': $(ene).css('cursor')
    })
    $('.house').attr('src', ene.attributes[1].value)

    // animate you, ene
    gsap.fromTo($('.you'), {scale: 0}, {scale: 1})
    gsap.fromTo($('.house'), {scale: 0}, {scale: 1})

    function setStyles(ele, arr) {
        for (const key in arr) {
            $(ele).css(key, arr[key])
        }  
    }
}

function randomChoose() {
    const n = Math.round(Math.random() * 2)
    return choose[n]
}

function checkWhoWin(opt, ene){
    const myOpt = opt.classList[0]
    const eneOpt = ene.classList[0]

    if(myOpt === eneOpt){
        $('.who-win').text('draw')
    }else if(myOpt == 'rock' && eneOpt == 'scissors' || myOpt == 'scissors' && eneOpt == 'paper' || myOpt == 'paper' && eneOpt == 'rock'){
        $('.who-win').text('YOU WIN')
        points++
        localStorage.setItem('points', points)
        $('.score-wins').text(points)
    }
    if(myOpt == 'rock' && eneOpt == 'paper' || myOpt == 'scissors' && eneOpt == 'rock' || myOpt == 'paper' && eneOpt == 'scissors'){
        $('.who-win').text('YOU LOSE')
        points == 0 ? 0 :  points--
        localStorage.setItem('points', points)

        $('.score-wins').text(points)
    }

}

// rules modal
$('.close').on('click', () => {
    $('.rules-modal').css('display', 'none')
    $('.all').css('display', 'none')
})
$('.rules').on('click', () => {
    $('.rules-modal').css('display', 'block')
    $('.all').css('display', 'block')
})
// rules modal

// btn play-again
$('.play-again').on('click', () => {
    $('.container-fight').hide()
    $('.align').css('display', 'block')
    $('.game').css('flex-direction', '')
    $('.btn-play').css('display', 'none')
    animationFight.reverse()
})

