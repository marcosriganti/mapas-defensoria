export const table = {
  collection: "users",
  label: "Usuarios",
  fields: [
    {
      name: "uid",
      label: "id",
      hidden: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      onTable: true,
    },
    {
      name: "metadata.lastSignInTime",
      label: "Ultimo ingreso",
      type: "text",
      hidden: true,
      onTable: true,
    },
  ],
};
