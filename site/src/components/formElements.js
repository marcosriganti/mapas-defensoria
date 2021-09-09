import Autocomplete from "react-autocomplete";
import cities from "../assets/cities.json";

export const TypeCities = ({ field, handleChange, values }) => {
  return (
    <label className="block text-sm my-2">
      <span className="text-gray-700 font-medium">{field.label}</span>
      <div className="py-2 px-3 rounded-lg border-2 bg-white border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent">
        <Autocomplete
          inputProps={{
            className: "w-full border-0 outline-none",
            autoComplete: false,
          }}
          getItemValue={item => item.full_name}
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
          onChange={ev => handleChange(field.name, ev.target.value)}
          onSelect={val => handleChange(field.name, val)}
        />
      </div>
    </label>
  );
};

export const TypeCategories = ({ field, handleChange, values, source }) => {
  return (
    <label className="block text-sm my-2">
      <span className="text-gray-700 font-medium">{field.label}</span>
      <div
        className={`py-2 px-3 rounded-lg border-2 ${
          source.length === 0 ? `bg-gray-200` : `bg-white`
        } border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
      >
        <Autocomplete
          inputProps={{
            className: "w-full border-0 outline-none",
            disabled: source.length === 0,
            autoComplete: false,
          }}
          getItemValue={item => item.name || item.text}
          wrapperStyle={{ width: "100%" }}
          items={source}
          shouldItemRender={(item, value) => {
            if (item.text) {
              return item.text.toLowerCase().indexOf(value.toLowerCase()) > -1;
            } else {
              return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
            }
          }}
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? "lightgray" : "white" }}
              className="w-full p-2"
            >
              {item.name || item.text}
            </div>
          )}
          value={values[field.name] ? values[field.name] : ""}
          onChange={ev => handleChange(field.name, ev.target.value)}
          onSelect={val => handleChange(field.name, val)}
        />
      </div>
    </label>
  );
};
