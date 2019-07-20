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
public class OrdenacaoSelectionSortRecursiva {

    /*  static void selectionSortDescJogador(Jogador x[]) {
        int i, j, posMenor;
        for (i = 0; i < x.length; i++) {
            posMenor = i;
            for (j = i + 1; j < x.length; j++) {
                if (x[posMenor].getMaior_Pontuacao() < x[j].getMaior_Pontuacao()
                        || (x[posMenor].getMaior_Pontuacao() == x[j].getMaior_Pontuacao() && x[j].getNomeUsuario().compareToIgnoreCase(x[j - 1].getNomeUsuario()) < 0)) {

                    posMenor = j;
                }
            }
            Jogador temp = x[i];
            x[i] = x[posMenor];
            x[posMenor] = temp;
        }
    } */
    static void selectionSortDescJogador(Jogador[] x, int startIndex) {
        if (startIndex >= x.length - 1) {
            return;
        }
        int posMenor = startIndex;

        for (int index = startIndex + 1; index < x.length; index++) {
            if (x[posMenor].getMaior_Pontuacao() < x[index].getMaior_Pontuacao()
                    || (x[posMenor].getMaior_Pontuacao() == x[index].getMaior_Pontuacao() && x[index].getNomeUsuario().compareToIgnoreCase(x[index - 1].getNomeUsuario()) < 0)) {

                posMenor = index;
            }
        }
        Jogador temp = x[startIndex];
        x[startIndex] = x[posMenor];
        x[posMenor] = temp;
        selectionSortDescJogador(x, startIndex + 1);
    }

}
