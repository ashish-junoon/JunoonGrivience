import { useState } from "react";
import Icon from "../../utils/Icons";

function TextInput({ label, icon, type, name, id, placeholder, onChange, onBlur, value, required, disabled, maxLength, style, readOnly, hideEye=false }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-800">
                {label}{required ? <span className="text-danger text-sm">*</span> : ""}
            </label>
            <div className="relative">
                {icon && <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
                    <Icon name={icon} size={20} />
                </div>}

                <input
                readOnly={readOnly}
                    type={showPassword ? "text" : type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="off"
                    disabled={disabled}
                    maxLength={maxLength}
                    // onPaste={handlePaste}
                    spellCheck="false"
                    className={`bg-white border border-gray-300 text-gray-800 text-md rounded focus:ring-1 focus:ring-primary focus:border-primary outline-0 block w-full ${icon ? "ps-10" : "px-2"} p-1 focus:shadow-sm focus:outline-light ${disabled ? " bg-zinc-100" : ""} ${style}`}
                />
                {type === "password" && !hideEye && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-auto"
                    >
                        <Icon name={showPassword ? "RiEyeOffLine" : "RiEyeLine"} size={22} />
                    </button>
                )}
            </div>
        </>
    );
}

export default TextInput;
