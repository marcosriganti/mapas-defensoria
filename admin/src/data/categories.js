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
    {
      name: "description",
      label: "Descripcion",
      type: "textarea",
      onTable: true,
    },
    {
      name: "children",
      label: "Subcategorias",
      type: "tag",
      onTable: true,
    },
  ],
};
