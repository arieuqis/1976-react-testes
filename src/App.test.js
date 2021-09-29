import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import App, { calcularNovoSaldo } from "./App";



describe('Componente principal', () => {
    describe('Quando eu abro o app do banco', () => {
        it('o nome é exibido', () => {
            render(<App/>);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
    
        it('o saldo é exibido', () => {
            render(<App/>);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
    });

    describe('Quando eu realizo uma transação', () => {
        it('que é um saque, o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150);
            expect(novoSaldo).toBe(100);
        })
    
        it('que é um saque, a transação deve ser realizada', () => {
            const {getByText, getByLabelText, getByTestId} = render(<App/>);

            const saldo = getByText('R$ 1000');
            const transacao = getByLabelText('Saque')
            const valor = getByTestId('valor');
            const botaoTrasnsacao = getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, {target: {value: 'Saque'}});
            fireEvent.change(valor, {target: {value: 10}});
            fireEvent.click(botaoTrasnsacao);

            expect(saldo.textContent).toBe('R$ 990');
        })

        it('que é um saque, a transação deve ser realizada2', () => {
            render(<App/>);

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque')
            const valor = screen.getByTestId('valor');
            const botaoTrasnsacao = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, {target: {value: 'Saque'}});
            fireEvent.change(valor, {target: {value: 10}});
            fireEvent.click(botaoTrasnsacao);

            expect(saldo.textContent).toBe('R$ 990');
        })
    });
})

