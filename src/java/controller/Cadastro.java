/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Jogador;

/**
 *
 * @author roger
 */
@WebServlet(name = "Cadastro", urlPatterns = {"/Cadastro"})
public class Cadastro extends HttpServlet {

    public List<Jogador> ListaJogadores() throws FileNotFoundException, IOException {
        List<Jogador> listaJogadores = new ArrayList<>();

        String caminhoDir = getServletContext().getRealPath("/WEB-INF");
        File arquivo = new File(caminhoDir, "jogadores.txt");

        if (arquivo.exists()) {
            String linha;
            String jog = getServletContext().getRealPath("/WEB-INF/jogadores.txt");
            BufferedReader b = new BufferedReader(
                    new InputStreamReader(
                            new FileInputStream(jog), Charset.forName("UTF-8").newDecoder()));
            while ((linha = b.readLine()) != null) {
                if ((linha != null) && (!linha.isEmpty())) {
                    Jogador a = new Jogador();
                    String[] vetJogador = linha.split(";");
                    a.setId(Integer.parseInt(vetJogador[0]));
                    a.setNomeUsuario(vetJogador[1]);
                    a.setSenhaUsuario(vetJogador[2]);
                    a.setEmailUsuario(vetJogador[3]);
                    listaJogadores.add(a);
                }
            }
            b.close();
        }
        return listaJogadores;
    }

    public int leProximoJogador() throws FileNotFoundException, IOException {
        int cont = 0;
        String caminhoDir = getServletContext().getRealPath("/WEB-INF");
        File arquivo = new File(caminhoDir, "jogadores.txt");
        if (arquivo.exists() == false) {
            arquivo.createNewFile();
        }
        String jog = getServletContext().getRealPath("/WEB-INF/jogadores.txt");
        BufferedReader b = new BufferedReader(
                new InputStreamReader(
                        new FileInputStream(jog), Charset.forName("UTF-8").newDecoder()));
        while (b.readLine() != null) {
            cont++;
        }
        b.close();
        return cont;
    }

    public boolean gravaJogador(Jogador j) throws IOException {
        //Verificando se existe o jogador cadastrado

        boolean retorno = false;

        List<Jogador> lista = ListaJogadores();
        // aplicar quick para ordenar a lista
        Jogador[] vetor = lista.toArray(new Jogador[lista.size()]);
        OrdenacaoSelectionSortRecursiva.selectionSortDescJogador(vetor, 0);    
        
        if (BuscaBinariaRecursiva.buscaBinaria(vetor, j.getEmailUsuario()) == -1) {

            String caminhoDir = getServletContext().getRealPath("/WEB-INF");
            File arquivo = new File(caminhoDir, "jogadores.txt");
            if (arquivo.exists() == false) {
                arquivo.createNewFile();
            }
            String jog = getServletContext().getRealPath("/WEB-INF/jogadores.txt");
            OutputStreamWriter g = new OutputStreamWriter(
                    new FileOutputStream(jog, true), Charset.forName("UTF-8").newEncoder());
            BufferedWriter b = new BufferedWriter(g);
            b.write(j.getId() + ";");
            b.write(j.getNomeUsuario() + ";");
            b.write(j.getSenhaUsuario() + ";");
            b.write(j.getEmailUsuario() + ";");
            b.write(j.getMaior_Pontuacao() + ";");
            b.write(j.getQuantidade_Jogo() + ";");            
            b.newLine();
            b.flush();
            b.close();
            retorno = true;
        }
        return retorno;
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

        int cont = leProximoJogador();
        Jogador j = new Jogador();
        j.setId(++cont);
        j.setNomeUsuario(request.getParameter("nomeUsuario"));
        j.setSenhaUsuario(request.getParameter("senhaUsuario"));
        j.setEmailUsuario(request.getParameter("emailUsuario"));
        if (gravaJogador(j)) {
            request.setAttribute("resultado", "Cadastro realizado!");
            request.getRequestDispatcher("index.jsp").forward(request, response);
        } else {
            request.setAttribute("resultado", "Email já registrado!");
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
