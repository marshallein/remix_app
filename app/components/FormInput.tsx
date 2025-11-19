import classNames from 'classnames';
import { FC } from 'react';

type Props = {
   htmlFor: string;
   id: string;
   label: string;
   type?: string;
   value: string;
   onchange: (
      event: React.ChangeEvent<HTMLInputElement>,
      field: string,
   ) => void;
   required?: boolean;
   errors?: string;
};

const FormInput: FC<Props> = ({
   htmlFor,
   id,
   label,
   type = 'text',
   value,
   onchange,
   required = false,
   errors,
}) => {
   return (
      <div className="space-y-2">
         <label
            htmlFor={htmlFor}
            className="block text-xs font-semibold uppercase tracking-[0.25em] text-alternative_1"
         >
            {label}
         </label>
         <input
            name={htmlFor}
            type={type}
            id={id}
            className={classNames(
               'w-full rounded border border-alternative_1/30 bg-white/80 px-4 py-3 text-base text-alternative_2 shadow-lg shadow-alternative_1/5 placeholder:text-alternative_1/50 transition focus:border-secondary focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50',
               errors &&
                  'border-rose-400/80 text-rose-600 placeholder:text-rose-300 focus:border-rose-400 focus-visible:ring-rose-100',
            )}
            value={value}
            placeholder={`Enter your ${label}`}
            required={required}
            onChange={(e) => onchange(e, id)}
         />
         {errors && (
            <p className="text-sm font-medium text-rose-500">
               {errors}
            </p>
         )}
      </div>
   );
};

export default FormInput;
