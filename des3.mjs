import crypto from "crypto";

export function des3Encrypt(inputString, key, iv = "66666666") {
  key = key.length > 24 ? key.slice(0, 24) : key;
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
  let encrypted = cipher.update(inputString, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}
