
var Pool = (function ()
{

    var create = function (type, size)
    {
        var obj = Object.create(def);
        obj.init(type, size);

        return obj;
    };

    //Definição da nave:

    var def =
            {
                _type: null,
                _size: null,
                _pointer: null,
                _elements: null,

                init: function (type, size)
                {
                    this._type = type;
                    this._size = size;
                    this._pointer = size;
                    this._elements = [];

                    var i = 0;
                    var length = this._size;

                    for (i; i < length; ++i)
                    {
                        this._elements[i] = this._type.create();
                    }
                },

                getElement: function ()
                {
                    if (this._pointer > 0)
                        return this._elements[--this._pointer];

                    return null;
                },

                disposeElement: function (obj)
                {
                    this._elements[this._pointer++] = obj;
                }
            };

    return {create: create};
}());


var Vec2D = (function ()
{
    var create = function (x, y)
    {
        var obj = Object.create(def);
        obj.setXY(x, y);

        return obj;
    };

    //Vec2D definition:

    var def =
            {
                _x: 1,
                _y: 0,

                getX: function ()
                {
                    return this._x;
                },

                setX: function (value)
                {
                    this._x = value;
                },

                getY: function ()
                {
                    return this._y;
                },

                setY: function (value)
                {
                    this._y = value;
                },

                setXY: function (x, y)
                {
                    this._x = x;
                    this._y = y;
                },

                getLength: function ()
                {
                    return Math.sqrt(this._x * this._x + this._y * this._y);
                },

                setLength: function (length)
                {
                    var angle = this.getAngle();
                    this._x = Math.cos(angle) * length;
                    this._y = Math.sin(angle) * length;
                },

                getAngle: function ()
                {
                    return Math.atan2(this._y, this._x);
                },

                setAngle: function (angle)
                {
                    var length = this.getLength();
                    this._x = Math.cos(angle) * length;
                    this._y = Math.sin(angle) * length;
                },

                add: function (vector)
                {
                    this._x += vector.getX();
                    this._y += vector.getY();
                },

                sub: function (vector)
                {
                    this._x -= vector.getX();
                    this._y -= vector.getY();
                },

                mul: function (value)
                {
                    this._x *= value;
                    this._y *= value;
                },

                div: function (value)
                {
                    this._x /= value;
                    this._y /= value;
                }
            };

    return {create: create};
}());


//variaveis globais
var canvas;
var context;
var screenWidth;
var screenHeight;
var doublePI = Math.PI * 2;

var nivel = 1;
var musica = true;
var audio = true;

var nave;

var particlePool;
var particles;

var tiroPool;
var tiros;

var asteroidPool;
var asteroids;

var hScan;
var asteroidVelFactor = 0;

var pontosJogador = 0;


var gameOver = false;


var escudo = 100;
var escudoAtivo = true;

var escudoLargura;
var escudoAltura;
var escudoX;
var escudoY;

//vars do teclado

var keyLeft = false;
var keyUp = false;
var keyRight = false;
var keyDown = false;
var keySpace = false;

//Imagens 
var g_backgroundImg = new Image();
g_backgroundImg.src = "./imagens/bg_jogo.jpg";

var vida = new Image();
vida.src = "./imagens/nave.png";

//var g_backgroundImg = new Image();
//g_backgroundImg.src = "./imagens/bg_jogo.jpg";



var backgroundX = 0;


var SOM_TIRO = new Audio();
SOM_TIRO.src = "sons/shot.wav";
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

var SOM_ESCUDO = new Audio();
SOM_ESCUDO.src = "sons/shield.wav";
SOM_ESCUDO.volume = 0.2;
SOM_ESCUDO.load();


var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = "sons/explosao.mp3";
SOM_EXPLOSAO.volume = 0.4;
SOM_EXPLOSAO.load();

var SOM_GAMEOVER = new Audio();
SOM_GAMEOVER.src = "sons/gameover.wav";
SOM_GAMEOVER.volume = 0.2;
SOM_GAMEOVER.load();


var musicaAcao;

//var BITMAPS = true;

var x = 0;
var y = 0;
var velocidade = 1;

window.getAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback)
        {
            window.setTimeout(callback, 16.6);
        };


//evento executado ao carregar página
window.onload = function ()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // alert(screen.width);
    canvas.clientHeight = screen.height;
    canvas.clientWidth = screen.width;

    window.onresize();
    iniciarNivel();
    iniciarTeclado();
    fumacaNave();
    inicializaTiro();
    asteroidInit();
    inicializarNave();
    inicializarSom();
    inicializarImagens();
    loop();
};

//evento executado quando modificado o tamanho da janela
window.onresize = function ()
{
    if (!canvas)
        return;

    screenWidth = canvas.clientWidth;
    screenHeight = canvas.clientHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    // alert(screen.height);
    /*  canvas.clientHeight = screen.height;
     canvas.clientWidth = screen.width;
     
     // alert(canvas.clientHeight);
     
     screenWidth = canvas.clientWidth;
     screenHeight = canvas.clientHeight;
     
     //  canvas.width = screenWidth;
     //  canvas.height = screenHeight;
     
     //hScan = (screenHeight / 4) >> 0;  */
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function iniciarNivel() {
    //alert("Teste");
    ///   nivel = getUrlVars()["nivel"];
    //  alert(nivel);     

    nivel = document.getElementById("dificuldade").value;
    audio = document.getElementById("audio").value;
    musica = document.getElementById("musica").value;
    document.getElementById('player').innerHTML = document.getElementById("jog").value;

}

function iniciarTeclado()
{
    window.onkeydown = function (e)
    {
        switch (e.keyCode)
        {
            //key A ou TECLA DIRECIONAL PRA ESQUERDA
            case 65:
            case 37:

                keyLeft = true;
                break;

                //key W ou TECLA DIRECIONAL PRA CIMA
            case 87:
            case 38:

                keyUp = true;
                break;

                //key D ou TECLA DIRECIONAL PRA DIREITA
            case 68:
            case 39:

                keyRight = true;
                break;

                //key S ou TECLA DIRECIONAL PRA BAIXO
            case 83:
            case 40:

                keyDown = true;
                break;
                //key Space
            case 32:
            case 75:
                // DISPARA TIRO
                keySpace = true;
                break;

            case 27:
               // window.location.href = "http://localhost:8084/SpaceWarrior/dificuldade.jsp";
               window.location.href = "https://hspacewar.herokuapp.com/dificuldade.jsp";
        }

        e.preventDefault();
    };

    //executado quando pressionasse uma tecla
    window.onkeyup = function (e)
    {
        switch (e.keyCode)
        {
            //tecla A ou PARA ESQUERDA
            case 65:
            case 37:
                keyLeft = false;
                break;
                //tecla W ou PARA CIMA
            case 87:
            case 38:
                keyUp = false;
                break;
                //tecla D ou PARA DIREITA
            case 68:
            case 39:
                keyRight = false;
                break;
                //tecla S ou PARA BAIXO
            case 83:
            case 40:
                keyDown = false;
                break;
                //tecla ESPAÇO
            case 75:
            case 32:
                keySpace = false;
                break;
        }

        e.preventDefault();
    };
}

//Configura a quantidade de bolinhas de fumaça da nave
function fumacaNave()
{
    particlePool = Pool.create(Particle, 50);
    particles = [];
}

function inicializaTiro()
{
    tiroPool = Pool.create(Tiro, 40);
    tiros = [];
}

function asteroidInit()
{
    asteroidPool = Pool.create(Asteroid, 30);
    asteroids = [];
}

function inicializarNave()
{
    nave = Nave.create(screenWidth / 2, screenHeight / 2, this);
    pontosJogador = 0;

    // draw shield status on top of health bar:
    escudoLargura = 100;
    escudoAltura = Math.floor(10 / 3);
    escudoX = 10;
    escudoY = 10;
}

function inicializarSom()
{
    carregarMusicas();
    //  audio = document.getElementById("musica_fundo");
    //audio.addEventListener("ended", loop, false);
    //   audio.play();
    // bgSound = new Audio("sons/fundo_musical.mp3");
    //  bgSound.loop = true;   
    //  bgSound.play();
}

function inicializarImagens() {

    //       alert("teste");
    // var largura = this.vida.width / 2; 
    // var altura = this.vida.height / 3; 
    // context.clearRect( 0, 0, canvas.width, canvas.height );
    // context.drawImage(vida, 100, 100, 100, 100);


}

function loop() {

    atualizarNave();
    atualizarFumaca();
    atualizarTiros();
    atualizarAsteroids();
    checkCollisions();
    renderizar();
    getAnimationFrame(loop);
}



function atualizarNave()
{

    nave.atualiza();

    if (nave.idle)
        return;

    if (keySpace)
        nave.tiro();
    if (keyLeft)
        nave.angle -= 0.1;
    if (keyRight)
        nave.angle += 0.1;

    if (keyUp)
    {
        nave.thrust.setLength(0.1);
        nave.thrust.setAngle(nave.angle);
        generateThrustParticle();
    } else
    {
        nave.vel.mul(0.94);
        nave.thrust.setLength(0);
    }

    if (nave.pos.getX() > screenWidth)
        nave.pos.setX(0);
    else if (nave.pos.getX() < 0)
        nave.pos.setX(screenWidth);

    if (nave.pos.getY() > screenHeight)
        nave.pos.setY(0);
    else if (nave.pos.getY() < 0)
        nave.pos.setY(screenHeight);

    // pontosJogador += escudoLargura
    if (escudoLargura == 0.0) {
        setTimeout(restauraEscudo, 5000);
    }

}

function generateThrustParticle()
{
    var p = particlePool.getElement();

    //if the particle pool doesn't have more elements, will return 'null'.

    if (!p)
        return;

    p.radius = Math.random() * 3 + 2;
    p.color = '#f7e299';
    p.lifeSpan = 80;
    p.pos.setXY(nave.pos.getX() + Math.cos(nave.angle) * -14, nave.pos.getY() + Math.sin(nave.angle) * -14);
    p.vel.setLength(8 / p.radius);
    p.vel.setAngle(nave.angle + (1 - Math.random() * 2) * (Math.PI / 18));
    p.vel.mul(-1);

    //particles[particles.length] = p; same as: particles.push(p);

    particles[particles.length] = p;
}

function atualizarFumaca()
{
    if (!gameOver) {
        var i = particles.length - 1;

        for (i; i > -1; --i)
        {
            var p = particles[i];

            if (p.blacklisted)
            {
                p.reinicia();

                particles.splice(particles.indexOf(p), 1);
                particlePool.disposeElement(p);

                continue;
            }

            p.atualiza();
        }
    }
}

function atualizarTiros()
{
    if (!gameOver) {
        var i = tiros.length - 1;

        for (i; i > -1; --i)
        {
            var b = tiros[i];

            if (b.blacklisted)
            {
                b.reinicia();

                tiros.splice(tiros.indexOf(b), 1);
                tiroPool.disposeElement(b);

                continue;
            }

            b.atualiza();

            if (b.pos.getX() > screenWidth)
                b.blacklisted = true;
            else if (b.pos.getX() < 0)
                b.blacklisted = true;

            if (b.pos.getY() > screenHeight)
                b.blacklisted = true;
            else if (b.pos.getY() < 0)
                b.blacklisted = true;
        }
    }
}

function atualizarAsteroids()
{
    if (!gameOver) {
        var i = asteroids.length - 1;

        for (i; i > -1; --i)
        {
            var a = asteroids[i];

            if (a.blacklisted)
            {
                a.reinicia();

                asteroids.splice(asteroids.indexOf(a), 1);
                asteroidPool.disposeElement(a);

                continue;
            }

            a.atualiza();

            if (a.pos.getX() > screenWidth + a.radius)
                a.pos.setX(-a.radius);
            else if (a.pos.getX() < -a.radius)
                a.pos.setX(screenWidth + a.radius);

            if (a.pos.getY() > screenHeight + a.radius)
                a.pos.setY(-a.radius);
            else if (a.pos.getY() < -a.radius)
                a.pos.setY(screenHeight + a.radius);
        }

        var qtdAsteroids = 5;

        if (nivel == 2 || nivel == 3) {
            qtdAsteroids = 10;
        }

        if (asteroids.length < qtdAsteroids)
        {
            var factor = (Math.random() * 2) >> 0;

            gerarAsteroid(screenWidth * factor, screenHeight * factor, 60, 'b');
        }
    }
}

function gerarAsteroid(x, y, radius, type)
{
    var a = asteroidPool.getElement();

    //se o vetor de tiro não tem elementos retorna null.

    if (!a)
        return;

    a.radius = radius;
    a.type = type;
    a.pos.setXY(x, y);
    a.vel.setLength(1 + asteroidVelFactor);
    a.vel.setAngle(Math.random() * (Math.PI * 2));

    //tiros[tiros.length] = b; same as: tiros.push(b);

    asteroids[asteroids.length] = a;
    if (nivel == 3) {
        asteroidVelFactor += (Math.random() * 1.225) >> 0;
    } else {
        asteroidVelFactor += (Math.random() * 1.025) >> 0;
    }
}

function checkCollisions()
{
    checarTiroAsteroid();
    checarNaveAsteroid();
}

function checarTiroAsteroid()
{
    var i = tiros.length - 1;
    var j;

    for (i; i > -1; --i)
    {
        j = asteroids.length - 1;

        for (j; j > -1; --j)
        {
            var b = tiros[i];
            var a = asteroids[j];

            if (checarDistanciaColisao(b, a))
            {
                b.blacklisted = true;

                if (audio != "false") {
                    SOM_EXPLOSAO.currentTime = 0.0;
                    SOM_EXPLOSAO.play();
                }
                destruirAsteroid(a);
            }
        }
    }
}

function checarNaveAsteroid()
{

    var i = asteroids.length - 1;

    for (i; i > -1; --i)
    {
        var a = asteroids[i];
        var s = nave;

        if (checarDistanciaColisao(a, s))
        {
            if (s.idle) {
                return;
            }

            if (audio != "false") {
                SOM_EXPLOSAO.currentTime = 0.0;
                SOM_EXPLOSAO.play();
            }

            if (keyDown && escudoAtivo) {
                destruirAsteroid(a);
                if (audio != "false") {
                    SOM_ESCUDO.play();
                }
            } else {
                renderizarVidas();
                gerarExplosaoNave();
                destruirAsteroid(a);
                s.idle = true;
            }
        }
    }
}

function gerarExplosaoNave()
{
    var i = 18;

    for (i; i > -1; --i)
    {
        var p = particlePool.getElement();

        if (!p)
            return;

        p.radius = Math.random() * 6 + 2;
        p.lifeSpan = 80;
        p.color = '#FFF';
        p.vel.setLength(20 / p.radius);
        p.vel.setAngle(nave.angle + (1 - Math.random() * 2) * doublePI);
        p.pos.setXY(nave.pos.getX() + Math.cos(p.vel.getAngle()) * (nave.radius * 0.8), nave.pos.getY() + Math.sin(p.vel.getAngle()) * (nave.radius * 0.8));

        particles[particles.length] = p;
    }




}

//Verifica se obj1 colidiu com obj2 
function checarDistanciaColisao(obj1, obj2)
{
    var vx = obj1.pos.getX() - obj2.pos.getX();
    var vy = obj1.pos.getY() - obj2.pos.getY();
    var vec = Vec2D.create(vx, vy);

    if (vec.getLength() < obj1.radius + obj2.radius)
    {
        return true;
    }

    return false;
}

function destruirAsteroid(asteroid)
{
    atualizarPontuacaoJogador(asteroid);

    asteroid.blacklisted = true;

    gerarExplosaoAsteroid(asteroid);

    definirTipoAsteroid(asteroid);
}

function atualizarPontuacaoJogador(asteroid) {

    // alert(asteroid.type);
    if (asteroid.type === "b") {
        this.pontosJogador += 10;
    } else if (asteroid.type === "m") {
        this.pontosJogador += 20;
    } else {
        this.pontosJogador += 30;
    }

    document.getElementById('score').innerHTML = this.pontosJogador;
}

function gerarExplosaoAsteroid(asteroid)
{
    var i = 18;

    for (i; i > -1; --i)
    {
        var p = particlePool.getElement();

        //if the particle pool doesn't have more elements, will return 'null'.

        if (!p)
            return;

        //var controle = document.getElementById(audio);
        //controle.pause();
        //  controle.currentTime = 0;


        p.radius = Math.random() * (asteroid.radius >> 2) + 2;
        p.lifeSpan = 80;
        p.color = '#FF5900';
        p.vel.setLength(20 / p.radius);
        p.vel.setAngle(nave.angle + (1 - Math.random() * 2) * doublePI);
        p.pos.setXY(asteroid.pos.getX() + Math.cos(p.vel.getAngle()) * (asteroid.radius * 0.8), asteroid.pos.getY() + Math.sin(p.vel.getAngle()) * (asteroid.radius * 0.8));

        //particles[particles.length] = p; same as: particles.push(p);

        particles[particles.length] = p;
    }
}

function definirTipoAsteroid(asteroid)
{
    switch (asteroid.type)
    {
        case 'b':

            gerarAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 40, 'm');
            gerarAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 40, 'm');

            break;

        case 'm':

            gerarAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 20, 's');
            gerarAsteroid(asteroid.pos.getX(), asteroid.pos.getY(), 20, 's');

            break;
    }
}

function renderizar()
{
    if (!gameOver) {
        context.fillStyle = '#262626';
        context.globalAlpha = 0.4;
        context.fillRect(0, 0, screenWidth, screenHeight);
        context.globalAlpha = 1;

        renderizarFundoJogo();
        renderizarNave();
        renderizarBarraEscudo();
        renderizarExplosoes();
        renderizarTiros();
        renderizarAsteroids();
        //desenharScanlines();
    }
}


function renderizarFundoJogo() {

    screenWidth = canvas.clientWidth;
    screenHeight = canvas.clientHeight;

    this.y += this.velocidade;
    this.context.drawImage(g_backgroundImg, this.x, this.y, screenWidth, screenHeight);
    // context.drawImage(g_backgroundImg, 0, 0, screenWidth, screenHeight, 0, 0,  screenWidth, screenHeight);
    // Draw another image at the top edge of the first image
    //this.context.drawImage(g_backgroundImg, this.x, this.y - screenHeight);
    this.context.drawImage(g_backgroundImg, this.x, this.y - screenHeight, screenWidth, screenHeight);
    // Reiniciando a imagemt
    if (this.y >= this.screenHeight)
        this.y = 0;
}



function renderizarNave()
{

    if (nave.idle)
        return;

    context.save();
    context.translate(nave.pos.getX() >> 0, nave.pos.getY() >> 0);
    context.rotate(nave.angle);

    context.strokeStyle = '#F25022';
    context.lineWidth = (Math.random() > 0.9) ? 2 : 1;
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, -10);
    context.quadraticCurveTo(3, 3, 0, 0);
    context.lineTo(-10, 10);

    context.lineTo(10, 0);

    context.stroke();
    context.restore();

    context.stroke();

    context.fillStyle = '#F25022';
    context.fill();
    //alert(nave.pos.getX());
    //context.drawImage(spaceWarriorImagem, nave.pos.getX(),nave.pos.getY());
    context.closePath();
    context.restore();


    //desenhando o escudo
    if (keyDown && escudoAtivo) {

        if (audio != "false") {
            SOM_ESCUDO.play();
        }
        context.save();
        context.translate(nave.pos.getX(), nave.pos.getY());
        context.rotate(nave.angle);
        context.shadowColor = context.strokeStyle = 'rgba(255,233,0,0.5)';
        context.beginPath();
        context.lineWidth = 4;
        context.fillStyle = '#F25022';
        context.arc(0, 0, 25, 0, Math.PI * 2, true);
        // context.arc(0, 0, 20, 0,  Math.PI*2, true);
        // context.arc(0, 0, 25, 0,  Math.PI*2, true);
        context.closePath();
        //context.strokeStyle = "rgba(255, 255, 255, 0.5)"; 
        context.globalAlpha = 0.6;
        // #F25022;
        context.fill();
        context.stroke();
        context.restore();

    }

    //SpaceWarrior
    /*context.save();
     context.translate(nave.pos.getX() >> 0, nave.pos.getY() >> 0);
     context.drawImage(spaceWarriorImagem, px * largura, py * largura, largura, largura);
     context.rotate(nave.angle);
     context.closePath();
     context.restore();*/
}

//Rendenriza particulas das explosoes
function renderizarExplosoes()
{
    var i = particles.length - 1;
    for (i; i > -1; --i)
    {
        var p = particles[i];

        context.beginPath();
        context.strokeStyle = p.color;
        context.arc(p.pos.getX() >> 0, p.pos.getY() >> 0, p.radius, 0, doublePI);
        if (Math.random() > 0.4)
            context.stroke();
        //context.stroke();
        context.fillStyle = '#fff600';
        context.fill();
        context.closePath();
    }
}


//Renderiza particulas dos tiros
function renderizarTiros()
{
    var i = tiros.length - 1;

    for (i; i > -1; --i)
    {
        var b = tiros[i];

        context.beginPath();

        context.arc(b.pos.getX() >> 0, b.pos.getY() >> 0, b.radius, 0, doublePI);
        if (Math.random() > 0.2)
            context.stroke();

        //pintando tiro
        context.strokeStyle = b.color;
        context.stroke();
        context.fillStyle = b.color;
        context.fill();
        context.closePath();
    }
}

function renderizarAsteroids()
{
    var i = asteroids.length - 1;

    for (i; i > -1; --i)
    {
        var a = asteroids[i];

        context.beginPath();
        context.lineWidth = (Math.random() > 0.2) ? 4 : 3;
        context.strokeStyle = a.color;

        var j = a.sides;

        context.moveTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);

        for (j; j > -1; --j)
        {
            context.lineTo((a.pos.getX() + Math.cos(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0, (a.pos.getY() + Math.sin(doublePI * (j / a.sides) + a.angle) * a.radius) >> 0);
        }

        if (Math.random() > 0.2)
            context.stroke();

        context.stroke();
        context.fillStyle = '#5a5c5e';
        context.fill();

        context.closePath();
    }
}


function renderizarVidas() {


    if (document.getElementById("vida1") != undefined) {
        document.getElementById('vida1').remove();
    } else if (document.getElementById("vida2") != undefined) {
        document.getElementById('vida2').remove();
    } else if (document.getElementById("vida3") != undefined) {
        document.getElementById('vida3').remove();
    } else {
        window.setTimeout(renderizarGameOver, 4000);

    }

}


function renderizarGameOver() {


    musicaAcao.pause();
    musicaAcao.currentTime = 0.0;


    gerarExplosaoNave();

    atualizarNave();

    gameOver = true;

    if (audio != "false") {
        
        SOM_GAMEOVER.currentTime = 0.0;
        SOM_GAMEOVER.volume = 0.8;
        SOM_GAMEOVER.play();
    }


    // Texto "Game Over" 
    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '70px sans-serif';

    context.fillText("GAME OVER", screenWidth / 2 - (((screenWidth / 2) / 100) * 25), screenHeight / 2 + 60);
    context.strokeText("GAME OVER", screenWidth / 2 - (((screenWidth / 2) / 100) * 25), screenHeight / 2 + 60);
    context.restore();


    //Chama 
    document.getElementById("chamarGravacao").click();
}

function desenharScanlines()
{
    var i = hScan;
    context.globalAlpha = 0.05;
    context.lineWidth = 1;

    for (i; i > -1; --i)
    {
        context.beginPath();
        context.moveTo(0, i * 4);
        context.lineTo(screenWidth, i * 4);
        context.strokeStyle = (Math.random() > 0.0001) ? '#FFF' : '#222';
        context.stroke();
    }

    context.globalAlpha = 1;
}

function gerarTiro()
{
    var b = tiroPool.getElement();

    if (!b)
        return;

    //pausarJogo();
    //SOM_TIRO.pause();
    
    if (audio != "false") {
        SOM_TIRO.currentTime = 0.0;
        SOM_TIRO.play();
    }


    /*  context.beginPath();
     context.fillStyle = '#b7b9bc';
     context.fill();
     context.strokeStyle = b.color;*/

    // b.radius = b.radius;
    b.pos.setXY(nave.pos.getX() + Math.cos(nave.angle) * 14, nave.pos.getY() + Math.sin(nave.angle) * 14);
    b.vel.setLength(10);
    b.vel.setAngle(nave.angle);
    //tiros[tiros.length] = b; same as: tiros.push(b);
    tiros[tiros.length] = b;

    //   context.beginPath();
    // context.stroke();
    // context.fillStyle = b.color;// '#b7b9bc';
    // context.fill();

    // context.closePath();
}

function reiniciarJogo()
{
    asteroidVelFactor = 0;

    nave.pos.setXY(screenWidth >> 1, screenHeight >> 1);
    nave.vel.setXY(0, 0);

    reiniciarAsteroids();
}

function reiniciarAsteroids()
{
    var i = asteroids.length - 1;

    for (i; i > -1; --i)
    {
        var a = asteroids[i];
        a.blacklisted = true;
    }
}


function pausarJogo() {
    //   if (animacao.ligado) {
    // animacao.desligar();
    //   ativarTiro(false);
// Escrever "Pausado" 
    context.beginPath();
    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.font = '50px sans-serif';
    context.fillText("Pausado", 160, 200);
    context.strokeText("Pausado", 160, 200);
    context.restore();
    context.closePath();
}


function carregarMusicas() {

    if (musica != "false") {
        console.log(musica);
        musicaAcao = new Audio();
        musicaAcao.src = 'sons/fundo_musical.mp3';
        musicaAcao.load();
        musicaAcao.volume = 0.8;
        musicaAcao.loop = true;
        musicaAcao.play();
    }
}


function renderizarBarraEscudo() {


    var fillWidth = Math.floor(escudo / 100);
    var startY = Math.floor(this.healthHeight / 3);
    var height = Math.floor(this.healthHeight / 3);

    context.beginPath();
    if (keyDown) {
        if (escudoLargura > 5)
            escudoLargura -= 0.1;
        else {
            escudoLargura = 0.0;
            escudoAtivo = false;
        }
    }
    context.clearRect(700, 7, 100, 15);
    context.strokeStyle = (Math.random() > 0.0001) ? '#FFF' : '#222';

    context.fillRect(700, 7, 100, 15);


    var r = this.shield;
    var g = this.shield * 2;
    var b = this.shield * 2 + 55;
    var strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.5)';

    //  context.strokeStyle = strokeStyle;
    context.fillStyle = 'rgba(100,100,225,0.8)';
    context.fillRect(703, 10, escudoLargura - 5, 9);
    context.closePath();

}

function restauraEscudo() {
    if (!escudoAtivo) {
        escudoLargura += 0.05;
        if (escudoLargura < 100) {

            window.setTimeout(restauraEscudo, 5000);
        } else {
            escudoAtivo = true;
        }
    }
}

