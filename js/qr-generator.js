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
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
});

// Variable para almacenar los QR masivos generados
let massiveQRs = [];
// Variables del previsualizador
let currentPreviewIndex = 0;
let previewQRData = [];

qrCode.append(document.getElementById("qr-code-canvas"));

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

  const texto = document.getElementById("qr-text").value.trim();
  const color = document.getElementById("qr-color").value || "#000000";
  const bgColor = document.getElementById("qr-bg-color").value || "#ffffff";
  const dotType = document.getElementById("dot-type").value || "dots";
  const cornerType =
    document.getElementById("corner-type").value || "extra-rounded";
  const eyeBallType =
    document.getElementById("eye-ball-type").value || "square";
  const size = parseInt(document.getElementById("qr-size").value) || 300;
  const margin = parseInt(document.getElementById("qr-margin").value) || 10;

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

  qrCode.update({
    width: size,
    height: size,
    data: texto || "https://ejemplo.com",
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
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin,
    },
  });

  document.getElementById("download-btn").style.display = texto
    ? "inline-block"
    : "none";
  console.log("✔️ QR actualizado.");
}

// Función para actualizar QR masivos con configuración personalizada
async function actualizarQRMasivos() {
  console.log("🔄 Actualizando QR masivos...");

  if (massiveQRs.length === 0) return;

  const color = document.getElementById("bulk-qr-color").value || "#39d0db";
  const bgColor =
    document.getElementById("bulk-qr-bg-color").value || "#ffffff";
  const dotType = document.getElementById("bulk-dot-type").value || "dots";
  const eyeType = document.getElementById("bulk-eye-type").value || "square";
  const size = parseInt(document.getElementById("bulk-size").value) || 140;
  const margin = parseInt(document.getElementById("bulk-margin").value) || 1;

  const logoFile = document.getElementById("bulk-qr-logo").files[0];
  let logoData = DEFAULT_IMAGE;

  try {
    if (logoFile) {
      console.log("📁 Logo masivo personalizado detectado, cargando...");
      logoData = await leerArchivoComoDataURL(logoFile);
      console.log("✅ Logo masivo cargado correctamente.");
    }
  } catch (err) {
    console.error("❌ Error al leer archivo de logo masivo:", err);
  }

  // Actualizar cada QR masivo
  massiveQRs.forEach((qrMassive) => {
    qrMassive.update({
      width: size,
      height: size,
      image: logoData,
      dotsOptions: {
        color,
        type: dotType,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      cornersDotOptions: {
        type: eyeType,
      },
      backgroundOptions: {
        color: bgColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin,
      },
    });
  });

  console.log("✔️ QR masivos actualizados.");
}

function aplicarAnimacion(animacion) {
  const preview = document.getElementById("qr-code-canvas");
  preview.classList.remove("spin", "pulse", "bounce");

  if (animacion && animacion !== "none") {
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

// Función mejorada para cambiar de pestañas
function switchTab(activeTab, inactiveTab, activeSection, inactiveSection) {
  activeTab.classList.add("active");
  inactiveTab.classList.remove("active");
  activeSection.classList.add("active");
  inactiveSection.classList.remove("active");

  // Limpiar previsualizador al cambiar de pestaña
  limpiarPrevisualizador();

  // Mostrar botón flotante SOLO si la pestaña activa es la masiva Y hay QRs generados
  if (activeSection.id === "massive-qr-section") {
    // Solo mostrar si hay QRs masivos generados
    if (massiveQRs.length > 0) {
      showFloatingEditButton();
    } else {
      // Ocultar botón si existe pero no hay QRs
      const btn = document.getElementById("btnEditarMasivo");
      if (btn) btn.remove();
    }
  } else {
    // Ocultar botón si existe al cambiar a otra pestaña
    const btn = document.getElementById("btnEditarMasivo");
    if (btn) btn.remove();
  }
}

const tabSingle = document.getElementById("tab-single");
const tabMassive = document.getElementById("tab-massive");
const singleSection = document.getElementById("single-qr-section");
const massiveSection = document.getElementById("massive-qr-section");

tabSingle.addEventListener("click", () =>
  switchTab(tabSingle, tabMassive, singleSection, massiveSection)
);
tabMassive.addEventListener("click", () =>
  switchTab(tabMassive, tabSingle, massiveSection, singleSection)
);

const massiveInput = document.getElementById("file-massive");
const massiveContainer = document.getElementById("massive-container");

// Event listener mejorado para el archivo masivo
massiveInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    // Limpiar QRs anteriores
    //massiveQRs.forEach((qr) => qr._canvas?.remove());

    massiveContainer.innerHTML = "";
    massiveQRs = [];
    previewQRData = []; // Limpiar datos del previsualizador

    // Ocultar botón flotante mientras se generan los QRs
    const existingBtn = document.getElementById("btnEditarMasivo");
    if (existingBtn) existingBtn.remove();

    lines.forEach((data, i) => {
      const div = document.createElement("div");
      div.classList.add("massive-qr-item");

      const title = document.createElement("p");
      title.textContent = `QR #${i + 1}`;
      div.appendChild(title);

      const qrDiv = document.createElement("div");
      div.appendChild(qrDiv);

      const qrMassive = new QRCodeStyling({
        width: 140,
        height: 140,
        data,
        dotsOptions: { color: "#39d0db", type: "dots" },
        backgroundOptions: { color: "#ffffff" },
        cornersSquareOptions: { type: "extra-rounded" },
        cornersDotOptions: { type: "square" },
        image: DEFAULT_IMAGE,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 1,
        },
      });

      qrMassive.append(qrDiv);

      // Al hacer clic en el QR generado, lo mostramos en el previsualizador
      qrDiv.addEventListener("click", () => {
        abrirPrevisualizador(i);
      });

      massiveContainer.appendChild(div);

      // Guardar referencia del QR y datos para el previsualizador
      massiveQRs.push(qrMassive);
      previewQRData.push({
        qr: qrMassive,
        data: data,
        index: i + 1,
      });
    });

    // Mostrar botón flotante solo después de generar los QRs
    // y si estamos en la pestaña correcta
    const massiveSection = document.getElementById("massive-qr-section");
    if (massiveSection && massiveSection.classList.contains("active")) {
      showFloatingEditButton();
      animarBotonFlotante();
    }

    console.log(`✅ ${lines.length} QRs masivos generados correctamente.`);
  } catch (err) {
    console.error("❌ Error al leer archivo masivo:", err);
    massiveContainer.innerHTML =
      "<p style='color:red'>Error al cargar archivo.</p>";
  }
});

// Función mejorada para mostrar el botón flotante
function showFloatingEditButton() {
  // Verificar si ya existe el botón
  if (document.getElementById("btnEditarMasivo")) return;

  // Verificar que estemos en la pestaña correcta
  const massiveSection = document.getElementById("massive-qr-section");
  if (!massiveSection || !massiveSection.classList.contains("active")) {
    return;
  }

  // Verificar que haya QRs generados
  if (massiveQRs.length === 0) {
    console.log("ℹ️ No hay QRs masivos generados todavía.");
    return;
  }

  const btn = document.createElement("button");
  btn.id = "btnEditarMasivo";
  btn.innerHTML = "✏️";
  btn.title = "Editar estilo de QR masivo";
  btn.setAttribute("aria-label", "Editar estilo de QR masivo");

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: "1000",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#7F56D9",
    color: "white",
    fontSize: "28px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  });

  btn.addEventListener("click", () => {
    const modal = document.getElementById("qr-bulk-config-overlay");
    if (modal) {
      modal.classList.remove("hidden");
      modal.scrollIntoView({ behavior: "smooth" });
    }
  });

  document.body.appendChild(btn);
  console.log("✅ Botón flotante mostrado correctamente.");
}

function mostrarBurbujaSobreBoton(texto) {
  let burbuja = document.getElementById("burbujaPersonalizarQR");
  if (burbuja) burbuja.remove(); // evitar duplicados

  burbuja = document.createElement("div");
  burbuja.id = "burbujaPersonalizarQR";
  burbuja.innerText = texto;

  Object.assign(burbuja.style, {
    position: "fixed",
    bottom: "95px",
    right: "40px",
    backgroundColor: "#7F56D9",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    opacity: "0",
    transition: "opacity 0.3s ease-in-out",
    zIndex: "1001",
  });

  document.body.appendChild(burbuja);

  setTimeout(() => {
    burbuja.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    burbuja.style.opacity = "0";
    setTimeout(() => burbuja.remove(), 500);
  }, 4000);
}

function animarBotonFlotante() {
  const btn = document.getElementById("btnEditarMasivo");
  if (!btn) return;

  btn.animate(
    [
      { transform: "scale(1)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" },
      { transform: "scale(1.1)", boxShadow: "0 4px 20px rgba(127,86,217,0.6)" },
      { transform: "scale(1)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" },
    ],
    {
      duration: 800,
      iterations: 3,
    }
  );

  mostrarBurbujaSobreBoton("¿Quieres personalizar el diseño de los QR?");
}

// Función para abrir el previsualizador con un QR específico
function abrirPrevisualizador(index) {
  if (previewQRData.length === 0) {
    console.warn("⚠️ No hay QRs masivos generados para previsualizar.");
    return;
  }

  currentPreviewIndex = index;
  actualizarPrevisualizador();

  const modal = document.getElementById("qr-preview-modal");
  if (modal) {
    modal.style.display = "flex";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.classList.remove("hidden");
  }
}

// Función para actualizar el contenido del previsualizador
async function actualizarPrevisualizador() {
  if (currentPreviewIndex < 0 || currentPreviewIndex >= previewQRData.length) {
    return;
  }

  const currentQRData = previewQRData[currentPreviewIndex];
  const modal = document.getElementById("qr-preview-modal");

  if (!modal) {
    crearPrevisualizadorModal();
    return;
  }

  try {
    const blob = await currentQRData.qr.getRawData("png");
    const url = URL.createObjectURL(blob);

    const img = document.getElementById("qr-preview-img");
    const counter = document.getElementById("qr-preview-counter");
    const dataInfo = document.getElementById("qr-preview-data");

    if (img) img.src = url;
    if (counter)
      counter.textContent = `${currentPreviewIndex + 1} / ${
        previewQRData.length
      }`;
    if (dataInfo) dataInfo.textContent = currentQRData.data;

    // Actualizar estado de botones de navegación
    const prevBtn = document.getElementById("qr-preview-prev");
    const nextBtn = document.getElementById("qr-preview-next");

    if (prevBtn) prevBtn.disabled = currentPreviewIndex === 0;
    if (nextBtn)
      nextBtn.disabled = currentPreviewIndex === previewQRData.length - 1;
  } catch (err) {
    console.error("❌ Error al actualizar previsualizador:", err);
  }
}

// Función para crear el modal del previsualizador
function crearPrevisualizadorModal() {
  // Verificar si ya existe
  if (document.getElementById("qr-preview-modal")) return;

  const modal = document.createElement("div");
  modal.id = "qr-preview-modal";
  modal.className = "hidden"; // Añadir clase hidden por defecto
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  `;

  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 12px;
      padding: 20px;
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
      position: relative;
    ">
      <!-- Botón cerrar -->
      <button id="qr-preview-close" style="
        position: absolute;
        top: 10px;
        right: 10px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">×</button>
      
      <!-- Contador y datos -->
      <div style="text-align: center; margin-bottom: 15px;">
        <h3 style="margin: 0 0 10px 0;">QR #<span id="qr-preview-counter">1 / 1</span></h3>
        <p style="
          margin: 0;
          font-size: 14px;
          color: #666;
          word-break: break-all;
          max-width: 400px;
        " id="qr-preview-data"></p>
      </div>
      
      <!-- Imagen del QR con zoom -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img id="qr-preview-img" style="
          max-width: 100%;
          height: auto;
          cursor: zoom-in;
          transition: transform 0.3s ease;
        " />
      </div>
      
      <!-- Controles -->
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
      ">
        <!-- Navegación -->
        <div style="display: flex; gap: 10px;">
          <button id="qr-preview-prev" style="
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            cursor: pointer;
          ">← Anterior</button>
          
          <button id="qr-preview-next" style="
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            cursor: pointer;
          ">Siguiente →</button>
        </div>
        
        <!-- Zoom y descarga -->
        <div style="display: flex; gap: 10px;">
          <button id="qr-preview-zoom" style="
            background: #FF9800;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            cursor: pointer;
          ">🔍 Zoom</button>
          
          <button id="qr-preview-download" style="
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 8px 16px;
            cursor: pointer;
          ">⬇️ Descargar</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners del previsualizador
  configurarEventListenersPrevisualizador();
}

// Configurar todos los event listeners del previsualizador
function configurarEventListenersPrevisualizador() {
  const modal = document.getElementById("qr-preview-modal");
  const closeBtn = document.getElementById("qr-preview-close");
  const prevBtn = document.getElementById("qr-preview-prev");
  const nextBtn = document.getElementById("qr-preview-next");
  const zoomBtn = document.getElementById("qr-preview-zoom");
  const downloadBtn = document.getElementById("qr-preview-download");
  const img = document.getElementById("qr-preview-img");

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", cerrarPrevisualizador);
  }

  // Cerrar al hacer clic fuera
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        cerrarPrevisualizador();
      }
    });
  }

  // Navegación
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPreviewIndex > 0) {
        currentPreviewIndex--;
        actualizarPrevisualizador();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPreviewIndex < previewQRData.length - 1) {
        currentPreviewIndex++;
        actualizarPrevisualizador();
      }
    });
  }

  // Zoom
  if (zoomBtn && img) {
    let isZoomed = false;
    zoomBtn.addEventListener("click", () => {
      if (!isZoomed) {
        img.style.transform = "scale(2)";
        img.style.cursor = "zoom-out";
        zoomBtn.textContent = "🔍 Normal";
        isZoomed = true;
      } else {
        img.style.transform = "scale(1)";
        img.style.cursor = "zoom-in";
        zoomBtn.textContent = "🔍 Zoom";
        isZoomed = false;
      }
    });

    // Zoom con clic en imagen
    img.addEventListener("click", () => {
      zoomBtn.click();
    });
  }

  // Descargar QR actual
  if (downloadBtn) {
    downloadBtn.addEventListener("click", descargarQRActual);
  }

  // Navegación con teclado
  document.addEventListener("keydown", (e) => {
    if (modal && modal.style.display === "flex") {
      switch (e.key) {
        case "Escape":
          cerrarPrevisualizador();
          break;
        case "ArrowLeft":
          prevBtn?.click();
          break;
        case "ArrowRight":
          nextBtn?.click();
          break;
      }
    }
  });
}

// Función para cerrar el previsualizador
function cerrarPrevisualizador() {
  const modal = document.getElementById("qr-preview-modal");
  if (modal) {
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.add("hidden");
    }, 300);
  }
}

// Función para descargar el QR actual del previsualizador
async function descargarQRActual() {
  if (currentPreviewIndex < 0 || currentPreviewIndex >= previewQRData.length) {
    console.error("❌ Índice de QR inválido para descarga.");
    return;
  }

  try {
    const currentQRData = previewQRData[currentPreviewIndex];
    const blob = await currentQRData.qr.getRawData("png");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `qr-masivo-${currentQRData.index}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    console.log(`✅ QR #${currentQRData.index} descargado correctamente.`);
  } catch (err) {
    console.error("❌ Error al descargar QR del previsualizador:", err);
  }
}

// Funciones del modal antiguo (mantener compatibilidad)
function abrirQRModal(dataURL) {
  const modal = document.getElementById("qr-modal");
  const img = document.getElementById("qr-modal-img");
  if (modal && img) {
    img.src = dataURL;
    modal.classList.remove("hidden");
  }
}

function cerrarQRModal() {
  const modal = document.getElementById("qr-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// Función de limpieza al cambiar de pestaña
function limpiarPrevisualizador() {
  const modal = document.getElementById("qr-preview-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
  }
  currentPreviewIndex = 0;
  previewQRData = [];
}

// Inicializar
actualizarQR();

// Event listeners para QR unitario (NO para masivos)
document
  .querySelectorAll("#single-qr-section input, #single-qr-section select")
  .forEach((el) => {
    el.addEventListener("input", actualizarQR);
  });

document.getElementById("download-btn").addEventListener("click", descargarQR);

// Modal y botones de configuración masiva
const modalMassiveConfig = document.getElementById("qr-bulk-config-overlay");
const btnCloseMassiveConfig = document.getElementById("close-bulk-config");
const btnSaveMassiveConfig = document.getElementById("save-bulk-config");

// Cerrar modal con X
if (btnCloseMassiveConfig) {
  btnCloseMassiveConfig.addEventListener("click", () => {
    modalMassiveConfig.classList.add("hidden");
  });
}

// Cerrar modal haciendo clic afuera
if (modalMassiveConfig) {
  modalMassiveConfig.addEventListener("click", (e) => {
    if (e.target === modalMassiveConfig) {
      modalMassiveConfig.classList.add("hidden");
    }
  });
}

// Guardar configuración masiva
if (btnSaveMassiveConfig) {
  btnSaveMassiveConfig.addEventListener("click", async () => {
    await actualizarQRMasivos();
    modalMassiveConfig.classList.add("hidden");
    console.log("✅ Configuración masiva guardada y aplicada.");
  });
}

// Crear el previsualizador al cargar la página (solo si no existe)
document.addEventListener("DOMContentLoaded", () => {
  // Verificar que no exista ya el modal antes de crearlo
  if (!document.getElementById("qr-preview-modal")) {
    crearPrevisualizadorModal();
  }
});

document.getElementById("export-massive-btn").addEventListener("click", async () => {
  const zip = new JSZip();

  const canvases = massiveContainer.querySelectorAll("canvas");
  if (canvases.length === 0) {
    alert("No hay QRs generados para exportar");
    return;
  }

  canvases.forEach((canvas, index) => {
    const dataUrl = canvas.toDataURL("image/png");
    const base64 = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
    zip.file(`qr_${index + 1}.png`, base64, { base64: true });
  });

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "qr-masivos.zip");
});
