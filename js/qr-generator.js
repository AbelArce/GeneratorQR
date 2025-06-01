// js/qr-generator.js

console.log("⚡️ Inicializando QR Generator...");

const DEFAULT_IMAGE =
  "https://images.vexels.com/media/users/3/139140/isolated/lists/faaa3b02a85ca452598dd699c33b9b5c-diseno-de-huella-digital-realista.png";

let qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  type: "png",
  data: "https://ejemplo.com",
  image: DEFAULT_IMAGE,
  dotsOptions: {
    color: "#000000",
    type: "dots",
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  cornersDotOptions: {
    type: "square",
  },
  backgroundOptions: {
    color: "#ffffff",
    // Aquí quitamos el image: null
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
});

qrCode.append(document.getElementById("qr-preview"));

function leerArchivoComoDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error al leer archivo"));
    reader.readAsDataURL(file);
  });
}

async function actualizarQR() {
  console.log("🔄 Actualizando QR...");

  const texto = document.getElementById("qr-text").value;
  const color = document.getElementById("qr-color").value;
  const bgColor = document.getElementById("qr-bg-color").value;
  const dotType = document.getElementById("dot-type").value;
  const cornerType = document.getElementById("corner-type").value;
  const eyeBallType = document.getElementById("eye-ball-type").value;
  const size = parseInt(document.getElementById("qr-size").value) || 300;
  const margin = parseInt(document.getElementById("qr-margin").value) || 10;
  const animate = document.getElementById("qr-animate").value;

  console.log(`Texto: ${texto}`);
  console.log(`Colores -> Dots: ${color}, Fondo: ${bgColor}`);
  console.log(`Formas -> Puntos: ${dotType}, Esquinas: ${cornerType}, Ojos: ${eyeBallType}`);
  console.log(`Tamaño: ${size}px, Margen: ${margin}px, Animación: ${animate}`);

  const logoFile = document.getElementById("qr-logo").files[0];

  let logoData = DEFAULT_IMAGE;

  try {
    if (logoFile) {
      console.log("📁 Logo personalizado detectado, cargando...");
      logoData = await leerArchivoComoDataURL(logoFile);
      console.log("✅ Logo cargado correctamente.");
    }
  } catch (err) {
    console.error("❌ Error al leer archivo de logo:", err);
  }

  const updateOptions = {
    width: size,
    height: size,
    data: texto,
    image: logoData,
    dotsOptions: {
      color,
      type: dotType,
    },
    cornersSquareOptions: {
      type: cornerType,
    },
    cornersDotOptions: {
      type: eyeBallType,
    },
    backgroundOptions: {
      color: bgColor,
      // sin imagen de fondo
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin,
    },
  };

  qrCode.update(updateOptions);
  aplicarAnimacion(animate);
  console.log("✔️ QR actualizado.");
}

function aplicarAnimacion(animacion) {
  const preview = document.getElementById("qr-preview");
  preview.classList.remove("spin", "pulse", "bounce");

  if (animacion !== "none") {
    preview.classList.add(animacion);
    console.log(`🎬 Animación aplicada: ${animacion}`);
  } else {
    console.log("🎬 Sin animación aplicada.");
  }
}

function descargarQR() {
  console.log("⬇️ Descargando QR...");
  qrCode
    .getRawData("png")
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "qr-code.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      console.log("✅ QR descargado correctamente.");
    })
    .catch((err) => {
      console.error("❌ Error al descargar el QR:", err);
    });
}

// Eventos para actualización instantánea
document.querySelectorAll("input, select").forEach((el) => {
  el.addEventListener("input", actualizarQR);
});

// Asumo que tienes un botón para descargar con id="download-btn"
document.getElementById("download-btn")?.addEventListener("click", descargarQR);

actualizarQR();
