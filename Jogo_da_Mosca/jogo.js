
// função que calcula as dimensões da janela visível

var altura = 0
var largura = 0
var vidas = 1
var tempo = 30

var criaMoscaTempo = 1500

var nivel = window.location.search.replace('?', '')

if(nivel === 'normal') {
    var criaMoscaTempo = 1500
} else if(nivel === 'dificil') {
    var criaMoscaTempo = 1000
} else if(nivel === 'profissional'){
    var criaMoscaTempo = 750
}

function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000)

// função que calcula as coordenadas da nova mosca

function posicaoRandomica() {

    // remover o mosquito anterior (caso exista)

    if(document.getElementById('mosquito')) {

        if(vidas > 2) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            if(document.getElementById('mosquito').src.endsWith("mosca.png")){
                document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
                vidas++ 
            }
        }
        document.getElementById('mosquito').remove()
        
    }

    // ajustes para evitar mostrar a imagem da mosca incompleta
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // criar o novo mosquito no html
    var mosquito = document.createElement('img')
    mosquito.src = "imagens/mosca.png"
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio(mosquito)
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        if(document.getElementById('mosquito').src.endsWith("sapo.png")){
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
            vidas++ 
        }
        if(vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        }
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio(mosquito) {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
        case 2:
            mosquito.src = "imagens/sapo.png"
            return ''
    }
}