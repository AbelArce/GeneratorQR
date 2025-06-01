<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Generador QR Ultra Pro</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <main class="container">
    <section class="form-section">
      <h1>Generador QR Ultra Pro</h1>

      <label>Texto o URL:</label>
      <input type="text" id="qr-text" placeholder="https://ejemplo.com">

      <label>Color del QR:</label>
      <input type="color" id="qr-color" value="#000000">

      <label>Color de fondo:</label>
      <input type="color" id="qr-bg-color" value="#ffffff">

      <label>Forma de puntos:</label>
      <select id="dot-type">
        <option value="dots">Puntos</option>
        <option value="rounded">Redondeado</option>
        <option value="square">Cuadrado</option>
      </select>

      <label>Esquinas:</label>
      <select id="corner-type">
        <option value="dot">Puntos</option>
        <option value="square">Cuadrado</option>
        <option value="extra-rounded" selected>Extra Redondeado</option>
      </select>

      <label>Nivel de corrección de error:</label>
      <select id="qr-error">
        <option value="L">L - 7%</option>
        <option value="M" selected>M - 15%</option>
        <option value="Q">Q - 25%</option>
        <option value="H">H - 30%</option>
      </select>

      <label>Tamaño del QR (px):</label>
      <input type="number" id="qr-size" value="300" min="100" max="800">

      <label>Tamaño del logo (0.1 - 0.6):</label>
      <input type="number" id="qr-logo-size" min="0.1" max="0.6" step="0.05" value="0.3">

      <label>Logo personalizado:</label>
      <input type="file" id="qr-logo" accept="image/*">

      <button id="download-btn">Descargar</button>
    </section>

    <section id="qr-preview" class="preview-section"></section>
  </main>

  <footer>
    Hecho por <strong>Abel Salazar Arce</strong> (QA) - Seratic
  </footer>

  <script src="libs/qr-code-styling.js"></script>
  <script src="assets/script.js"></script>
</body>
</html>
