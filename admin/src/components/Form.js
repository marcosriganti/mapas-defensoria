import React, { useState } from "react";
/* <div className="mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Account Type
              </span>
              <div className="mt-2">
                <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
                  <input
                    type="radio"
                    className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    name="accountType"
                    value="personal"
                  />
                  <span className="ml-2">Personal</span>
                </label>
                <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                  <input
                    type="radio"
                    className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                    name="accountType"
                    value="busines"
                  />
                  <span className="ml-2">Business</span>
                </label>
              </div>
            </div>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Requested Limit
              </span>
              <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
                <option>$1,000</option>
                <option>$5,000</option>
                <option>$10,000</option>
                <option>$25,000</option>
              </select>
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">
                Multiselect
              </span>
              <select
                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                multiple
              >
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
              </select>
            </label>

            <label className="block mt-4 text-sm">
              <span className="text-gray-700 dark:text-gray-400">Message</span>
              <textarea
                className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                rows="3"
                placeholder="Enter some long form content."
              ></textarea>
            </label>

            <div className="flex mt-6 text-sm">
              <label className="flex items-center dark:text-gray-400">
                <input
                  type="checkbox"
                  className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                />
                <span className="ml-2">
                  I agree to the
                  <span className="underline">privacy policy</span>
                </span>
              </label>
            </div> */

const Form = ({ fields, onSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues ?? {});
  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };
  return (
    <div>
      {fields.map((field) => {
        return (
          <div className="block mt-4 text-sm" key={`field-${field.name}`}>
            {field.type === "text" && (
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  {field.label}
                </span>
                <input
                  name={field.name}
                  onChange={(ev) => handleChange(field.name, ev.target.value)}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  value={values[field.name] ? values[field.name] : ""}
                />
              </label>
            )}
            {field.type === "textarea" && (
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  {field.label}
                </span>
                <textarea
                  className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  rows="5"
                  name={field.name}
                  onChange={(ev) => handleChange(field.name, ev.target.value)}
                >
                  {values[field.name] ? values[field.name] : ""}
                </textarea>
              </label>
            )}
          </div>
        );
      })}
      <hr className="my-4" />
      <button
        className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        onClick={(ev) => {
          ev.preventDefault();
          onSubmit(values);
        }}
      >
        Enviar
      </button>
    </div>
  );
};
export default Form;
