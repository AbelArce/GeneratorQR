console.log("⚡️ Inicializando QR Generator...");

const DEFAULT_IMAGE = "https://images.vexels.com/media/users/3/139140/isolated/lists/faaa3b02a85ca452598dd699c33b9b5c-diseno-de-huella-digital-realista.png";

let backgroundImageData = null;

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
  cornersDotOptions: {
    type: "square"
  },
  backgroundOptions: {
    color: "#ffffff",
    image: null
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10
  }
});

qrCode.append(document.getElementById("qr-preview"));

function actualizarQR() {
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
  const bgFile = document.getElementById("qr-background-image").files[0];

  const updateOptions = {
    width: size,
    height: size,
    data: texto,
    image: DEFAULT_IMAGE,
    dotsOptions: {
      color,
      type: dotType
    },
    cornersSquareOptions: {
      type: cornerType
    },
    cornersDotOptions: {
      type: eyeBallType
    },
    backgroundOptions: {
      color: bgColor,
      image: backgroundImageData
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: margin
    }
  };

  if (logoFile) {
    console.log("📁 Logo personalizado detectado, cargando...");
    const readerLogo = new FileReader();
    readerLogo.onload = () => {
      console.log("✅ Logo cargado correctamente.");
      updateOptions.image = readerLogo.result;
      qrCode.update(updateOptions);
      aplicarAnimacion(animate);
      console.log("✔️ QR actualizado con logo.");
    };
    readerLogo.onerror = () => {
      console.error("❌ Error al cargar el logo personalizado.");
    };
    readerLogo.readAsDataURL(logoFile);
  } else {
    updateOptions.image = DEFAULT_IMAGE;
    if (bgFile) {
      console.log("📁 Imagen de fondo detectada, cargando...");
      const readerBg = new FileReader();
      readerBg.onload = () => {
        backgroundImageData = `url(${readerBg.result})`;
        updateOptions.backgroundOptions.image = backgroundImageData;
        qrCode.update(updateOptions);
        aplicarAnimacion(animate);
        console.log("✔️ QR actualizado con imagen de fondo.");
      };
      readerBg.onerror = () => {
        console.error("❌ Error al cargar la imagen de fondo.");
      };
      readerBg.readAsDataURL(bgFile);
    } else {
      backgroundImageData = null;
      updateOptions.backgroundOptions.image = null;
      qrCode.update(updateOptions);
      aplicarAnimacion(animate);
      console.log("✔️ QR actualizado sin imagen de fondo ni logo.");
    }
  }
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
  qrCode.getRawData("png").then(blob => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log("✅ QR descargado correctamente.");
  }).catch(err => {
    console.error("❌ Error al descargar el QR:", err);
  });
}

// Eventos para actualización instantánea
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", actualizarQR);
});

actualizarQR();
