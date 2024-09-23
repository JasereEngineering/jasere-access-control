export default function Button({name,onClick,disabled}){
    return (
        <button onClick={onClick} disabled={disabled}>{name}</button>
    )
}