<%-- 
    Document   : creditos
    Created on : 18/12/2018, 20:00:20
    Author     : roger
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>..::Tripulação::..</title>
        <link href="https://fonts.googleapis.com/css?family=Righteous" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fredericka+the+Great" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Aldrich" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
        <link rel="stylesheet" href="css/restom.css" type="text/css">
        <link href="css/creditos.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/restom.css" type="text/css">
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
            function joaomarcos() {
                var nome = "João Marcos Sivieri";
                var profissao = "Co-piloto 1";
                document.getElementById('nome').innerHTML = nome;
                document.getElementById('profissao').innerHTML = profissao;

            }
            function rogerio() {
                var nome = "Rogério Siqueira";
                var profissao = "Comandante";
                document.getElementById('nome').innerHTML = nome;
                document.getElementById('profissao').innerHTML = profissao;
            }

            function juliano() {
                var nome = "Juliano Martins";
                var profissao = "Co-piloto 2";
                document.getElementById('nome').innerHTML = nome;
                document.getElementById('profissao').innerHTML = profissao;
            }
            
             function VoltaDificuldade() {
               //window.location.href = "http://localhost:8084/SpaceWarrior/dificuldade.jsp";
               window.location.href = "https://hspacewar.herokuapp.com/dificuldade.jsp"
            }


        </script>
    </head>


    <body>   

        <h1>Tripulação</h1>
    <center>
        <table border="0">
            <tr>
                <td> 
                    <div class="caixaExternaEsquerda">
                        <img src="./imagens/quem.jpg" alt="Imagem colaboradores" width="450" height="450" usemap="#imagemFundo">
                        <map name="imagemFundo">
                            <area shape="rect" coords="40,135,180,475" onclick="joaomarcos()" title="JoaoMarcos">
                            <area shape="rect" coords="185,80,300,475" onclick="juliano()" title="Juliano">
                            <area shape="rect" coords="305,145,700,475" onclick="rogerio()" title="Rogerio">

                            </div> 
                            </td>
                            <td> 
                                <div class="caixaExternaDireita">
                                    <br><br><br>
                                    <h2><span id="nome"></span></h2><br>
                                    <h2><span id="profissao"></span></h2><br>
                                    <h2><span id="aluno"></span></h2><br>

                                </div> 
                            </td>
                            </tr>
                            <tr>
                                <td align="center">
<input type="button" value="Voltar" id="botaoMenu" onclick="VoltaDificuldade()" />          
                                </td>
                                <td></td>
                            </tr>
                            </table>

                            </center>
                           
                            </body>
                            </html>
