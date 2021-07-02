export const table = {
  collection: "points",
  label: "Instituciones",
  fields: [
    {
      name: "id",
      label: "id",
      hidden: true,
      type: "text",
    },

    {
      name: "category",
      label: "Categoría",
      type: "text",
    },
    {
      name: "subcategory",
      label: "Subcategoría",
      type: "text",
    },
    {
      name: "name",
      label: "Nombre de la Institucion",
      type: "text",
      onTable: true,
    },
    {
      name: "description",
      label: "Descripcion",
      type: "textarea",
    },
    {
      name: "extended_description",
      label: "Información detallada",
      type: "textarea",
    },

    {
      name: "phone",
      label: "Telefono",
      type: "number",
      onTable: true,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      onTable: true,
    },
    {
      name: "website",
      label: "Web",
      type: "text",
    },
    {
      name: "twitter",
      label: "Twitter",
      type: "text",
    },
    {
      name: "facebook",
      label: "Facebook",
      type: "text",
    },
    {
      name: "instagram",
      label: "Instagram",
      type: "text",
    },
    {
      name: "address",
      label: "Direccion",
      type: "text",
    },
    {
      name: "city",
      label: "Localidad",
      type: "customCities",
      onTable: true,
    },
    {
      name: "tags",
      label: "Etiquetas",
      type: "tag",
    },
    {
      name: "latitud",
      label: "Latitud",
      type: "number",
    },
    {
      name: "longitude",
      label: "Longitud",
      type: "number",
    },
  ],
};
