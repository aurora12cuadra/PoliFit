"use client";

const Terminos = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Términos y Condiciones</h1>
      <p className="text-gray-700 mb-2 text-right">
        <strong>Fecha de última actualización:</strong> 16 de Diciembre del 2024
      </p>

      <p className="text-gray-700 mb-4">
        Bienvenidos al Prototipo de Aplicación Web para la Administración y Gestión de Servicios de Nutriología
        ("Polifit", "nosotros", "nos" o "nuestro"), diseñado para ser utilizado por nutriólogos/as con el fin de
        optimizar el registro, consulta y seguimiento de datos nutricionales. Por favor, lea detenidamente estos
        Términos y Condiciones ("Términos") antes de usar la plataforma.
      </p>
      <p className="text-gray-700 mb-4">
        Al utilizar Polifit, usted ("Usuario/a") acepta estos Términos en su totalidad. Si no está de acuerdo,
        absténgase de utilizar la aplicación.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Uso de la Aplicación</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          Polifit está desarrollada exclusivamente para nutriólogos/as con el propósito de gestionar y registrar
          información médica y de estilo de vida de sus pacientes.
        </li>
        <li>
          El/la usuario/a se compromete a utilizar la aplicación de manera ética y conforme a las leyes de privacidad
          y protección de datos vigentes.
        </li>
        <li>
          Queda estrictamente prohibido utilizar Polifit con fines no autorizados, comerciales o que violen normativas
          legales aplicables.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">1.1 Cuenta</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          Para utilizar la plataforma, el/la nutriólogo/a deberá registrar una cuenta proporcionando información como:
          <ul className="list-circle pl-6">
            <li>Nombre completo</li>
            <li>Fecha de nacimiento</li>
            <li>Número de empleado</li>
            <li>Correo electrónico</li>
            <li>Especialidad y escuela</li>
          </ul>
        </li>
        <li>
          Usted es responsable de mantener la confidencialidad de su correo electrónico y contraseña, así como de
          cualquier actividad realizada desde su cuenta.
        </li>
        <li>
          La información proporcionada debe ser verídica, actualizada y completa en todo momento. En caso de detectar
          un uso no autorizado, debe notificarnos inmediatamente a{" "}
          <strong>ipnpolifit@gmail.com</strong>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">2. Privacidad y Protección de Datos</h2>
      <p className="text-gray-700 mb-4">
        El uso de Polifit está sujeto a nuestro Aviso de Privacidad, en el cual se describen las prácticas relacionadas
        con la recopilación, uso, almacenamiento y protección de los datos personales del/la nutriólogo/a y sus
        pacientes. Al utilizar esta plataforma, usted acepta dichas prácticas.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Uso Responsable de la Información</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          Los/as nutriólogos/as son responsables de garantizar que los datos ingresados de sus pacientes cuenten con el
          consentimiento informado correspondiente.
        </li>
        <li>El uso de información de terceros sin autorización está estrictamente prohibido.</li>
        <li>
          Usted acepta no compartir, duplicar o divulgar los datos registrados en Polifit con fines no relacionados con
          la atención nutricional.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">4. Propiedad Intelectual</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          Polifit, incluyendo su diseño, código fuente, interfaz gráfica y contenido, son propiedad exclusiva de{" "}
          <strong>la Escuela Superior de Cómputo, del Instituto Politécnico Nacional</strong> o sus licenciatarios.
        </li>
        <li>
          Usted no tiene derecho a copiar, modificar, distribuir o utilizar cualquier parte de la aplicación sin
          nuestro consentimiento previo por escrito.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">5. Limitación de Responsabilidad</h2>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Polifit se proporciona "tal cual" y no garantiza su disponibilidad ininterrumpida.</li>
        <li>
          Los desarrolladores no serán responsables por pérdidas de datos, daños directos o indirectos derivados del
          uso de la aplicación.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">6. Actualizaciones y Modificaciones</h2>
      <p className="text-gray-700 mb-4">
        Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Las modificaciones
        serán publicadas en la plataforma y entrarán en vigor a partir de su publicación.
      </p>

      <h2 className="text-2xl font-semibold mb-2">7. Terminación de Cuenta</h2>
      <p className="text-gray-700 mb-4">
        Nos reservamos el derecho de suspender o cancelar su acceso a la plataforma si detectamos un uso indebido o una
        violación de estos Términos.
      </p>

      <h2 className="text-2xl font-semibold mb-2">8. Contacto</h2>
      <p className="text-gray-700 mb-4">
        Si tiene dudas sobre estos Términos, puede contactarnos a través del correo electrónico{" "}
        <strong>ipnpolifit@gmail.com</strong>.
      </p>
    </div>
  );
};

export default Terminos;

