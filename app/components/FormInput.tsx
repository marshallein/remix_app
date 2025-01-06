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
      <div className="">
         <label htmlFor={htmlFor} className="">
            {label}
         </label>
         <input
            name={htmlFor}
            type={type}
            id={id}
            className={classNames('', errors && '')}
            value={value}
            placeholder={`Enter your ${label}`}
            required={required}
            onChange={(e) => onchange(e, id)}
         />
         {errors && <p className="">{errors}</p>}
      </div>
   );
};

export default FormInput;
