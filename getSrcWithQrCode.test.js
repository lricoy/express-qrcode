const getSrcWithQrCode = require("./getSrcWithQrCode");

const mockQRCodeGetter = () =>
  new Promise(resolve => {
    resolve("data:image/png;base64,");
  });

test("Recebe um payload", async () => {
  try {
    const value = await getSrcWithQrCode("myPayload", mockQRCodeGetter);
    expect(value).not.toBeUndefined();
  } catch (e) {}
});

test("Valida que o o payload é válido", async () => {
  try {
    await getSrcWithQrCode("", mockQRCodeGetter);
  } catch (e) {
    expect(e.message).toEqual('Missing required parameter: "payload"');
  }
});

test("Retorna um objeto no formato {src: dataUrl}", async () => {
  const actual = await getSrcWithQrCode("h4ck15h", mockQRCodeGetter);
  expect(actual).toHaveProperty("src");
  expect(actual.src.startsWith("data:image/png;base64,")).toBe(true);
});
