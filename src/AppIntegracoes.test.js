import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import api from "./api";
import App from "./App";

jest.mock('./api')

describe('Requisições para API', () => {
    it('Exibir lista de transações através da API', async() => {
        api.listaTransacoes.mockResolvedValue( [
            {
                "valor": "10",
                "transacao": "saque",
                "data": "10/08/2020",
                "id": 1
              },
              {
                "transacao": "deposito",
                "valor": "20",
                "data": "26/09/2020",
                "id": 2
              },
        ]);

        render(<App/>);

        expect(await screen.findByText('Saque')).toBeInTheDocument();

        expect(screen.getByTestId('transacoes').children.length).toBe(2);
    })
})