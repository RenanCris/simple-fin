import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsuarioState{
    nome:string;
}

const initialState = {nome:''} as UsuarioState;

const usuarioSlice = createSlice({
    name : 'usuario',
    initialState,
    reducers :{
        indicarUsuario(state , action: PayloadAction<UsuarioState>){
            state.nome = action.payload.nome;
        }
    }
});

export const {indicarUsuario} = usuarioSlice.actions;
export default usuarioSlice.reducer;
