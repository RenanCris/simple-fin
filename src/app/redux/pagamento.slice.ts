import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import _lodash from "lodash";
import { v4 as uuidv4 } from 'uuid';

export interface Itens{
    id:string;
    descricao:string;
    valor:number;
    pago:boolean;
}

export interface PagamentosState{
    usuario:string;
    ano:number;
    lancamentos?: Array<LancamentoState>;
}

export interface LancamentoState {
    mes :number;
    ano:number;
    itens: Array<Itens>;
}

const initialState = {lancamentos : new Array<LancamentoState>(), usuario:'', ano: 0} as PagamentosState;

const pagamentoSlice = createSlice({
    name : 'pagamentos',
    initialState,
    reducers :{
        indicarLancamento(state , action: PayloadAction<LancamentoState>){
            if(!state.lancamentos?.find(x=> x.mes === action.payload.mes))
                state.lancamentos?.push(action.payload);
        },
        removerLancamento(state,action: PayloadAction<LancamentoState>){
            state.lancamentos?.splice(state.lancamentos?.findIndex(x=> x.mes === action.payload.mes && x.ano === action.payload.ano),1)
        },
        indicarItem(state , action: PayloadAction<LancamentoState>){
            let novoValor = action.payload.itens[action.payload.itens.length - 1];
           if(!state.lancamentos?.find(x=> x.mes === action.payload.mes)?.itens.find(x=> x.id === novoValor.id))
                state.lancamentos?.find(x=> x.mes === action.payload.mes)?.itens.push(novoValor);
        },
        clonarLancamento(state , action: PayloadAction<LancamentoState>){
            if(!state.lancamentos?.find(x=> x.mes === action.payload.mes + 1)){
                let novoItem: Itens[] = [];
                
                _lodash.forEach(action.payload.itens, iten =>{
                    novoItem.push({id: uuidv4(), descricao: iten.descricao, valor: iten.valor, pago: false});
                });

                state.lancamentos?.push({...action.payload, mes: action.payload.mes + 1, itens:novoItem});
            }
        },
        removerItem(state , action: PayloadAction<Itens>){
            let lancamento = state.lancamentos?.find(x=> x.itens.find(f=> f.id === action.payload.id));
            lancamento?.itens.splice(lancamento?.itens.findIndex(f=> f.id === action.payload.id),1);
        },
        mudarSituacaoItem(state , action: PayloadAction<Itens>){
            state.lancamentos?.forEach(lan =>{
                if(lan.itens.find(f=> f.id === action.payload.id)){
                    let item = lan.itens.find(f=> f.id === action.payload.id);
                    if(item)
                        item.pago = !action.payload.pago ;
                }
            })
        },
        indicarConfiguracaoBasicaPagamento(state, action: PayloadAction<PagamentosState>){
            state.usuario = action.payload.usuario;
            state.ano = action.payload.ano;
        }
    }
});

export const {indicarLancamento, removerLancamento, indicarItem , clonarLancamento,removerItem, mudarSituacaoItem, indicarConfiguracaoBasicaPagamento} = pagamentoSlice.actions;
export default pagamentoSlice.reducer;

