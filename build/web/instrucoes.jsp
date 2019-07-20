<%-- 
    Document   : instrucoes
    Created on : 18/12/2018, 20:11:35
    Author     : roger
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
        <link href="css/instrucoes.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <script src="js/funcoes.js"></script>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
        <link rel="icon" href="favicon.ico" type="image/x-icon">
        <script>

            function randombg() {
                var random = Math.floor(Math.random() * 6);
                var fundo = ["url('./imagens/bg5.jpg')"];
                document.getElementById('myBody').style.backgroundImage = fundo[random];

            }
            
             function VoltaDificuldade() {
               //window.location.href = "http://localhost:8084/SpaceWarrior/dificuldade.jsp"
               window.location.href = "https://hspacewar.herokuapp.com/dificuldade.jsp"
            }
        </script>
        <style>

            p {
                text-align: center;
                font-size: 20px;
                text-shadow: 3px 3px 4px rgba(11,15,185,1);
                color: white;
                text-align:center; 
                margin-bottom:5px; 
                margin-top:5px;
                letter-spacing: 5px;
            }

            input[type="email"] {
                border: 1px solid #ddd;
                padding: 4px 8px;
            }


            input[type="button"] {
                margin-top: 267px;
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
            input[type="button"]:hover{    
                text-shadow: 0px 0px 0px black;
                text-shadow: 2px 2px 2px white;   
                background-image: linear-gradient(rgb(0, 0, 0), rgb(255, 255, 255));
            }
            input[type="button"]:active{
                transform: scale(0.98);
            }

        </style>
    </head>


    <body id="myBody" >   

        <h1>Instruções</h1>
        <div class="caixaExterna">
            <div class="vertical-menu">
                <p>Movimentar [A][W][D] ou [&larr;][&uarr;][&rarr;]</p><br>
                <p>Atirar [Espaço] ou [K]</p><br>
                <p>Ativar escudo [S] ou [&darr;]</p><br>
                <p>Sair [ESC](Retorna Menu)</p><br>
            </div>
            <div align="bottom">
                <input type="button" value="Voltar"  id="botaoMenu" onclick="VoltaDificuldade()" />
            </div>         
        </div> 

    </body>
</html>

