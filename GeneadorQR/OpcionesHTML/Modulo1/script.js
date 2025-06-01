const DEFAULT_IMAGE = "https://images.vexels.com/media/users/3/139140/isolated/lists/faaa3b02a85ca452598dd699c33b9b5c-diseno-de-huella-digital-realista.png";

let qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  data: "https://ejemplo.com",
  image: DEFAULT_IMAGE,
  dotsOptions: {
    color: "#000000",
    type: "dots"
  },
  cornersSquareOptions: {
    type: "extra-rounded"
  },
  backgroundOptions: {
    color: "#ffffff"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10
  }
});

qrCode.append(document.getElementById("qr-preview"));

function actualizarQR() {
  const texto = document.getElementById("qr-text").value.trim();
  const color = document.getElementById("qr-color").value;
  const bgColor = document.getElementById("qr-bg-color").value;
  const dotType = document.getElementById("dot-type").value;
  const cornerType = document.getElementById("corner-type").value;
  const size = parseInt(document.getElementById("qr-size").value) || 300;
  const logoFile = document.getElementById("qr-logo").files[0];

  const updateOptions = {
    width: size,
    height: size,
    data: texto || "https://ejemplo.com",
    image: DEFAULT_IMAGE,
    dotsOptions: { color, type: dotType },
    cornersSquareOptions: { type: cornerType },
    backgroundOptions: { color: bgColor }
  };

  if (logoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      updateOptions.image = reader.result;
      qrCode.update(updateOptions);
    };
    reader.readAsDataURL(logoFile);
  } else {
    qrCode.update(updateOptions);
  }
}

function descargarQR() {
  qrCode.download({ name: "codigo-qr", extension: "png" });
}

// Eventos
document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", actualizarQR)
);

document.getElementById("download-btn").addEventListener("click", descargarQR);

// Inicializar
window.onload = actualizarQR;
