import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend de Chat Socios en Render"
  });
});

app.post("/chat", (req, res) => {
  const { mensaje, upn } = req.body || {};
  const texto = (mensaje || "").toLowerCase();

  let texto_respuesta;
  let pdf_url = null;

  if (texto.includes("calendario")) {
    texto_respuesta =
      "Aquí está tu calendario. (En producción será un PDF real generado desde datos).";
    pdf_url =
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  } else if (texto.includes("reclamo")) {
    texto_respuesta =
      "Para iniciar un reclamo, indícame número de factura y descripción.";
  } else {
    texto_respuesta =
      "Hola, soy Ms Comisiones (backend Render). Puedo ayudarte con consultas de pago, reclamos y calendario.";
  }

  res.json({ texto_respuesta, pdf_url });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
