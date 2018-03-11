/**
 * Returns a QRCode using the payload as seed
 * @param {String} payload
 * @param {Function<Promise>} getQRCode
 * @returns {{src: String}}
 */
const getSrcWithQrCode = async (payload = "", getQRCode) => {
  if (payload === "") {
    throw new Error('Missing required parameter: "payload"');
  }

  const dataUrl = await getQRCode(payload);

  return {
    src: dataUrl
  };
};
module.exports = getSrcWithQrCode;
