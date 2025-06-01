const DEFAULT_IMAGE = "https://images.vexels.com/media/users/3/139140/isolated/lists/faaa3b02a85ca452598dd699c33b9b5c-diseno-de-huella-digital-realista.png";

let lastImageData = DEFAULT_IMAGE;

let qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  data: "https://ejemplo.com",
  image: DEFAULT_IMAGE,
  qrOptions: { errorCorrectionLevel: "M" },
  imageOptions: {
    crossOrigin: "anonymous",
    imageSize: 0.3,
    margin: 10
  },
  dotsOptions: {
    color: "#000000",
    type: "dots"
  },
  backgroundOptions: {
    color: "#ffffff"
  },
  cornersSquareOptions: {
    type: "extra-rounded"
  }
});

qrCode.append(document.getElementById("qr-preview"));

function actualizarQR() {
  const texto = document.getElementById("qr-text").value.trim();
  const color = document.getElementById("qr-color").value;
  const bgColor = document.getElementById("qr-bg-color").value;
  const dotType = document.getElementById("dot-type").value;
  const cornerType = document.getElementById("corner-type").value;
  const errorLevel = document.getElementById("qr-error").value;
  const size = parseInt(document.getElementById("qr-size").value) || 300;
  const imageSize = parseFloat(document.getElementById("qr-logo-size").value) || 0.3;

  const file = document.getElementById("qr-logo").files[0];
  const updateOptions = {
    width: size,
    height: size,
    data: texto || "https://ejemplo.com",
    dotsOptions: { color, type: dotType },
    backgroundOptions: { color: bgColor },
    cornersSquareOptions: { type: cornerType },
    qrOptions: { errorCorrectionLevel: errorLevel },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10,
      imageSize
    }
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result !== lastImageData) {
        updateOptions.image = reader.result;
        lastImageData = reader.result;
      } else {
        delete updateOptions.image;
      }
      qrCode.update(updateOptions);
    };
    reader.readAsDataURL(file);
  } else {
    if (lastImageData !== DEFAULT_IMAGE) {
      updateOptions.image = DEFAULT_IMAGE;
      lastImageData = DEFAULT_IMAGE;
    } else {
      delete updateOptions.image;
    }
    qrCode.update(updateOptions);
  }
}

document.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", actualizarQR)
);

document.getElementById("download-btn").addEventListener("click", () => {
  qrCode.download({ name: "codigo-qr", extension: "png" });
});

window.onload = actualizarQR;
