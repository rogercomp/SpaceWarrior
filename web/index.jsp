<%-- 
    Document   : index
    Created on : 03/10/2018, 18:45:28
    Author     : roger
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>..::Space Warrior::..</title>
        <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
        <link href="css/login.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <script src="js/funcoes.js"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <script>
            
                function randombg(){
        var random = Math.floor(Math.random() * 6);
        var fundo = ["url('./imagens/bg1.jpg')",
                 "url('./imagens/bg2.jpg')",
                 "url('./imagens/bg3.jpg')",
                 "url('./imagens/bg4.jpg')",
                 "url('./imagens/bg5.jpg')",
                 "url('./imagens/bg6.jpg')"];
        document.getElementById('myBody').style.backgroundImage=fundo[random];
        
    }

            function checkClassNome(obj) {
                var x = document.getElementById(obj);
                if (x.value.length >= 1) {
                    x.classList.add("used");
                } else {
                    x.classList.remove("used");
                }
            }

            function checkClassSenha(obj) {
                var x = document.getElementById(obj);
                if (x.value.length >= 1) {
                    x.classList.add("used");
                } else {
                    x.classList.remove("used");
                }
            }

            function checkClassEmail(obj) {
                var x = document.getElementById(obj);
                if (x.value.length >= 1) {
                    x.classList.add("used");
                } else {
                    x.classList.remove("used");
                }
            }

            function somenteLetrasAcento() {
                var el = document.getElementById("nome");
                var str = el.value;
                var res = str.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, "");
                el.value = res;

            }

            function somenteLetrasNumeros() {
                var el = document.getElementById("senha");
                var str = el.value;
                var res = str.replace(/[^A-Za-z0-9 ]/g, "");
                el.value = res;
            }

            function habilitaCadastro() {

                var el1 = document.getElementById("logar").offsetLeft;
                var el2 = document.getElementById("cadastro").offsetLeft;

                if (el1 < 0) {
                    document.getElementById('logar').style.display = 'block';
                    document.getElementById('cadastro').style.display = 'none';
                } else {
                    document.getElementById('logar').style.display = 'none';
                    document.getElementById('cadastro').style.display = 'block';
                }
            }

            function manterLogado() {
                var elemento = document.getElementById("manterlogado");
                var usuario = document.getElementById("nome");
                var senha = document.getElementById("senha");

                if (elemento.checked) {
                    if (window.localStorage.getItem('usuario') !== null) {
                        usuario.value = window.localStorage.getItem('usuario');
                        senha.value = window.localStorage.getItem('senha');
                        checkClassNome(usuario.id);
                        checkClassSenha(senha.id);
                    } else {
                        window.localStorage.setItem('usuario', usuario.value);
                        window.localStorage.setItem('senha', senha.value);
                    }
                } else {
                    window.localStorage.removeItem('usuario');
                    window.localStorage.removeItem('senha');
                }
            }


            function voltaLogin() {
                document.location.href = "http://localhost:8084/SpaceWarrior/";
                // document.location.href = "https://hspacewar.herokuapp.com/";
            }



        </script>
    </head>
    <body>       
        <div style="color:red">
            <%
                Object msg = request.getAttribute("resultado");
                if (msg != null) {
                    out.print("<script>mostraDialogo('" + msg + "', 'danger' , 5000); </script>");
                }
            %>
        </div>

        <audio id="audioinputs"><source src="sons/shot.wav" type="audio/wav"></audio>
         <div>
            <h2 class="tituloSpace">SPACE WARRIOR</h2>
         </div> 
        <div class="formulario">  
            <div id="logar" style="display: block;">
                <form id="form1" method="POST" action="Login">                
                    <input type="hidden" id="msg" name="msg" value='<%= msg%>' />
                    <div class="container">
                        <p class="titulo">CREDENCIAIS!</p>
                        <div class="group">      
                            <input type="text" id="nome" name="nome" onkeypress="playAudio('audioinputs');" onkeyup="checkClassNome(this.id);
                                    somenteLetrasAcento();" required  />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Piloto</label>                         
                        </div>

                        <div class="group">      
                            <input type="password" id="senha" name="senha" maxlength="12" pattern=".{6,12}" onkeypress="playAudio('audioinputs')" onkeyup="checkClassSenha(this.id); somenteLetrasNumeros();" title="Somente letras e numeros tamanho entre 6 e 12 caracteres" required />
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Senha</label>                                                 
                        </div>             
                        <div class="group">
                            <input type="checkbox" name="manterlogado" id="manterlogado" value="" onclick="manterLogado()" /> 
                            <label>Salvar Credenciais</label>
                            <input type="button" id="entrar"  value="Entrar" onclick="validarLoginBranco()" >
                            <input type="button" id="registrar" value="Registrar" onclick="habilitaCadastro()"  > 
                        </div>
                    </div>
                </form>
            </div>

            <!--FORMULÁRIO DE CADASTRO-->
            <div id="cadastro" style="display: none;">
                <form id="login" method="post" action="Cadastro"> 
                    <div class="container">
                        <p class="titulo">CADASTRO</p>

                        <div class="group">                            
                            <input type="text" id="nomeUsuario" name="nomeUsuario" onkeyup="checkClassNome(this.id);" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Piloto</label>
                        </div>

                        <div class="group">      
                            <input type="password" id="senhaUsuario" name="senhaUsuario" onkeyup="checkClassSenha(this.id);" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Senha</label>                                               
                        </div> 

                        <div class="group">
                            <input id="emailUsuario" name="emailUsuario" onkeyup="checkClassEmail(this.id);" required="required" type="email" /> 
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label>Email</label>
                            <input type="button" value="Cadastrar" onclick="validarCadBranco();"  >
                            <input type="button" id="voltar" value="Voltar" onclick="voltaLogin()"  > 
                        </div>
                    </div>
                </form>
            </div>
        </div> 
    </body>
</html>
