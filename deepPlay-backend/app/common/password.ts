import bcrypt from "bcrypt";
import crypto, { Hash, Cipher, Decipher } from "crypto";
/**
 * Encrypt the password using bcrypt algo
 */
const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Compare the password using bcrypt algo
 */
const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
/**
 * Generates Salt for the password
 */
const generateSalt = (length = 10) => {
  var text: string = "";
  var possible: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
/**
 * Create a hash of the plain password using crypto method
 */
const hashPassword = (password: string, salt: string = "123456"): string => {
  const hash = crypto.createHash("sha256");
  return hash.update(password + "-" + salt).digest("hex");
};
/**
 * Verifies the hashed password and plain password are the same or not
 */
const verifyPassword = (
  hashedPassword: string,
  password: string,
  salt = "123456"
): boolean => {
  const hash: Hash = crypto.createHash("sha256");
  var pwd: string = hash.update(password + "-" + salt).digest("hex");
  return pwd == hashedPassword;
};
//Encrypt Email and Id
var algorithm: string = "aes-256-cbc";
var password: string = "password";
const encrypt = (text: string) => {
  const cipher: Cipher = crypto.createCipher(algorithm, password);
  var crypted: string = cipher.update(text.toString(), "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};
// Dycript Email and Id
const decrypt = (text: string) => {
  const decipher: Decipher = crypto.createDecipher(algorithm, password);
  var dec: string = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};
/**
 *
 */
const JWTSecrete: string = "qwertyuiop[]lkjhgfdazxcvbnm,./!@#$%^&*()";

export {
  encryptPassword,
  comparePassword,
  generateSalt,
  hashPassword,
  verifyPassword,
  encrypt,
  decrypt,
  JWTSecrete
};
