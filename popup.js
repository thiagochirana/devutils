const COPY_RESET_MS = 2400;

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-panel]"));

  const cnpjOutput = document.getElementById("cnpj-output");
  const cpfOutput = document.getElementById("cpf-output");
  const emailOutput = document.getElementById("email-output");

  const cnpjMask = document.getElementById("cnpj-mask");
  const cpfMask = document.getElementById("cpf-mask");
  const cnpjModeRadios = Array.from(document.querySelectorAll('input[name="cnpj-mode"]'));

  const generateCnpjButton = document.getElementById("generate-cnpj");
  const generateCpfButton = document.getElementById("generate-cpf");
  const generateEmailButton = document.getElementById("generate-email");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  function activateTab(tabName) {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.tab === tabName;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.panel !== tabName);
    });
  }

  generateCnpjButton.addEventListener("click", () => {
    const mode = (cnpjModeRadios.find((radio) => radio.checked)?.value) || "numeric";
    const withMask = Boolean(cnpjMask.checked);
    cnpjOutput.value = generateCnpj(mode === "numeric", withMask);
  });

  generateCpfButton.addEventListener("click", () => {
    cpfOutput.value = generateCpf(Boolean(cpfMask.checked));
  });

  generateEmailButton.addEventListener("click", () => {
    emailOutput.value = generateEmail();
  });

  cnpjModeRadios.forEach((radio) => {
    radio.addEventListener("change", () => generateCnpjButton.click());
  });

  [cnpjMask, cpfMask].forEach((input) => {
    input.addEventListener("change", () => {
      if (input.id === "cnpj-mask") {
        generateCnpjButton.click();
      } else {
        generateCpfButton.click();
      }
    });
  });

  setupCopyButtons();

  activateTab("cnpj");
  generateCnpjButton.click();
  generateCpfButton.click();
  generateEmailButton.click();
});

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll("[data-copy-target]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.getAttribute("data-copy-target");
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target || !(target instanceof HTMLInputElement)) {
        return;
      }

      const value = target.value.trim();
      if (!value) {
        flashCopyState(button, "Nada para copiar", true);
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
        flashCopyState(button, "Copiado!");
      } catch (error) {
        console.error("Erro ao copiar", error);
        flashCopyState(button, "Erro", true);
      }
    });
  });
}

function flashCopyState(button, text, isError = false) {
  const originalText = button.dataset.originalText || button.textContent || "Copiar";
  button.dataset.originalText = originalText;

  clearTimeout(Number(button.dataset.copyTimeout));
  button.textContent = text;
  button.classList.toggle("copied", !isError);

  const timeoutId = window.setTimeout(() => {
    button.textContent = button.dataset.originalText || "Copiar";
    button.classList.remove("copied");
  }, COPY_RESET_MS);

  button.dataset.copyTimeout = String(timeoutId);
}

function generateCpf(withMask) {
  const baseDigits = Array.from({ length: 9 }, () => randomDigit());

  const firstDigit = calculateCpfDigit(baseDigits, 10);
  const secondDigit = calculateCpfDigit([...baseDigits, firstDigit], 11);

  const cpf = [...baseDigits, firstDigit, secondDigit].join("");
  return withMask ? maskCpf(cpf) : cpf;
}

function calculateCpfDigit(digits, factorStart) {
  const sum = digits.reduce((acc, digit, index) => acc + digit * (factorStart - index), 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function generateCnpj(isNumeric, withMask) {
  if (!isNumeric) {
    const base = `${randomAlphanumericBase(8)}0001`;
    const values = base.split("").map(charValueForCnpj);
    const firstDigit = calculateAlphanumericCnpjDigit(values);
    const secondDigit = calculateAlphanumericCnpjDigit([...values, firstDigit]);
    const cnpj = `${base}${firstDigit}${secondDigit}`;
    return withMask ? maskCnpj(cnpj) : cnpj;
  }

  const baseDigits = [...Array.from({ length: 8 }, () => randomDigit()), 0, 0, 0, 1];
  const firstDigit = calculateCnpjDigit(baseDigits, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const secondDigit = calculateCnpjDigit([...baseDigits, firstDigit], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  const cnpj = [...baseDigits, firstDigit, secondDigit].join("");
  return withMask ? maskCnpj(cnpj) : cnpj;
}

function calculateCnpjDigit(digits, weights) {
  const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

function calculateAlphanumericCnpjDigit(values) {
  const weights = buildWeights(values.length);
  const sum = values.reduce((acc, value, index) => acc + value * weights[index], 0);
  const remainder = sum % 11;
  return remainder === 0 || remainder === 1 ? 0 : 11 - remainder;
}

function buildWeights(length) {
  const weights = Array.from({ length });
  let weight = 2;
  for (let i = length - 1; i >= 0; i -= 1) {
    weights[i] = weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  return weights;
}

function charValueForCnpj(char) {
  const code = char.toUpperCase().charCodeAt(0);
  return code - 48;
}

function generateEmail() {
  const adjectives = ["agile", "brisk", "citrus", "pixel", "nova", "quark", "vector", "bright", "urban", "solis"];
  const nouns = ["labs", "dev", "studio", "flux", "stack", "shift", "byte", "cloud", "cafe", "pulse"];
  const domains = ["devmail.com", "stacklab.io", "contato.app.br", "brasilmail.dev", "bytehub.com.br", "fluxo.email"];

  const adjective = pickOne(adjectives);
  const noun = pickOne(nouns);
  const number = Math.random() < 0.6 ? String(randomInt(10, 999)) : "";
  const connector = Math.random() < 0.5 ? "." : "";

  const username = `${adjective}${connector}${noun}${number}`.toLowerCase().replace(/[^a-z0-9._-]/g, "");
  const safeUsername = username.replace(/^[._-]+/, "") || `usuario${randomInt(10, 99)}`;

  const domain = pickOne(domains);
  return `${safeUsername}@${domain}`;
}

function randomAlphanumericBase(length) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars[randomInt(0, chars.length - 1)];
  }
  return result;
}

function maskCpf(value) {
  if (value.length < 11) return value;
  return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
}

function maskCnpj(value) {
  if (value.length < 14) return value;
  return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`;
}

function randomDigit() {
  return randomInt(0, 9);
}

function randomInt(min, max) {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function pickOne(list) {
  return list[randomInt(0, list.length - 1)];
}
