function playAudio(audio) {
    document.getElementById(audio).play();
}
function pauseAudio(audio) {
    var controle = document.getElementById(audio);
    controle.pause();
    controle.currentTime = 0;
}
function validarFormulario(form) {
    inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (((inputs[i].type === "text") || (inputs[i].type === "password"))) {
            if (inputs[i].value === "") {
                mostraDialogo("Piloto e Senha devem estar preenchidos", "danger", 3000);
                break;
            } else {
                if (!inputs[i].validity.valid) {
                    console.log(inputs[i]);
                    mostraDialogo("O campo " + inputs[i].name + " está inválido!", "danger", 5000);
                    break;
                } else {
                    document.getElementById('form1').submit();
                }
            }

        }
    }
}

function validarCadastro() {
    document.getElementById('login').submit();
}

function validarLoginBranco() {
    var nome = document.getElementById("nome").value.trim();
    var senha = document.getElementById("senha").value.trim();

    if (nome === "") {
        mostraDialogo("Piloto não preenchido!", "danger", 5000);
        return;
    } else if (senha === "") {
        mostraDialogo("Senha não preenchida!", "danger", 5000);
        return;
    }
    validarFormulario();
}

function validarCadBranco() {
    var nome = document.getElementById("nomeUsuario").value.trim();
    var senha = document.getElementById("senhaUsuario").value.trim();
    var email = document.getElementById("emailUsuario").value.trim();

    if (nome === "") {
        mostraDialogo("Piloto não preenchido!", "danger", 5000);
        return;
    } else if (senha === "") {
        mostraDialogo("Senha não preenchida!", "danger", 5000);
        return;
    } else if (email === "") {
        mostraDialogo("E-mail não preenchido!", "danger", 5000);
        return;
    } else {
        var testaArroba = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/;
        ///^[a-z0-9]+@[a-z0-9]+\.[a-z]$/
        var info = document.getElementById("emailUsuario").value;
        if (testaArroba.test(info))
            validarCadastro();
        else
            mostraDialogo("Digite um e-mail válido!", "danger", 5000);         
        return;
    }

    validarCadastro();
}

function mostraDialogo(mensagem, tipo, tempo) {

    // se não setar o tempo, o padrão é 3 segundos
    if (!tempo) {
        var tempo = 3000;
    }

    // se não setar o tipo, o padrão é alert-info
    if (!tipo) {
        var tipo = "info";
    }

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: fixed; top: 0; left: 30%; right: 30%; width: 40%; padding-top: 10px; z-index: 9999";
    var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black; text-align: center;";


    // monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="' + cssMessage + '">';
    dialogo += '    <div class="alert alert-' + tipo + ' alert-dismissable" style="' + cssInner + '">';
    dialogo += mensagem;
    dialogo += '    </div>';
    dialogo += '</div>';

    document.body.innerHTML = document.body.innerHTML + dialogo;

    slowly.fadeout('message');

    window.setTimeout(() => {
        slowly.fadein('message');
    }
    , 3000);
}

var opacityin = 96; // Avoid starting at 100% due to Mozilla bug
var opacityout = 0; // Avoid starting at 100% due to Mozilla bug
var slowly = {
    fadein: function (id) {
        this.fadeLoopin(id, opacityin);
    },
    fadeLoopin: function (id, opacityin) {
        var o = document.getElementById(id);
        if (opacityin >= 5) {
            slowly.setOpacityin(o, opacityin);
            //opacityin -= 4;
            opacityin -= 8;
            window.setTimeout("slowly.fadeLoopin('" + id + "', " + opacityin + ")", 150);
        } else {
            o.style.display = "none";
            document.getElementById("message").remove();
        }
    },
    setOpacityin: function (o, opacityin) {
        o.style.filter = "alpha(style=0,opacity:" + opacityin + ")";// IE
        o.style.KHTMLOpacity = opacityin / 100; // Konqueror
        o.style.MozOpacity = opacityin / 100;   // Mozilla (old)
        o.style.opacity = opacityin / 100;      // Mozilla (new)
    },
    fadeout: function (id) {
        this.fadeLoopout(id, opacityout);
    },
    fadeLoopout: function (id, opacityout) {
        var o = document.getElementById(id);
        if (opacityout <= 100) {
            o.style.display = "block";
            slowly.setOpacityout(o, opacityout);
            opacityout += 8;
            window.setTimeout("slowly.fadeLoopout('" + id + "', " + opacityout + ")", 150);
        }
    },
    setOpacityout: function (o, opacityout) {
        o.style.filter = "alpha(style=0,opacity:" + opacityout + ")";// IE
        o.style.KHTMLOpacity = opacityout / 100; // Konqueror
        o.style.MozOpacity = opacityout / 100;   // Mozilla (old)
        o.style.opacity = opacityout / 100;      // Mozilla (new)
    }
};
