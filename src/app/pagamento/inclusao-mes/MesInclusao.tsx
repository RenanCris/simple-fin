import React, { ReactElement, useState } from 'react'
import { useAppDispatch } from '../../hooks';
import { indicarLancamento, LancamentoState } from '../../redux/pagamento.slice';
import { Calendario } from '../../util/Calendario';

interface Props {    
}

export default function MesInclusao(data: Props): ReactElement {
    const [meses] = useState(Calendario.MesesAno());
    const [lancamento, setLancamento] = useState<LancamentoState>({mes:0, ano: 0, itens:[]});

    const dispatch = useAppDispatch();

    const handleMes = () =>{
        dispatch(indicarLancamento(lancamento))
    }

    const ConvertCalendarioMes = (numeroMes: any) : LancamentoState =>{
        let _calendario = Calendario.MesesAno().find(x=> x.mes === parseInt(numeroMes)) ?? lancamento;
        return {mes: _calendario?.mes, ano: _calendario?.ano, itens:[]};
    }

    return (
        <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <div className="flex items-center mb-4">
                    <div className="relative w-full">
                        <select 
                            onChange={(e)=> setLancamento(ConvertCalendarioMes(e.target.value))}
                            className="rounded border w-full appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                            <option>Meses</option>
                            {
                                meses.map(m =>(
                                    <option key={m.mes} value={m.mes}>{m.mes}/{m.ano}</option>
                                ))
                            }
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                                <path d="M6 9l6 6 6-6"></path>
                            </svg>
                        </span>
                    </div>
                </div>
                <button 
                    onClick={handleMes}
                    className="flex items-center mt-auto text-white bg-blue-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-blue-500 rounded">Incluir
                    <svg  className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                    </svg>
                </button>
                <p className="text-xs text-gray-500 mt-3">Somente meses ainda não incluídos*</p>
            </div>
        </div>
    )
}
