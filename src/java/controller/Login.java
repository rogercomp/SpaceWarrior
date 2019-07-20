/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Jogador;

/**
 *
 * @author roger
 */
@WebServlet(name = "Login", urlPatterns = {"/Login"})
public class Login extends HttpServlet {

    /*
       Verifica se as credenciais existe no arquivo de jogadores    
     */
    public Jogador verificaCredenciais(String nome, String senha) throws FileNotFoundException, IOException {
        String caminhoDir = getServletContext().getRealPath("/WEB-INF");
        File arquivo = new File(caminhoDir, "jogadores.txt");
        Jogador j = null;
        if (arquivo.exists()) {
            String linha;
            String jog = getServletContext().getRealPath("/WEB-INF/jogadores.txt");
            BufferedReader b = new BufferedReader(
                    new InputStreamReader(
                            new FileInputStream(jog), Charset.forName("UTF-8").newDecoder()));
            while ((linha = b.readLine()) != null) {
                if ((linha != null) && (!linha.isEmpty())) {
                    String[] vetJogador = linha.split(";");
                    if (vetJogador[1].equals(nome) && vetJogador[2].equals(senha)) {
                        j = new Jogador();
                        j.setId(Integer.parseInt(vetJogador[0]));
                        j.setNomeUsuario(vetJogador[1]);
                        j.setSenhaUsuario(vetJogador[2]);
                        j.setEmailUsuario(vetJogador[3]);
                        j.setMaior_Pontuacao(Integer.parseInt(vetJogador[4]));
                        j.setQuantidade_Jogo(Integer.parseInt(vetJogador[5]));
                        break;
                    }
                }
            }
            b.close();
        }
        return j;
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        String strNome = request.getParameter("nome");
        String strSenha = request.getParameter("senha");
        Jogador j = verificaCredenciais(strNome, strSenha);

        if (j != null) {
            j.setDificuldade(1);
            j.setAudio(true);
            j.setMusica(true);
            request.setAttribute("resultado", "Credenciais válidas!");
            //  request.setAttribute("posicao", );       
            HttpSession session = request.getSession(true);
            session.setAttribute("usuarioLogado", j);
            request.getRequestDispatcher("dificuldade.jsp").forward(request, response);

        } else {
            request.setAttribute("resultado", "Credenciais inválidas!");
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
