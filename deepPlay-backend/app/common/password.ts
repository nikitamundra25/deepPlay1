import bcrypt from "bcrypt";
import crypto, { Hash } from "crypto";
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
  JWTSecrete
};
