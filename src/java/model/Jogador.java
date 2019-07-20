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
public class Jogador {

        
    private int id;
    private String nomeUsuario;   
    private String senhaUsuario;
    private String emailUsuario;   
    private int Quantidade_Jogo;
    private int Maior_Pontuacao;
    private int dificuldade;
    private boolean audio;
    private boolean musica;

    public int getId() {
        return id;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public String getSenhaUsuario() {
        return senhaUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }
    
    /**
     * @return the Quantidade_Ponto
     */
    public int getQuantidade_Jogo() {
        return Quantidade_Jogo;
    }
    
     /**
     * @return the Maior_Pontuacao
     */
    public int getMaior_Pontuacao() {
        return Maior_Pontuacao;
    }
    
     public void setId(int id) {
        this.id = id;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public void setSenhaUsuario(String senhaUsuario) {
        this.senhaUsuario = senhaUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }
    
     /**
     * @param Quantidade_Jogo the Quantidade_Jogo to set
     */
    public void setQuantidade_Jogo(int Quantidade_Jogo) {
        this.Quantidade_Jogo = Quantidade_Jogo;
    }
    
    /**
     * @param Maior_Pontuacao the Maior_Pontuacao to set
     */
    public void setMaior_Pontuacao(int Maior_Pontuacao) {
        this.Maior_Pontuacao = Maior_Pontuacao;
    }  
    
    public int compareTo(String comparestu) {
       
        return this.getEmailUsuario().compareToIgnoreCase(comparestu);      
    }
    
    /**
     * @return the dificuldade
     */
    public int getDificuldade() {
        return dificuldade;
    }

    /**
     * @param dificuldade the dificuldade to set
     */
    public void setDificuldade(int dificuldade) {
        this.dificuldade = dificuldade;
    }

    /**
     * @return the audio
     */
    public boolean isAudio() {
        return audio;
    }

    /**
     * @param audio the audio to set
     */
    public void setAudio(boolean audio) {
        this.audio = audio;
    }

    /**
     * @return the musica
     */
    public boolean isMusica() {
        return musica;
    }

    /**
     * @param musica the musica to set
     */
    public void setMusica(boolean musica) {
        this.musica = musica;
    }
}
