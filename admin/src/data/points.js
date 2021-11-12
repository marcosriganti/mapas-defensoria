export const table = {
  collection: "points",
  label: "Instituciones",
  filters: [
    {
      name: "category",
      type: "selectCategory",
      label: "Categoría",
    },
    {
      name: "city",
      type: "customCities",
      label: "Ciudad",
    },
    {
      name: "name",
      type: "text",
      label: "Nombre Institucion (Exacto)",
    },
  ],
  fields: [
    {
      name: "id",
      label: "id",
      hidden: true,
      type: "text",
    },

    {
      name: "name",
      label: "Nombre de la Institucion",
      type: "text",
      required: true,
      onTable: true,
    },
    {
      name: "category",
      label: "Categoría",
      type: "selectCategory",
      onTable: true,
    },
    {
      name: "subcategory",
      label: "Subcategoría",
      type: "text",
    },
    {
      name: "image",
      label: "Foto/Imagen",
      type: "image",
    },
    {
      name: "description",
      label: "Descripcion",
      type: "textarea",
      required: true,
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
      name: "web",
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
      name: "youtube",
      label: "Youtube",
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
      required: true,
    },
    {
      name: "tags",
      label: "Etiquetas",
      type: "tag",
    },
    {
      name: "latitud",
      label: "Latitud",
      type: "text",
    },
    {
      name: "longitude",
      label: "Longitud",
      type: "text",
    },
  ],
};
