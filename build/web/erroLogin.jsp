<%-- 
    Document   : erroLogin
    Created on : 03/10/2018, 19:39:28
    Author     : roger
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Erro Login</title>
        <script>

            function Redireciona() {
               // window.location.href = "http://localhost:8084/SpaceWarrior"
                window.location.href = "https://hspacewar.herokuapp.com"
            }
        </script>
    </head>
    <body>
        <h1>Login falhou!</h1>
        <input type="button"  value="Voltar"  onclick="Redireciona()" >
    </body>
</html>
