const qr = new QRCodeStyling({
  width: 300,
  height: 300,
  image: "",
  dotsOptions: { color: "#000", type: "rounded" },
  backgroundOptions: { color: "#fff" },
  imageOptions: { crossOrigin: "anonymous", margin: 10 }
});

const preview = document.getElementById("qr-preview");
qr.append(preview);

const qrData = document.getElementById("qrData");
const dotColor = document.getElementById("dotColor");
const bgColor = document.getElementById("bgColor");
const imageUrl = document.getElementById("imageUrl");
const themeSelect = document.getElementById("theme");

function updateQR() {
  qr.update({
    data: qrData.value,
    dotsOptions: { color: dotColor.value },
    backgroundOptions: { color: bgColor.value },
    image: imageUrl.value || ""
  });
}

function applyTheme(theme) {
  document.body.className = theme;
}

[qrData, dotColor, bgColor, imageUrl].forEach(input => {
  input.addEventListener("input", updateQR);
});

themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value);
});

applyTheme("light");
updateQR();
