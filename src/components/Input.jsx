// the useId hook is used to generate unique IDs for elements
import React, { useId } from "react";

// hooks bindup-> use arrow function
const Input = React.forwardRef(function Inpput(
  { label, type = "text", classname = "", ...props },
  // element will use this reference
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={` ${classname} 
                    px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        // yaha se state ka access liya jayega aur component se reference pass kiya jayega--> for onClick etc
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
