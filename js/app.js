// js/app.js

// Inicializa el QR con opciones básicas
const qr = new QRCodeStyling({
  width: 300,
  height: 300,
  image: "", // sin logo al inicio
  dotsOptions: { color: "#000", type: "rounded" },
  backgroundOptions: { color: "#fff" },
  imageOptions: { crossOrigin: "anonymous", margin: 10 },
});

const preview = document.getElementById("qr-preview");
qr.append(preview);

// Agarra los inputs, ojo con los IDs, que deben coincidir con tu HTML
const qrData = document.getElementById("qr-text");        // En tu HTML es id="qr-text", no qrData
const dotColor = document.getElementById("qr-color");      // id="qr-color"
const bgColor = document.getElementById("qr-bg-color");    // id="qr-bg-color"
const imageUrlInput = document.getElementById("qr-logo");  // input file, no es URL, lo veremos

const themeSelect = document.getElementById("theme"); // Si tienes ese select, si no, quita esta parte

// Función para actualizar el QR
function updateQR() {
  // Como tu input de logo es file, no puedes usar .value directo
  // Así que vamos a ignorar la imagen de momento o la manejamos con FileReader (más abajo)

  qr.update({
    data: qrData ? qrData.value : "",
    dotsOptions: { color: dotColor ? dotColor.value : "#000" },
    backgroundOptions: { color: bgColor ? bgColor.value : "#fff" },
    // image: ""  // Si quieres poner logo, tienes que leer el archivo con FileReader
  });
}

// Para leer la imagen y actualizar el logo en el QR
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    qr.update({ image: "" });
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    qr.update({ image: e.target.result });
  };
  reader.readAsDataURL(file);
}

// Añade listeners
if (qrData) qrData.addEventListener("input", updateQR);
if (dotColor) dotColor.addEventListener("input", updateQR);
if (bgColor) bgColor.addEventListener("input", updateQR);
if (imageUrlInput) imageUrlInput.addEventListener("change", handleLogoUpload);

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    document.body.className = themeSelect.value;
  });
}

// Aquí va tu función animarBotonFlotante, llámala así:
// animarBotonFlotante();

updateQR();  // Generar QR inicial
