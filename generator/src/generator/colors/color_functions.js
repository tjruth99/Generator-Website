export function HexToHSL(hex) {
  var r = parseInt(hex.substring(1, 3), 16);
  var g = parseInt(hex.substring(3, 5), 16);
  var b = parseInt(hex.substring(5, 7), 16);

  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.floor(s * 100);
  l = Math.floor(l * 100);

  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

export function HexToRGB(hex) {
  var r = parseInt(hex.substring(1, 3), 16);
  var g = parseInt(hex.substring(3, 5), 16);
  var b = parseInt(hex.substring(5, 7), 16);
  return "R: " + r + " G: " + g + " B: " + b;
}

export function RGBtoHex(r, g, b) {
  var redHex = r.toString(16);
  if (redHex.length < 2) {
    redHex = "0" + redHex;
  }

  var greenHex = g.toString(16);
  if (greenHex.length < 2) {
    greenHex = "0" + greenHex;
  }

  var blueHex = b.toString(16);
  if (blueHex.length < 2) {
    blueHex = "0" + blueHex;
  }

  var hex = "#";
  return hex.concat(redHex, greenHex, blueHex).toUpperCase();
}

export function HSLtoHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return RGBtoHex(r, g, b);
}

export function generateRandomColor() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  return RGBtoHex(red, green, blue);
}

export function generateSingleHue(h, range, min) {
  let hue = Math.floor(Math.random() * 10) + (h - 5);
  let saturation = Math.floor(Math.random() * range) + min;
  let lightness = Math.floor(Math.random() * range) + min;

  return HSLtoHex(hue, saturation, lightness);
}

export function generateNeon() {
  let hue = Math.floor(Math.random() * 360);
  let saturation = Math.floor(Math.random() * 10) + 90;
  let lightness = 50;

  return HSLtoHex(hue, saturation, lightness);
}

export function generatePastel() {
  let hue = Math.floor(Math.random() * 360);
  let saturation = Math.floor(Math.random() * 20) + 80;
  let lightness = Math.floor(Math.random() * 25) + 75;

  return HSLtoHex(hue, saturation, lightness);
}
