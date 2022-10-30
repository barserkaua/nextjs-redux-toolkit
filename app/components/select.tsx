import { FC } from "react";

interface SelectProps {
  headerText: string;
  options: { value: string; label: string }[];
  onChange: (selectedValue: string) => void;
}

export const Select: FC<SelectProps> = ({ headerText, options, onChange }) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {headerText}
      </label>
      <select
        onChange={(e) => onChange(e.target.value)}
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        <option value="" defaultValue="">
          Choose options
        </option>
        {options.map((opt, index) => (
          <option key={`key-${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
