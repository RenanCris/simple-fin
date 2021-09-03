import NumberFormat from 'react-number-format'

interface Props {
    valor?:number;
}

export const MoedaFormat = (props: Props) => {
    return (
        <span>
            <NumberFormat
                        value={props.valor}
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$"
                        fixedDecimalScale={true}
                        decimalScale={2}
                        />
        </span>
    )
}
