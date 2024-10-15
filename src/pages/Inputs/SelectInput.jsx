import React from "react";

const SelectInput = ({
  id,
  name,
  label,
  options = [],
  required = false,
  disabled = false,
  value,
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <select
        id={id}
        name={name}
        required={required}
        className={`relative w-full h-12 px-3 transition-all bg-white border-2 rounded outline-none appearance-none peer border-[#b3b4b6] text-[#4c4c4e] autofill:bg-white focus:border-[#ff5001] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled selected>
          {/* Placeholder for empty option */}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-3 left-2 z-[1] px-2 text-[14px] text-[#4c4c4e] transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-[#000000] peer-valid:-top-2 peer-valid:text-[14px] peer-focus:-top-2 peer-focus:text-[14px] peer-focus:text-[#ff5001] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        {label}
      </label>
    </div>
  );
};

export default SelectInput;
