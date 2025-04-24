export default function Input({ label, type, placeholder, value, onChange, className, ...props }) {
    return (
        <div>
            <label className="block text-gray-700">{label}</label>
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                className={`w-full border px-3 py-2 rounded-lg mt-1 ${className}`} 
                {...props}
            />
        </div>
    )
}