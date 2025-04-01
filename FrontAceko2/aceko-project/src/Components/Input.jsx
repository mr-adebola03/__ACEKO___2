export function Input({type='text',label,icon,placeholder,value,onChange}){
    const iconPeople = <i class="fa-regular fa-user"></i>
    return <div>
        <label htmlFor="addon-wrapping" className="form-label">{label}</label>
        <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">{icon}</span>
            <input type={type} placeholder={placeholder} className="form-control py-[10px]" value={value} onChange={(e)=>onChange(e.target.value)} required />
        </div>
    </div>
}