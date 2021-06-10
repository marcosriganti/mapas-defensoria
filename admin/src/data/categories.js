export const table = {
  collection: "categories",
  label: "Categorías",
  fields: [
    {
      name: "id",
      label: "id",
      hidden: true,
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      onTable: true,
    },
  ],
};
