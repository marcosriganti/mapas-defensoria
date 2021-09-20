const Footer = () => (
  <footer
    className=" bg-white py-16 border-t-4"
    style={{ borderColor: "#afc75d" }}
  >
    <div className="container space-y-5 px-6">
      <div className="grid text-gray-800 text-sm md:grid-cols-2">
        <div>
          <h3 className="font-bold text-xl">ROSARIO</h3>
          <p>Tucumán 1681 - CP 2000 - Rosario</p>
          <p>Teléfonos: Lunes a viernes de 8.00 a 18.00 (0341) 156-914345</p>
          <p>info@defensorianna.gob.ar</p>
        </div>
        <div>
          <h3 className="font-bold text-xl">SANTA FE</h3>
          <p>Eva Perón 2726 - CP 3000 - Santa Fe</p>
          <p>Teléfonos: Lunes a viernes de 8.00 a 18.00 (0342) 154-494569</p>
          <p>info@defensorianna.gob.ar</p>
        </div>
      </div>
      <div className="grid text-gray-800 text-sm md:grid-cols-3 border-t  pt-5">
        <div>
          <h3 className="font-bold text-xl">RAFAELA</h3>
          <p>Brown 73</p>
          <p>Teléfonos: (03492) 45-3101</p>
          <p>defensorrafaela@gmail.com</p>
        </div>
        <div>
          <h3 className="font-bold text-xl">RECONQUISTA</h3>
          <p>Patricio Diez 985</p>
          <p>Teléfonos: (03482) 43-8849</p>
          <p>reconquista@defensorsantafe.gov.ar</p>
        </div>
        <div>
          <h3 className="font-bold text-xl">VENADO TUERTO</h3>
          <p>9 de julio 1040</p>
          <p>Teléfonos: (03462) 40-8868</p>
          <p>venadotuerto@defensorsantafe.gov.ar</p>
        </div>
      </div>
    </div>
    <div
      className=" bg-white mt-10 pt-10 border-t-4"
      style={{ borderColor: "#afc75d" }}
    >
      <div className="container px-6">
        <div className="sponsors flex flex-row justify-center">
          <a
            href="https://www.defensoriasantafe.gob.ar/ "
            target="_blank"
            className="flex-1"
            rel="noreferrer"
            title="Defensoría del pueblo"
          >
            <img
              src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-defensoria-del-pueblo.png"
              className="img-responsive"
            />
          </a>
          <a
            href="https://www.unicef.org/argentina/ "
            target="_blank"
            className="flex-1"
            rel="noreferrer"
            title="Unicef"
          >
            <img
              src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-unicef.png"
              className="img-responsive"
            />
          </a>
          <a
            href="http://www.defensorianna.gob.ar/observatorio/que-es-y-como-funciona-2740"
            target="_blank"
            className="flex-1"
            rel="noreferrer"
            title="Observatorio"
          >
            <img
              src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-observatorio.png"
              className="img-responsive"
            />
          </a>
          <a
            href="http://www.portalfio.org/red-ninez-adolescencia/"
            target="_blank"
            className="flex-1"
            rel="noreferrer"
            title="Red de Niñez"
          >
            <img
              src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-red-ninez-adolescencia.png"
              className="img-responsive"
            />
          </a>
          <a
            href="http://www.adpra.org.ar/"
            target="_blank"
            title="ADPRA"
            rel="noreferrer"
          >
            <img
              src="https://www.defensorianna.gob.ar/modules/skin/full/img/logo-adpra.png"
              className="img-responsive"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
