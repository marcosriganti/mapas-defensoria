import React, { useState } from "react";
import Autocomplete from "react-autocomplete";
import { WithContext as ReactTags } from "react-tag-input";

import cities from "../data/cities.json";

const TypeNumber = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <input
        name={field.name}
        type="number"
        onChange={(ev) => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        value={values[field.name] ? values[field.name] : ""}
      />
    </label>
  );
};
const TypeText = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <input
        name={field.name}
        onChange={(ev) => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        type="text"
        value={values[field.name] ? values[field.name] : ""}
      />
    </label>
  );
};
const TypeTextarea = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <textarea
        className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
        rows="5"
        name={field.name}
        onChange={(ev) => handleChange(field.name, ev.target.value)}
      >
        {values[field.name] ? values[field.name] : ""}
      </textarea>
    </label>
  );
};
const TypeSelect = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <select
        name={field.name}
        onChange={(ev) => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        type="text"
        value={values[field.name] ? values[field.name] : ""}
      >
        <option>Test</option>
      </select>
    </label>
  );
};
const TypeCities = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <div className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input">
        <Autocomplete
          className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
          getItemValue={(item) => item.full_name}
          wrapperStyle={{ width: "100%" }}
          items={cities}
          shouldItemRender={(item, value) =>
            item.full_name.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? "lightgray" : "white" }}
              className="w-full p-2"
            >
              {item.full_name}
            </div>
          )}
          value={values[field.name] ? values[field.name] : ""}
          onChange={(ev) => handleChange(field.name, ev.target.value)}
          onSelect={(val) => handleChange(field.name, val)}
        />
      </div>
    </label>
  );
};
const TypeTags = ({ field, handleChange, values }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleAddition = (tag) => {
    const base = values[field.name] ? values[field.name] : [];
    const newValue = [...base, tag];
    handleChange(field.name, newValue);
  };
  const handleDelete = (i) => {
    const base = values[field.name] ? values[field.name] : [];
    handleChange(
      field.name,
      base.filter((tag, index) => index !== i)
    );
  };
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <ReactTags
        classNames={{
          tagInputField:
            "block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input",
        }}
        tags={values[field.name] ? values[field.name] : []}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        placeholder={`Ingrese ${field.label}`}
        inputFieldPosition="bottom"
      />
    </label>
  );
};

const TypeImage = ({ field, handleChange, values }) => {
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        handleChange(field.name, reader.result)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <label className="block text-sm mb-1">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <div className="flex space-x-5 items-center">
        <div className="rounded-full border border-paleTeal overflow-hidden w-20 h-20 text-center items-center flex">
          {values[field.name] ? (
            <img
              src={values[field.name]}
              className="w-full h-full my-2"
              alt=""
            />
          ) : null}
        </div>
        <label className="px-3 py-1 border border-purple-400 text-purple rounded-full uppercase text-xs mt-1 mx-2 mb-2">
          Seleciona una imagen
          <input
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            className=" hidden"
          />
        </label>
      </div>
      {/* <input
        name={field.name}
        onChange={(ev) => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        type="text"
        value={values[field.name] ? values[field.name] : ""}
      /> */}
    </label>
  );
};

const types = {
  text: TypeText,
  number: TypeNumber,
  textarea: TypeTextarea,
  select: TypeSelect,
  customCities: TypeCities,
  tag: TypeTags,
  image: TypeImage,
};

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
        const Element = types[field.type];
        console.log(field.type);
        return (
          Element &&
          !field.hidden && (
            <div className="block mt-4 text-sm" key={`field-${field.name}`}>
              {
                <Element
                  field={field}
                  handleChange={handleChange}
                  values={values}
                ></Element>
              }
            </div>
          )
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
