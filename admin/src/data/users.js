export const table = {
  collection: "users",
  label: "Usuarios",
  fields: [
    {
      name: "id",
      label: "id",
      hidden: true,
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
      type: "text",
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
      type: "text",
    },
    {
      name: "region",
      label: "Departamento",
      type: "text",
    },
    {
      name: "state",
      label: "Provincia",
      type: "text",
    },
    {
      name: "country",
      label: "Pais",
      type: "text",
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
