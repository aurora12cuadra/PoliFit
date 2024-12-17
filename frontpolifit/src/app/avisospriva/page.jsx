"use client";

const AvisoPrivacidad = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Aviso de Privacidad</h1>
      <p className="text-gray-700 mb-2 text-right">
        <strong>Fecha de actualización:</strong> 15 de diciembre de 2024
      </p>

      <h2 className="text-2xl font-semibold mb-2">Responsable del Tratamiento de Datos Personales</h2>
      <p className="text-gray-700 mb-4">
        Somos estudiantes de la carrera de Ingeniería en Sistemas Computacionales, quienes hemos desarrollado el 
        "Prototipo de aplicación web para la administración y gestión de servicios de nutriología", como parte de 
        nuestro proyecto de titulación. El proyecto está dirigido a la comunidad politécnica y está diseñado 
        exclusivamente para ser utilizado por nutriólogos.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Finalidad del Tratamiento de Datos</h2>
      <p className="text-gray-700 mb-2">
        La aplicación tiene como finalidad la gestión de datos relacionados con la consulta nutricional, incluyendo el 
        registro y tratamiento de información personal y médica de los pacientes y nutriólogos. Los datos proporcionados 
        por los nutriólogos a través de la aplicación serán utilizados para las siguientes finalidades:
      </p>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>
          <strong>Datos del paciente:</strong>
          <ul className="list-circle pl-6">
            <li>
              Recopilación de datos generales como nombre completo, fecha de nacimiento, número de teléfono, escuela 
              y carrera, sexo, correo electrónico, estado civil, ocupación, domicilio, semestre, número de boleta o 
              empleado, turno, tipo de sangre, antecedentes heredofamiliares y patológicos.
            </li>
            <li>
              Registro de datos relacionados con el estilo de vida (actividad laboral, actividad física y hábitos 
              dietéticos), trastornos gástricos, datos gineco-obstétricos, recordatorio de comidas pasadas, mediciones 
              físicas (pliegues, perímetros y diámetros corporales, bioimpedancia e indicadores bioquímicos), cálculo 
              de kilocalorías y plan de alimentación.
            </li>
          </ul>
        </li>
        <li>
          <strong>Datos del nutriólogo:</strong>
          <ul className="list-circle pl-6">
            <li>
              Recopilación de datos personales como nombre completo, fecha de nacimiento, escuela donde labora, número 
              de empleado, correo electrónico y especialidad.
            </li>
          </ul>
        </li>
      </ul>

      <p className="text-gray-700 mb-4">
        Además de los datos personales descritos anteriormente, podríamos recopilar datos no identificables relacionados 
        con el uso de la aplicación, como estadísticas de interacción, con el objetivo de mejorar nuestros servicios. 
        Estos datos no contendrán información que pueda identificar al usuario.
      </p>
      <p className="text-gray-700 mb-4">
        Los nutriólogos que se registren en la plataforma tendrán acceso a su perfil y podrán actualizar o corregir 
        sus datos personales en cualquier momento a través de la configuración de la cuenta.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Protección y Confidencialidad</h2>
      <p className="text-gray-700 mb-4">
        El tratamiento de los datos personales será realizado de acuerdo con los principios de licitud, consentimiento, 
        información, calidad, finalidad, lealtad y responsabilidad. Los datos proporcionados por los usuarios al igual 
        que la información médica y personal de los pacientes serán tratados con la máxima confidencialidad y seguridad, 
        y serán utilizados únicamente para las finalidades mencionadas.
      </p>
      <p className="text-gray-700 mb-4">
        Implementamos medidas de seguridad técnicas y organizacionales para proteger los datos personales de accesos no 
        autorizados, pérdida, alteración o divulgación. No obstante, reconocemos que ninguna medida de seguridad es infalible.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Consentimiento</h2>
      <p className="text-gray-700 mb-4">
        Al utilizar la aplicación, los nutriólogos expresan su consentimiento para el tratamiento de sus datos personales 
        y los de sus pacientes, conforme a lo establecido en este Aviso de Privacidad. El consentimiento será solicitado 
        al momento de registrar los datos en la plataforma.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Derechos ARCO</h2>
      <p className="text-gray-700 mb-4">
        Los usuarios de la aplicación tienen derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus 
        datos personales, así como a limitar su uso o divulgación. Para hacer uso de estos derechos, los usuarios pueden 
        ponerse en contacto con nosotros a través del correo electrónico{" "}
        <strong>ipnpolifit@gmail.com</strong>. La solicitud debe incluir su nombre, información de contacto y una 
        descripción clara del derecho que desea ejercer.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Modificaciones al Aviso de Privacidad</h2>
      <p className="text-gray-700 mb-4">
        Nos reservamos el derecho de realizar modificaciones a este Aviso de Privacidad en cualquier momento, las cuales 
        serán publicadas en la plataforma para su consulta. Los usuarios serán notificados de cualquier cambio importante 
        que afecte el tratamiento de sus datos personales.
      </p>

      <p className="text-gray-700 mt-6">
        Si tiene dudas sobre este Aviso de Privacidad, contáctenos al correo:{" "}
        <strong>ipnpolifit@gmail.com</strong>.
      </p>
    </div>
  );
};

export default AvisoPrivacidad;

