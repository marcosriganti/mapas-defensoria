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
      type: "text",
      onTable: true,
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      min: 6,
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
