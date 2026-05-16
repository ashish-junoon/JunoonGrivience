import { useState, useRef } from "react";
import Icon from "../../utils/Icons";

function UploadInput({
  label,
  icon,
  name,
  id,
  onChange,
  onBlur,
  value,
  required,
  acceptedFormats,
  disabled,
}) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

  const [fileName, setFileName] = useState(value ? value.name : "");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      setFileName("");
      return;
    }

    // ✅ Type Validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF, JPG, or PNG files are allowed.");
      event.target.value = "";
      return;
    }

    // ✅ Size Validation
    if (file.size > MAX_FILE_SIZE) {
      setError("File size is too large. Max 5MB allowed.");
      event.target.value = "";
      return;
    }

    setFileName(file.name);

    // ✅ Pass file to parent (Formik / handler)
    onChange(event);
  };

  return (
    <>
      {/* Label */}
      <label className="block mb-1 text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input */}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon && <Icon name={icon} size={18} />}
        </div>}

        <label
          htmlFor={id}
          className={`bg-white border border-gray-300 text-gray-700 text-xs rounded-sm block w-full ${icon ? "pl-10" : "px-3"} py-2 cursor-pointer hover:border-primary focus-within:border-primary overflow-hidden whitespace-nowrap text-ellipsis`}
        >
          <input
            type="file"
            name={name}
            id={id}
            className="hidden"
            accept={acceptedFormats || ".pdf,.jpg,.jpeg,.png"}
            onChange={handleFileChange}
            onBlur={onBlur}
            disabled={disabled}
            ref={fileInputRef}
          />

          <span className="block truncate">
            {fileName || "Upload document"}
          </span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </>
  );
}

export default UploadInput;