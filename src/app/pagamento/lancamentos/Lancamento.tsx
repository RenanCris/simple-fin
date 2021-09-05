import React, { ReactElement, useMemo, useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { clonarLancamento, indicarItem, Itens, LancamentoState, removerLancamento } from '../../redux/pagamento.slice'
import { Calendario } from '../../util/Calendario';
import ItemLancamento from './ItemLancamento';
import {  v4 as uuidv4 } from 'uuid';
import { ConfirmarBtn } from '../../components/ConfirmarBtn';
import { RemoverBtn } from '../../components/RemoverBtn';
import NumberFormat from 'react-number-format';
import _lodash from "lodash";
import { MoedaFormat } from '../../components/MoedaFormat';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/pt-br';

interface Props {
    lancamento:LancamentoState,
    key:number
    numero:number;
}

export default function Lancamento(dados: Props): ReactElement{
    const dispatch = useAppDispatch();
    const initialStateItens = {id:uuidv4(), descricao:'', valor:0, pago:false};
    const [item, setItem] = useState<Itens>(initialStateItens);

    const handleRemoverLancamento = () =>{
        dispatch(removerLancamento(dados.lancamento))
    }

    const handleCompletarLancamento = () =>{
         dispatch(indicarItem({...dados.lancamento, itens:[...dados.lancamento.itens,item]}));
         setItem(initialStateItens);
    }

    const handleClonarLancamento = () =>{
        if(Calendario.ObterMesAtual >=  dados.lancamento.mes + 1){
            dispatch(clonarLancamento(dados.lancamento));
        }
    }

    const handleIndicarItem = (evento: React.FormEvent<HTMLInputElement>) =>{
        const {value, name} = evento.currentTarget; 
        setItem({
           ...item,
           id:uuidv4(),
           [name]: value
        })
    }
    
    const bordaIndicacao = `h-full shadow-xl p-6 rounded-lg border-2 ${dados.numero ? "border-gray-200": "border-blue-300"} flex flex-col relative overflow-hidden`;

    const totalItens = useMemo(() => dados.lancamento?.itens.length, [dados.lancamento?.itens]);
    const totalSomatorio = useMemo(() => _lodash.sumBy(dados.lancamento.itens, (obj) => obj.valor), [dados.lancamento?.itens]);

    const usarCloneItemFilho = (it : Itens) =>{
        setItem(it);
    }

    return (
    <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
        <div className={bordaIndicacao}>
            {
                dados.numero === 0 ?
                    <span className="bg-blue-300 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">Vigênte</span>
                :""
            }
            <h2 className="text-sm tracking-widest title-font mb-1 font-medium">Mês:&nbsp;
                <Moment format="MMMM/YYYY">
                   {new Date(dados.lancamento.ano,dados.lancamento.mes - 1)}
                </Moment>
            </h2>
            <h1 className="text-3xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
               <MoedaFormat valor={totalSomatorio}></MoedaFormat>
            </h1>
            {
                dados.lancamento?.itens?.map((i, index) => (
                    <ItemLancamento key={index} item={i} cloneFilho={usarCloneItemFilho} ></ItemLancamento>
                ))
            }
            <div className="flex items-center ">
            <div className="py-2 w-full">
                <div className="relative">
                    <label  className="leading-7 text-sm text-gray-600">Item</label>
                    <input type="text" id="descricao" name="descricao" value={item.descricao} onChange={handleIndicarItem} className="w-full bg-gray-50 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
            </div>
            </div>
            <div className="flex items-center ">
            <div className="py-2 w-full">
                <div className="relative">
                    <label  className="leading-7 text-sm text-gray-600">Valor</label>
                     <NumberFormat
                        className="w-full bg-gray-50 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        name="valor"
                        fixedDecimalScale={true}
                        decimalScale={2}
                        value={item.valor}
                        onValueChange = {(values)=>
                            {
                                const { value } = values;
                                setItem({
                                    ...item,
                                    id:uuidv4(),
                                    valor:parseFloat(value)}) 
                            }
                        }>

                        </NumberFormat>
                </div>
            </div>
            </div>
            <div className="flex items-center">
                <button 
                    onClick={handleClonarLancamento}
                    className="flex items-center mr-1 text-white bg-indigo-200 border-0 py-2 px-4 w-1/2 focus:outline-none hover:bg-indigo-500 rounded">Clonar
                    <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path   d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                </button>
                <ConfirmarBtn desabilitado={(item.descricao === "" || item.valor === 0)} acao={handleCompletarLancamento}></ConfirmarBtn>
            </div>
            <div className="flex items-end mt-3">
                <RemoverBtn acao={handleRemoverLancamento} exibirTitulo={true}></RemoverBtn>
                <span className="absolute right-6 text-blue-500">Total Itens: {totalItens}</span>
            </div>
        </div>
    </div>
    )
    
}
