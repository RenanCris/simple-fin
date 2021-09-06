import React, { ReactElement, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { indicarLancamento, LancamentoState } from '../../redux/pagamento.slice';
import { Calendario } from '../../util/Calendario';
import moment from 'moment';
import { Select } from '../../components/Select';
import { toast } from 'react-toastify';

interface Props {    
}

export default function MesInclusao(data: Props): ReactElement {
    const pagamentoState = useAppSelector((state) => state.pagamento);
    const [meses] = useState(Calendario.MesesAno());
    const [lancamento, setLancamento] = useState<LancamentoState>({mes:0, ano: 0, itens:[]});

    const dispatch = useAppDispatch();

    const handleMes = () =>{

        if(pagamentoState.usuario)
            dispatch(indicarLancamento(lancamento))
        else
            toast.warn('Nenhum usuário indicado!', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    const ConvertCalendarioMes = (numeroMes: any) : LancamentoState =>{
        let _calendario = Calendario.MesesAno().find(x=> x.mes === parseInt(numeroMes)) ?? lancamento;
        return {mes: _calendario?.mes, ano: pagamentoState.ano, itens:[]};
    }

    return (
        <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
            <div className="p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                <div className="flex items-center mb-4">
                    <Select acao={(e)=> setLancamento(ConvertCalendarioMes(e.target.value))}>
                        <option>Meses</option>
                        {
                            meses.map(m =>(
                                <option key={m.mes} value={m.mes}>
                                    {moment(new Date(pagamentoState.ano,m.mes -1)).format('MMM/YY')}
                                </option>
                            ))
                        }
                    </Select>
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
