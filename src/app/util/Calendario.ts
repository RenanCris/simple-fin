export class Calendario {
    mes:number;
    ano:number = new Date().getFullYear();

    constructor(mes:number) {
        this.mes =mes;
    }

    static ObterMesAtual :number = new Date().getMonth() + 1;

    static MesesAno = () : Array<Calendario> => {
        let calendario = new Array<Calendario>();
    
        for (let _mes =  1; _mes <= Calendario.ObterMesAtual; _mes++) {
            calendario.push(new Calendario(_mes));
        }
    
        return calendario.sort(function(a, b){return b.mes - a.mes});
    }
}