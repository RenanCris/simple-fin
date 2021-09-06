import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pagamentoSlice from './redux/pagamento.slice';
import usuarioSlice from './redux/usuario.slice';

export const store = configureStore({
  reducer: {
    pagamento: pagamentoSlice,
    usuario:usuarioSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
