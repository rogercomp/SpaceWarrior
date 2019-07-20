/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import model.Jogador;

/**
 *
 * @author roger
 */
public class OrdenacaoQuickSort {

    public static void quicksort(Jogador[] vetor, int ini, int fim) {
        int pivo = 0;
        if (fim > ini) {
            pivo = selecionaPivo(vetor, ini, fim);
            pivo = organiza(vetor, ini, fim, pivo);
            quicksort(vetor, ini, pivo - 1);
            quicksort(vetor, pivo + 1, fim);
        }
    }

    private static int organiza(Jogador[] vetor, int ini, int fim, int pivo) {

        int i = pivo;
        for (int j = ini + 1; j <= fim; j++) {
            if (vetor[j].getMaior_Pontuacao() > vetor[ini].getMaior_Pontuacao()
                || (vetor[j].getMaior_Pontuacao() == vetor[ini].getMaior_Pontuacao() && vetor[j].getQuantidade_Jogo() < vetor[ini].getQuantidade_Jogo() )
                || (vetor[j].getMaior_Pontuacao() == vetor[ini].getMaior_Pontuacao() &&  vetor[j].getQuantidade_Jogo() == vetor[ini].getQuantidade_Jogo() && vetor[j].getNomeUsuario().compareToIgnoreCase(vetor[ini].getNomeUsuario()) < 0)  
                    ) {
                ++i;
                troca(vetor, i, j);
            }
        }
        troca(vetor, i, ini);
        return i;
    }

    private static int selecionaPivo(Jogador[] vetor, int ini, int fim) {

        return ini;
    }

    public static void troca(Jogador vetor[], int i, int j) {
        Jogador temp = vetor[j];
        vetor[j] = vetor[i];
        vetor[i] = temp;
    }

}
