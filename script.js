(function () {
  "use strict";

  function initCertSlider() {
    // ===== 所持資格スライド（一定間隔・右から左へ） =====
    const certList = document.getElementById("certList");
    const certSlide = document.getElementById("certSlide");
    const certName = document.getElementById("certName");

    const CERT_INTERVAL_MS = 5500;
    const SLIDE_ANIMATION_MS = 900;

    if (!certList || !certSlide || !certName) return;

    const certItems = certList.querySelectorAll(".cert-name");
    const certs = Array.from(certItems)
      .map((el) => (el.textContent || "").trim())
      .filter(Boolean);

    if (certs.length <= 1) return;

    let certIndex = 0;

    const showNextCert = () => {
      certIndex = (certIndex + 1) % certs.length;
      certName.textContent = certs[certIndex];

      certSlide.classList.remove("slide-in");
      // reflow: アニメーションを毎回確実に発火させる
      // eslint-disable-next-line no-unused-expressions
      certSlide.offsetHeight;
      certSlide.classList.add("slide-in");

      window.setTimeout(() => {
        certSlide.classList.remove("slide-in");
      }, SLIDE_ANIMATION_MS);
    };

    window.setInterval(showNextCert, CERT_INTERVAL_MS);
  }

  function initContactForm() {
    // ===== お問い合わせフォーム =====
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formNote = document.getElementById("formNote");

    if (
      !form ||
      !nameInput ||
      !emailInput ||
      !messageInput ||
      !nameError ||
      !emailError ||
      !messageError ||
      !formNote
    ) {
      return;
    }

    const setFieldValidity = (input, isValid) => {
      if (isValid) {
        input.removeAttribute("aria-invalid");
      } else {
        input.setAttribute("aria-invalid", "true");
      }
    };

    const clearErrors = () => {
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formNote.textContent = "";
      formNote.className = "form-note";

      nameInput.classList.remove("invalid");
      emailInput.classList.remove("invalid");
      messageInput.classList.remove("invalid");

      setFieldValidity(nameInput, true);
      setFieldValidity(emailInput, true);
      setFieldValidity(messageInput, true);
    };

    const showFieldError = (input, message) => {
      input.classList.add("invalid");
      setFieldValidity(input, false);

      if (input.id === "name") nameError.textContent = message;
      if (input.id === "email") emailError.textContent = message;
      if (input.id === "message") messageError.textContent = message;
    };

    const validate = () => {
      clearErrors();
      let valid = true;

      const name = nameInput.value.trim();
      if (!name) {
        showFieldError(nameInput, "名前を入力してください。");
        valid = false;
      }

      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        showFieldError(emailInput, "メールアドレスを入力してください。");
        valid = false;
      } else if (!emailPattern.test(email)) {
        showFieldError(emailInput, "有効なメールアドレスを入力してください。");
        valid = false;
      }

      const message = messageInput.value.trim();
      if (!message) {
        showFieldError(messageInput, "メッセージを入力してください。");
        valid = false;
      }

      return valid;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validate()) {
        formNote.textContent = "入力内容をご確認ください。";
        formNote.className = "form-note error";
        return;
      }

      // 実際の送信はバックエンドまたはFormspree等に接続してください
      formNote.textContent =
        "送信ありがとうございます。内容を確認のうえ、ご連絡いたします。";
      formNote.className = "form-note success";
      form.reset();
      clearErrors();
    });

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("invalid");
        setFieldValidity(input, true);

        if (input.id === "name") nameError.textContent = "";
        if (input.id === "email") emailError.textContent = "";
        if (input.id === "message") messageError.textContent = "";
      });
    });
  }

  initCertSlider();
  initContactForm();
})();
