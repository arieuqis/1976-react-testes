import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Conta from "./Conta";

describe('Componente de conta', () => {
    it('Exibir o saldo da conta com a formatação monetária', () => {
        
        render(<Conta saldo={1000}/>);

        const saldo = screen.getByTestId('saldo-conta');

        expect(saldo.textContent).toBe('R$ 1000')
    })  

    it('Chama a função de realizar transação quando o botão é clicado', () => {
        const funcaoRealizarTransacao = jest.fn();
        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

        const botaoTrasnsacao = screen.getByText('Realizar operação');
        fireEvent.click(botaoTrasnsacao);

        expect(funcaoRealizarTransacao).toHaveBeenCalled()
    }) 
})