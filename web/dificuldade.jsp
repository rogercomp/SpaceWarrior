<%-- 
    Document   : fdificuldade
    Created on : 16/12/2018, 11:09:31
    Author     : roger
--%>

<%@page import="model.Jogador"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%

    Jogador j = (Jogador) session.getAttribute("usuarioLogado");
    //out.print(j);
    if (j != null) {
      //  out.print(j.getNomeUsuario());
    
%>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>..::Menu::..</title>
        <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
         <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
         <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <link href="css/menu.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <script src="js/funcoes.js"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <script>
            
                function randombg(){
        var random = Math.floor(Math.random() * 4);
        var fundo = ["url('./imagens/bg1.jpg')",                 
                 "url('./imagens/bg3.jpg')",
                 "url('./imagens/bg4.jpg')",
                 "url('./imagens/bg5.jpg')"];
        document.getElementById('myBody').style.backgroundImage=fundo[random];
        
    }
        </script>
    </head>
    
    
    <body id="myBody" onload="randombg()">   
        <audio id="audioinputs"><source src="sons/menuselection.wav" type="audio/wav"></audio>
        <h1>Menu</h1>
        <div class="caixaExterna">
            <div class="vertical-menu">
                <a href="https://hspacewar.herokuapp.com/jogo.jsp" onmouseover="playAudio('audioinputs');"  >Jogar</a>
                <a href="https://hspacewar.herokuapp.com/instrucoes.jsp" onmouseover="playAudio('audioinputs');">Instruções</a>
                <a href="https://hspacewar.herokuapp.com/MontaRank" onmouseover="playAudio('audioinputs');">Ranking</a>
                <a href="https://hspacewar.herokuapp.com/configuracoes.jsp" onmouseover="playAudio('audioinputs');">Configurações</a>
                <a href="https://hspacewar.herokuapp.com/creditos.jsp" onmouseover="playAudio('audioinputs');">Tripulação</a>
            </div>
                                  
           <!-- <input type="button" class="botaoMenu" value="Jogar">
            <input type="button" class="botaoMenu" value="Instruções">
            <input type="button" class="botao" value="Ranking">
            <input type="button" class="ranking" value="Home">
            <input type="button" class="botaoMenu" value="Configurações"><br>
            <input type="button" class="botaoMenu" value="Pesquisar">-->
      </div> 
    </body>
</html>



<%    // se não existir um login na sessao, 
    // vai enviar para a página de login novamente
} else {
%>
<jsp:forward page="index.jsp"></jsp:forward>
<%
    }
%>
