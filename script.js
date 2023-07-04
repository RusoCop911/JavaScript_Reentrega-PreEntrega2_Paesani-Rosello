let divisa = [
    { id: 1, nombre: "dólares", continente: "América", pais: "EEUU", valorBlue: 500 },
    { id: 2, nombre: "reales", continente: "América", pais: "Brasil", valorBlue: 91 },
    { id: 3, nombre: "bolívares venezolanos", continente: "América", pais: "Venezuela", valorBlue: 2 },
    { id: 4, nombre: "euros", continente: "Europa", pais: "Unión Europea", valorBlue: 540 },
    { id: 5, nombre: "libras esterlinas", continente: "Europa", pais: "Reino Unido", valorBlue: 600 },
    { id: 6, nombre: "francos suizos", continente: "Europa", pais: "Suiza", valorBlue: 530 },
    { id: 7, nombre: "rublos rusos", continente: "Europa", pais: "Rusia", valorBlue: 7 },
    { id: 8, nombre: "yenes japoneses", continente: "Asia", pais: "Japón", valorBlue: 4 },
    { id: 9, nombre: "yuanes chinos", continente: "Asia", pais: "China", valorBlue: 73 },
    { id: 10, nombre: "dólares australianos", continente: "Oceanía", pais: "Australia", valorBlue: 360 },

];

let inicioDeCalculadora = inicioCalculadora();

function inicioCalculadora() {
  let nombreApellido = prompt("Ingrese su nombre y apellido:");

  if (nombreApellido === null) {
    return;
  }

  while (!nombreApellido) {
    alert("Debe ingresar su nombre y apellido.");
    nombreApellido = prompt("Ingrese su nombre y apellido:");
    if (nombreApellido === null) {
      return;
    }
  }

  let dni = prompt("Ingrese su número de DNI:");

  if (dni === null) {
    return;
  }

  while (!dni || isNaN(Number(dni))) {
    alert("Debe ingresar un número de DNI válido.");
    dni = prompt("Ingrese su número de DNI:");
    if (dni === null) {
      return;
    }
  }

  alert(`Bienvenido ${nombreApellido} DNI: ${dni} a la calculadora de divisas\n\nAFIP le agradece sus datos.`);
  seleccionContinente();
}

function seleccionContinente() {
    let respuestaContinente = prompt('¿De qué continente desea buscar divisas?\n(Ingrese solo números)\n\n1) América\n2) Europa\n3) Asia\n4) Oceanía\n\nHaga clic en "Cancelar" para salir');

    if (respuestaContinente === null) {
        return
    }

    respuestaContinente = Number(respuestaContinente);

    if (isNaN(respuestaContinente)) {
        alert("Ingrese solo números");
        seleccionContinente();
    } else if (respuestaContinente < 1 || respuestaContinente > 4) {
        alert("Ingrese solo números correspondientes a las opciones mostradas");
        seleccionContinente();
    }

    let continenteElegido = divisa.filter(divisa => divisa.continente.toLowerCase() === obtenerNombreContinente(respuestaContinente).toLowerCase());

    if (continenteElegido.length > 0) {
        seleccionDivisas(continenteElegido);
    } else {
        alert("No se encontraron divisas para el continente seleccionado");
        seleccionContinente();
    }
}

function obtenerNombreContinente(numeroContinente) {
    switch (numeroContinente) {
        case 1:
            return "América";
        case 2:
            return "Europa";
        case 3:
            return "Asia";
        case 4:
            return "Oceanía";
        default:
            return "";
    }
}

function seleccionDivisas(divisas) {
    let opcionesDivisas = "";

    divisas.forEach((divisa) => { opcionesDivisas += `${divisa.id}) ${divisa.nombre} - ${divisa.pais}\n` });

    let respuestaDivisa = prompt(`Seleccione la divisa deseada:\n(Ingrese sólo números)\n\n${opcionesDivisas}\n\nHaga clic en "Cancelar" para volver al menú anterior`);

    if (respuestaDivisa === null) {
        seleccionContinente();
        return;
    }

    respuestaDivisa = Number(respuestaDivisa);

    if (isNaN(respuestaDivisa)) {
        alert("Ingrese solo números");
        seleccionDivisas(divisas);
        return;
    } else if (respuestaDivisa === 0) {
        seleccionContinente();
        return;
    }

    let divisaElegida = divisas.find((divisa) => divisa.id === respuestaDivisa);

    if (divisaElegida) {
        let conversion = prompt(`${divisaElegida.nombre.toUpperCase()} \n\nIngrese 1 para convertir de ${divisaElegida.nombre} a pesos argentinos.\nIngrese 2 para convertir de pesos argentinos a ${divisaElegida.nombre}.\n\nHaga clic en "Cancelar" para volver al menú anterior`);

        if (conversion === null) {
            seleccionDivisas(divisas);
            return;
        }

        conversion = Number(conversion);

        if (conversion === 1) {
            calcularValorEnPesos(divisaElegida);
        } else if (conversion === 2) {
            convertirAPesosArgentinos(divisaElegida);
        } else if (conversion === 0) {
            seleccionContinente();
        } else {
            alert("Ingrese solo los números correspondientes a las opciones mostradas");
            seleccionDivisas(divisas);
        }
    } else {
        alert("Ingrese solo números correspondientes a las opciones mostradas");
        seleccionDivisas(divisas);
    }
}


function convertirAPesosArgentinos(divisa) {
    let cantidadDivisa = prompt(
        `Ingrese la cantidad de pesos argentinos que desea convertir a ${divisa.nombre}:\n\nHaga clic en "Cancelar" para volver al menú anterior`
    );

    if (cantidadDivisa === null) {
        seleccionDivisas(divisa.continenteElegido);
        return;
    }

    cantidadDivisa = Number(cantidadDivisa);

    if (isNaN(cantidadDivisa)) {
        alert("Ingrese solo números");
        convertirAPesosArgentinos(divisa);
        return;
    }

    if (cantidadDivisa === 0) {
        seleccionDivisas(divisa.continenteElegido);
        return;
    }

    if (cantidadDivisa < 0) {
        alert("Ingrese una cantidad válida");
        convertirAPesosArgentinos(divisa);
        return;
    }

    let valorEnPesos = cantidadDivisa / divisa.valorBlue;
    alert(`El valor de ${cantidadDivisa} pesos argentinos es de ${valorEnPesos} ${divisa.nombre}.`);

    reiniciarCalculadora();
}

function calcularValorEnPesos(divisa) {
    let cantidadDivisa = Number(
        prompt(`Ingrese la cantidad de ${divisa.nombre} que desea convertir a pesos argentinos:\n\nHaga clic en "Cancelar" para volver al menú anterior`)
    );

    if (isNaN(cantidadDivisa)) {
        alert("Ingrese solo números");
        calcularValorEnPesos(divisa);
        return;
    }

    if (cantidadDivisa === 0) {
        seleccionContinente();
        return;
    }

    if (cantidadDivisa < 0) {
        alert("Ingrese una cantidad válida");
        calcularValorEnPesos(divisa);
        return;
    }

    let valorEnPesos = cantidadDivisa * divisa.valorBlue;
    alert(`El valor de ${cantidadDivisa} ${divisa.nombre} es de ${valorEnPesos} pesos argentinos.`);

    reiniciarCalculadora();
}


function reiniciarCalculadora() {
    let reiniciar = confirm("¿Desea realizar otra conversión?");
    if (reiniciar) {
        seleccionContinente();
    } else {
        alert("Gracias por utilizar la calculadora de divisas. ¡Hasta luego!");
    }
}

