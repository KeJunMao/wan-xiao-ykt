import NodeRSA from "node-rsa";

export function createRSAKeyPair(size = 1024) {
  const rsa = NodeRSA({ b: size });
  let privateKey = rsa.exportKey("private");
  let publicKey = rsa.exportKey("public");
  privateKey = privateKey.split("-\n")[1].split("\n-")[0];
  publicKey = publicKey.split("-\n")[1].split("\n-")[0];
  return {
    publicKey,
    privateKey,
    encrypt(inputString) {
      return encrypt(inputString, this.publicKey);
    },
    decrypt(inputString) {
      return decrypt(inputString, this.privateKey);
    },
  };
}

export function encrypt(inputString, publicKey) {
  const keyData = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
  const rsa = NodeRSA(keyData, {
    encryptionScheme: "pkcs1",
  });
  return rsa.encrypt(inputString, "base64");
}

export function decrypt(inputString, privateKey) {
  const keyData = `-----BEGIN RSA PRIVATE KEY-----\n${privateKey}\n-----END RSA PRIVATE KEY------`;
  const rsa = NodeRSA(keyData, {
    encryptionScheme: "pkcs1",
  });
  return rsa.decrypt(inputString, "utf-8");
}
