/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model;

/**
 *
 * @author roger
 */
public class Jogo {
    
    private int idJogador;
    private int Ponto_Jogo;
    private String Data_Jogo;

    public int getIdJogador() {
        return idJogador;
    }

    public int getPontoJogador() {
        return Ponto_Jogo;
    }

    public String getDataJogo() {
        return Data_Jogo;
    }

    public void setIdJogador(int idJogador) {
        this.idJogador = idJogador;
    }

    public void setPontoJogo(int pntJogador) {
        this.Ponto_Jogo = pntJogador;
    }

    public void setDataJogada(String dataJogada) {
        this.Data_Jogo = dataJogada;
    }
    
}
