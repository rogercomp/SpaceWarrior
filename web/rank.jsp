<%-- 
    Document   : rank
    Created on : 16/12/2018, 11:10:24
    Author     : roger
--%>

<%@page import="model.Jogador"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="br">
    <head>
        <meta charset="UTF-8">
        <title>..::Ranking::..</title>

        <link rel="icon" type="image/gif" href="favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Anton" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Anton|Audiowide|Kumar+One+Outline" rel="stylesheet">       
        <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
        <link href="css/rank.css" rel="stylesheet" type="text/css"/>
        <link href="css/login.css" rel="stylesheet" type="text/css"/>

        <script>

            function VoltaDificuldade() {
                //window.location.href = "http://localhost:8084/SpaceWarrior/dificuldade.jsp"
                 window.location.href = "https://hspacewar.herokuapp.com/dificuldade.jsp"
            }

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
        </script>
    </head>
    <body id="myBody" onload="randombg()">
        <div class="titulo">
            <p class="tituloRanking">RANKING</p>            
        </div>
        <%
            //Verifica se está logado
            Jogador[] jog = (Jogador[]) request.getAttribute("resultado");
            int contador = 0;
            if (jog.length > 0) {              
                for (Jogador j : jog) {                     
                      contador++;
        %>

        <div class="caixa">
            <table class="tabela">
                <tr>
                    <td class="nroRanking" style="width: 6%"><%=contador%></td>
                    <td class="nomeRanking" style="width: 74%"><%=j.getNomeUsuario()%></td>
                    <td class="pontuacaoRanking" style="width: 20%"><%=j.getMaior_Pontuacao()%></td>
                </tr>
            </table>
            <!--  <tr>
                  <td class="nroRanking" style="width: 5%"></td>
                  <td class="nomeRanking" style="width: 75%">Nononononon</td>
                  <td class="pontuacaoRanking" style="width: 20%">345</td>
              </tr> -->
        </div>
        <% }
            }%>
        <div class="caixaBotao">
            <input type="button" value="Voltar" id="botaoMenu" onclick="VoltaDificuldade()" />          
        </div>   

    </body>
</html>