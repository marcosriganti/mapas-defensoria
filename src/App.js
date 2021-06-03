import logo from "./assets/images/logo.svg";

function App() {
  return (
    <div>
      <header
        style={{ borderColor: "#afc75d" }}
        className="border-b-4 py-4 bg-white"
      >
        <div className="container mx-auto">
          <div className="flex flex-row items-center justify-between">
            <div>
              <img
                src={logo}
                alt="Defensor&iacute;a de ni&ntilde;as, ni&ntilde;os y adolescentes"
              />
            </div>
            <div>
              <h1 className="text-2xl">Georeferencia Servicios Locales</h1>
            </div>
          </div>
        </div>
      </header>
      <main className="py-20">
        <div className="container mx-auto"> 
        
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
