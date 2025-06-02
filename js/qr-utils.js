// js/qr-utils.js

// Leer archivo y devolver DataURL para logos
export function leerArchivoComoDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error al leer archivo"));
    reader.readAsDataURL(file);
  });
}

// Mostrar botón flotante para editar QR masivo
export function showFloatingEditButton() {
  if (document.getElementById('btnEditarMasivo')) return;

  const btn = document.createElement('button');
  btn.id = 'btnEditarMasivo';
  btn.innerHTML = '✏️';
  btn.title = 'Editar estilo de QR masivo';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: '1000',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#7F56D9',
    color: 'white',
    fontSize: '28px',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  });

  btn.addEventListener('click', () => {
    const modal = document.getElementById('modalPersonalizacionQR');
    if (modal) {
      modal.style.display = 'flex';
      modal.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.body.appendChild(btn);
}
