// simple base64 encoding
const tokenGenerator = (payload) => {
  const json = JSON.stringify(payload);
  return Buffer.from(json).toString("base64");
};

module.exports = tokenGenerator;
