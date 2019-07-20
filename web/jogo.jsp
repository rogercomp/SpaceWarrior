<%-- 
    Document   : jogo
    Created on : 14/12/2018, 16:37:12
    Author     : roger
--%>

<%@page import="model.Jogador"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Jogo Space Warrior</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0" />        
        <link href="https://fonts.googleapis.com/css?family=Rancho&effect=shadow-multiple" rel="stylesheet">
        <link href="css/game.css" rel="stylesheet" type="text/css">        
        <link rel="icon" type="image/gif" href="favicon.ico" />
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="js/main.js"></script>
        <script type="text/javascript" src="js/inimigos.js"></script>
        <script type="text/javascript" src="js/asteroids.js"></script>
        <script type="text/javascript" src="js/tiro.js"></script>
        <script type="text/javascript" src="js/nave.js"></script>
        <style>
            .score {
                position: absolute;
                top: 5px;
                left: 480px;
                color: #FF7F00;
                font: 22px fantasy;
                text-shadow: 2px 2px 4px rgba(0,0,80,1.0);
                cursor: default;
            }


            .vida {
                position: absolute;   
                top: 5px;
                left: 350px;              
            }
            
            .player {
                 position: absolute;
                top: 5px;
                left: 850px;
                color: #FF7F00;
                font: 22px fantasy;
                text-shadow: 2px 2px 4px rgba(0,0,80,1.0);
                cursor: default;           
            }

        </style>
        <script type="text/javascript">
            function chamaServlet()
            {
                document.getElementById("pontuacao").value = document.getElementById("score").innerHTML;
                //alert(document.getElementById("pontuacao").value);
                // document.getElementById("formJogo").action = "./GravaResultado";
                // document.getElementById("formJogo").method = "GET";
                document.getElementById("formJogo").submit();

            }
        </script>
    </head>
    <body>
        <%
            //Verifica se está logado
            Jogador jog = (Jogador) session.getAttribute("usuarioLogado");
            if (jog  != null ) {

            
        %>

        <form name="formJogo" id="formJogo" action="GravaResultado" method="post">
            <input type="hidden" id="pontuacao" name="pontuacao" value="" />
            <input type="hidden" id="musica" name="musica" value="<%=jog.isMusica() %>" />
            <input type="hidden" id="audio" name="audio" value="<%=jog.isAudio()%>" />
            <input type="hidden" id="dificuldade" name="dificuldade" value="<%=jog.getDificuldade() %>" />
             <input type="hidden" id="jog" name="jog" value="<%=jog.getNomeUsuario() %>" />
             
            <!-- <div id="info">
                 <h1>SpaceWarrior:</h1>
                 <p>Movimentar [A][S][W][D] ou [&larr;][&uarr;][&darr;][&rarr;]</p>
                 <p>Atirar [Espaço] ou [K]</p>
                 <p>Sair [ESC](Retorna Menu)</p>
             </div> -->

            <canvas id="canvas"></canvas>        


            <div class="vida">
                <img id="vida1" alt="" src="imagens/heart.png" />
                <img id="vida2" alt="" src="imagens/heart.png" />
                <img id="vida3" alt="" src="imagens/heart.png" />
            </div> 
            <div class="score">PONTOS: <span id="score"></span></div>
            <div class="player">JOGADOR: <span id="player"></span></div>

            <!--<audio id="musica_fundo" loop > <source src="sons/fundo_musical.mp3" type="audio/mp3" >Seu browser não suporta a tag audio!</audio> -->
            <!--<iframe id="permissao" src="sons/fundo_musical.mp3" allow="autoplay" allow="loop" /> -->

            <!-- <button type="submit"  onclick="callServlet()" align="center"> Register</button>-->
            <a id="chamarGravacao" href="javascript:chamaServlet();" ></a>
        </form>

      <% } %>
    </body>

</html>
