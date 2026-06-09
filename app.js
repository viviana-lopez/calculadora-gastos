// ARRAYS PRINCIPALES

let personas = [];
let gastos = [];

// ELEMENTOS HTML

const nombrePersonaInput = document.getElementById("nombrePersona");

const btnAgregarPersona =
  document.getElementById("btnAgregarPersona");

const listaPersonas =
  document.getElementById("listaPersonas");

const descripcionInput =
  document.getElementById("descripcion");

const montoInput =
  document.getElementById("monto");

const pagadorSelect =
  document.getElementById("pagador");

const btnAgregarGasto =
  document.getElementById("btnAgregarGasto");

const listaGastos =
  document.getElementById("listaGastos");

const btnCalcular =
  document.getElementById("btnCalcular");

const resultado =
  document.getElementById("resultado");

// EVENTOS

btnAgregarPersona.addEventListener(
  "click",
  agregarPersona
);

btnAgregarGasto.addEventListener(
  "click",
  agregarGasto
);

btnCalcular.addEventListener(
  "click",
  calcularBalances
);

// FUNCIONES

function agregarPersona() {

  const nombre = nombrePersonaInput.value.trim();

  if (nombre === "") return;

  personas.push({
    nombre,
    pagado: 0
  });

  actualizarPersonas();

  nombrePersonaInput.value = "";
}

function actualizarPersonas() {

  listaPersonas.innerHTML = "";
  pagadorSelect.innerHTML = "";

  personas.forEach(persona => {

    // LISTA

    const li = document.createElement("li");

    li.textContent = persona.nombre;

    listaPersonas.appendChild(li);

    // SELECT

    const option = document.createElement("option");

    option.value = persona.nombre;
    option.textContent = persona.nombre;

    pagadorSelect.appendChild(option);
  });
}

function agregarGasto() {

  const descripcion =
    descripcionInput.value.trim();

  const monto =
    parseFloat(montoInput.value);

  const pagador =
    pagadorSelect.value;

  if (
    descripcion === "" ||
    !monto ||
    !pagador
  ) {
    return;
  }

  gastos.push({
    descripcion,
    monto,
    pagador
  });

  const persona = personas.find(
    p => p.nombre === pagador
  );

  persona.pagado += monto;

  mostrarGastos();

  descripcionInput.value = "";
  montoInput.value = "";
}

function mostrarGastos() {

  listaGastos.innerHTML = "";

  gastos.forEach(gasto => {

    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
      <strong>${gasto.descripcion}</strong>
      <br>
      $${gasto.monto}
      <br>
      Pagó: ${gasto.pagador}
    `;

    listaGastos.appendChild(div);
  });
}

function calcularBalances() {

  if (personas.length === 0) return;

  const total = gastos.reduce(
    (acc, gasto) => acc + gasto.monto,
    0
  );

  const porPersona =
    total / personas.length;

  resultado.innerHTML = `
    <p>
      Total gastado:
      $${total.toFixed(2)}
    </p>

    <p>
      Cada persona debería pagar:
      $${porPersona.toFixed(2)}
    </p>

    <hr>
  `;

  personas.forEach(persona => {

    const balance =
      persona.pagado - porPersona;

    const p = document.createElement("p");

    if (balance > 0) {

      p.textContent =
        `${persona.nombre} debe recibir $${balance.toFixed(2)}`;

    } else {

      p.textContent =
        `${persona.nombre} debe pagar $${Math.abs(balance).toFixed(2)}`;
    }

    resultado.appendChild(p);
  });
}