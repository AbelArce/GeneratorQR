const DEFAULT_IMAGE = "https://images.vexels.com/media/users/3/139140/isolated/lists/faaa3b02a85ca452598dd699c33b9b5c-diseno-de-huella-digital-realista.png";

let lastLogoData = null;

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
    margin: 10,
    imageSize: 0.3 // Proporción del logo dentro del QR
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
  const errorLevel = document.getElementById("qr-error").value;
  const imageSize = parseFloat(document.getElementById("qr-logo-size").value) || 0.3;

  const updateOptions = {
    width: size,
    height: size,
    data: texto || "https://ejemplo.com",
    dotsOptions: { color, type: dotType },
    cornersSquareOptions: { type: cornerType },
    backgroundOptions: { color: bgColor },
    qrOptions: {
      errorCorrectionLevel: errorLevel
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10,
      imageSize
    }
  };

  const logoFile = document.getElementById("qr-logo").files[0];

  if (logoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result !== lastLogoData) {
        updateOptions.image = reader.result;
        lastLogoData = reader.result;
      }
      qrCode.update(updateOptions);
    };
    reader.readAsDataURL(logoFile);
  } else {
    if (lastLogoData !== DEFAULT_IMAGE) {
      updateOptions.image = DEFAULT_IMAGE;
      lastLogoData = DEFAULT_IMAGE;
    } else {
      // No volver a setear imagen
      delete updateOptions.image;
    }
    qrCode.update(updateOptions);
  }
}

function descargarQR() {
  qrCode.download({ name: "codigo-qr", extension: "png" });
}

document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", actualizarQR)
);

document.getElementById("download-btn").addEventListener("click", descargarQR);

window.onload = actualizarQR;
