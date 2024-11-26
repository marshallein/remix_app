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
   errors
}) => {
   return (
      <div className="mb-3">
         <label htmlFor={htmlFor} className="form-label">
            {label}
         </label>
         <input
            name={htmlFor}
            type={type}
            id={id}
            className={classNames("form-control", errors && "border-danger")}
            value={value}
            placeholder={`Enter your ${label}`}
            required={required}
            onChange={(e) => onchange(e, id)}
         />
         {errors && <p className='text-danger fst-italic'>{errors}</p>}
      </div>
   );
};

export default FormInput;
