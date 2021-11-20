import React, { useEffect, useState } from "react";
import Select from "react-select";
import { WithContext as ReactTags } from "react-tag-input";
import { SwatchesPicker } from "react-color";
import { firebase_app } from "../firebase";
import cities from "../data/cities.json";

const TypeNumber = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <input
        name={field.name}
        type="number"
        onChange={ev => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        value={values[field.name] ? values[field.name] : ""}
      />
    </label>
  );
};
const TypeColor = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <SwatchesPicker
        color={values[field.name] ? values[field.name] : ""}
        onChange={(color, event) => {
          handleChange(field.name, color.hex);
        }}
        name={field.name}
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
        onChange={ev => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        type="text"
        minLength={field.min || 0}
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
        onChange={ev => handleChange(field.name, ev.target.value)}
      >
        {values[field.name] ? values[field.name] : ""}
      </textarea>
    </label>
  );
};
const getCategories = async () => {
  let query = firebase_app.firestore().collection("categories");
  const querySnapshot = await query.get();
  let cats = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    cats.push(data.name);
  });
  return cats;
};
const TypeCategory = ({ field, handleChange, values }) => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const newCats = await getCategories();
      return newCats;
    };
    getCats().then(data => {
      setCats(data);
    });
  }, []);

  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <select
        name={field.name}
        onChange={ev => handleChange(field.name, ev.target.value)}
        className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
        placeholder=""
        type="text"
        value={values[field.name] ? values[field.name] : ""}
      >
        <option value="">Seleciona una categoria</option>
        {cats.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </label>
  );
};
const TypeSelect = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>

      <select
        name={field.name}
        onChange={ev => handleChange(field.name, ev.target.value)}
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
const selectCities = cities.map(item => {
  let newName = item.full_name.split("-");
  return {
    value: item.full_name,
    label: newName[0] + " - Depto. " + newName[1],
  };
});

const TypeCities = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700 dark:text-gray-400">{field.label}</span>
      <div>
        <Select
          options={selectCities}
          placeholder="Localidades"
          className="block text-sm my-2 no-focus"
          filterOption={(option, inputValue) => {
            const q = inputValue.toLowerCase();
            const base = option.value.toLowerCase().split("-")[0];
            return base.indexOf(q) > -1;
          }}
          onChange={value => handleChange("city", value)}
          value={values[field.name] ? values[field.name] : ""}
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
  const handleAddition = tag => {
    const base = values[field.name] ? values[field.name] : [];
    const newValue = [...base, tag];
    handleChange(field.name, newValue);
  };
  const handleDelete = i => {
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
        autofocus={false}
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
  const onSelectFile = e => {
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
    </label>
  );
};

export const types = {
  selectCategory: TypeCategory,
  text: TypeText,
  number: TypeNumber,
  textarea: TypeTextarea,
  select: TypeSelect,
  customCities: TypeCities,
  tag: TypeTags,
  image: TypeImage,
  color: TypeColor,
};

export const Form = ({ fields, onSubmit, initialValues }) => {
  const [values, setValues] = useState(initialValues ?? {});
  const [submitting, setSubmitting] = useState(false);
  const handleChange = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  return (
    <div>
      {fields.map(field => {
        const Element = types[field.type];
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
        onClick={ev => {
          ev.preventDefault();
          setSubmitting(true);
          onSubmit(values);
        }}
      >
        {submitting ? (
          <svg
            className="animate-spin mx-auto h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          `Enviar`
        )}
      </button>
    </div>
  );
};
