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
public class BuscaBinariaRecursiva {

    public static final int NAO_ENCONTRADO = -1;

    /**
     * @return posição onde o item foi encontrado ou não encontrado.
     */
    public static int buscaBinaria(Jogador[] a, String x) {
        return buscaBinaria(a, x, 0, a.length - 1);
    }

    /**
     * recursão
     */
    private static int buscaBinaria(Jogador[] a, String x, int inicio, int fim) {
        if (inicio > fim) {
            return NAO_ENCONTRADO;
        }

        int meio = (inicio + fim) / 2;

        if (a[meio].compareTo(x) < 0) {
            return buscaBinaria(a, x, meio + 1, fim);
        } else if (a[meio].compareTo(x) > 0) {
            return buscaBinaria(a, x, inicio, meio - 1);
        } else {
            return meio;
        }
    }

    // Programa teste
    /* public static void main( String [ ] args )
    {
        int SIZE = 8;
        Comparable [ ] a = new Integer [ SIZE ];
        for( int i = 0; i < SIZE; i++ )
            a[ i ] = new Integer( i * 2 );

        for( int i = 0; i < SIZE * 2; i++ )
            System.out.println( "Encontrado " + i + " em " +
                                     buscaBinaria( a, new Integer( i ) ) );
    }*/
}
