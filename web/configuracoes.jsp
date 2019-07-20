<%-- 
    Document   : configuracoes
    Created on : 18/12/2018, 19:33:02
    Author     : roger
--%>

<%@page import="model.Jogador"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>..::Configurações::..</title>
        <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <link rel="stylesheet" href="css/configuracoes.css" type="text/css">


        <script src="js/funcoes.js"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <script>

            function randombg() {
                var random = Math.floor(Math.random() * 6);
                var fundo = ["url('./imagens/bg1.jpg')",
                    "url('./imagens/bg2.jpg')",
                    "url('./imagens/bg3.jpg')",
                    "url('./imagens/bg4.jpg')",
                    "url('./imagens/bg5.jpg')",
                    "url('./imagens/bg6.jpg')"];
                document.getElementById('myBody').style.backgroundImage = fundo[random];

            }


            function VoltaDificuldade() {
                //window.location.href = "http://localhost:8084/SpaceWarrior/dificuldade.jsp"
                window.location.href = "https://hspacewar.herokuapp.com/dificuldade.jsp"
            }
        </script>

        <style>
            input:valid ~ .bar:before, input:valid ~ .bar:after{
                background: #006633 !important;
            }

            /* active state */
            input:focus ~ .bar:before, input:focus ~ .bar:after {
                width:50%;
            }

            .highlight {
                position:absolute;
                height:60%; 
                width:100px; 
                top:25%; 
                left:0;
                pointer-events:none;
                transition:0.2s ease all;
                opacity:0.5;
            }

            /* active state */
            input:focus ~ .highlight {
                -webkit-animation:inputHighlighter 0.3s ease;
                -moz-animation:inputHighlighter 0.3s ease;
                animation:inputHighlighter 0.3s ease;
            }


            @-webkit-keyframes inputHighlighter {
                from { background:#5264AE; }
                to 	{ width:0; background:transparent; }
            }

            @-webkit-keyframes validHighlighter {
                from { background:#4fc24f !important; }
                to 	{ width:0; background:transparent; }
            }

          
            input[type="submit"] {
                margin-top: 30px;
                background-image: linear-gradient(rgb(255, 255, 255), rgb(0, 0, 0));
                color: black;
                font-size: 30px;
                padding: 10px;
                border: 1px solid rgb(57,12,15);    
                border-radius: 20px;
                box-shadow: 2px 2px 2px rgb(0,0,0);
                cursor: pointer;
                transition: all 0.3s;    
            }
            input[type="submit"]:hover{    
                text-shadow: 0px 0px 0px black;
                text-shadow: 2px 2px 2px white;   
                background-image: linear-gradient(rgb(0, 0, 0), rgb(255, 255, 255));
            }
            input[type="submit"]:active{
                transform: scale(0.98);
            }
        </style>
    </head>


    <body>   

        <%
            //Verifica se está logado
            Jogador jog = (Jogador) session.getAttribute("usuarioLogado");
            if (jog != null) {
                //out.print(jog.getDificuldade());
             //   out.print(jog.isAudio());
              //  out.print(jog.isMusica());

        %>
        <form id="formConf" name="formConf" action="GravaConfig" method="post">
            <h1>Configurações</h1>
            <div class="caixaExterna">

                <div class="linha">
                    <p class="col-dg-12 col-dm-12" for="">Dificuldade</p>
                    <div class="col-dg-12 col-dm-12">
                        <input class="radio" type="radio" name="rdDificuldade" id="rdDificuldade" value="1" <%if (jog.getDificuldade() == 1) {
                                out.print("checked");
                            } %>><label for="facil">Fácil</label>
                        <input class="radio" type="radio" name="rdDificuldade" id="rdDificuldade" value="2" <%if (jog.getDificuldade() == 2) {
                                out.print("checked");
                            } %>><label for="medio">Médio</label>
                        <input class="radio" type="radio" name="rdDificuldade" id="rdDificuldade" value="3" <%if (jog.getDificuldade() == 3) {
                                out.print("checked");
                            } %>><label for="dificil">Difícil</label>
                    </div>
                </div>

                <div class="linha">
                    <p class="col-dg-12 col-dm-12" for="">Áudio</p>
                    <div class="col-dg-12 col-dm-12">
                        <input type="radio" name="rdAudio" id="rdAudio" value="1" <%if (jog.isAudio()) {
                                out.print("checked");
                            } %>><label for="1">Ligado</label>
                        <input type="radio" name="rdAudio" id="rdAudio" value="0" <%if (!jog.isAudio()) {
                                out.print("checked");
                            } %>><label for="0">Desligado</label>
                    </div>
                </div>

                <div class="linha">
                    <p class="col-dg-12 col-dm-12" for="">Música</p>
                    <div class="col-dg-12 col-dm-12">
                        <input class="musica" type="radio" name="rdMusica" id="rdMusica" value="1" <%if (jog.isMusica()) {
                                out.print("checked");
                            } %>><label for="facil">Ligado</label>
                        <input class="musica" type="radio" name="rdMusica" id="rdMusica" value="0" <%if (!jog.isMusica()) {
                                out.print("checked");
                            } %>><label for="medio">Desligado</label>
                    </div>
                </div>
                <div >
                    <input type="submit" value="Aplicar" id="botaoMenu" />          
                </div> 
            </div> 
        </form>
        <% }%>
    </body>
</html>
