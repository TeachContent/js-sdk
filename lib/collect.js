const EdvironMode = {
  PRODUCTION: "production",
  DEV: "development",
};

class Edviron {
  constructor(mode) {
    this.mode = mode || EdvironMode.PRODUCTION;
  }

  collect({ collect_request_id, onSuccess, onError }) {
    if (!collect_request_id) {
      alert("No collect request ID provided.");
      return;
    }

    const div = document.createElement("div");
    const iframe = document.createElement("iframe");

    div.addEventListener("click", () => {
      div.style.cssText = `
        display: none;
      `;
    });

    div.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      background-color: rgba(0, 0, 0, 0.7);
    `;

    const prefix = this.mode === EdvironMode.PRODUCTION ? "pg" : "dev.pg";
    const initialUrl = `https://${prefix}.edviron.in/collect-sdk-payments?collect_id=${collect_request_id}&isBlank=${true}`;

    iframe.id = "mainIframe";
    iframe.src = initialUrl;
    iframe.style.cssText = `
      border: none;
      border-radius: 12px;
      width: 420px;
      height: 95%;
      background-color: white;
    `;

    const messageHandler = (e) => {
      if (e.origin === "http://127.0.0.1:3001") return;

      if (e.data.content && e.data.content.includes("/payment-success")) {
        onSuccess?.();
        cleanUp();
      }

      if (e.data.content && e.data.content.includes("/payment-failure")) {
        onError?.();
        cleanUp();
      }
    };

    const cleanUp = () => {
      window.removeEventListener("message", messageHandler);
      clearInterval(timer);
      div.style.cssText = "display: none;";
    };

    iframe.onload = () => {
      window.addEventListener("message", messageHandler);
    };

    const timer = setInterval(() => {
      try {
      } catch (err) {
        onError?.();
        cleanUp();
      }
    }, 3000);

    div.appendChild(iframe);
    document.body.appendChild(div);
  }
}
