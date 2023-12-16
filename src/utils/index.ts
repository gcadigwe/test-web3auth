import crypto from "crypto";

export const buildWeb3AuthConnection = (
  sessionId: string,
  typeOfLogin: string
) => {
  return {
    sessionId: sessionId,
    touchIDPreference: "unset",
    appState: "",
    email: "",
    // aggregateVerifier: "tkey-google-cyan",
    name: "",
    profileImage: "",
    typeOfLogin: typeOfLogin,
    verifier: "torus",
    verifierId: "",
    dappShare: "",
    oAuthIdToken: "",
    oAuthAccessToken: "",
    idToken: "",
    accessToken: "",
  };
};

export const decryptSessionId = (encryptedSession: string) => {
  try {
    const algorithm = "aes-256-ctr";

    if (encryptedSession) {
      const key_string = process.env.ENCRYPTION_KEY_STRING;

      const ENCRYPTION_KEY = Buffer.from(key_string as string, "base64");
      let textParts = encryptedSession.split(":");
      let iv = Buffer.from(textParts.shift() as string, "hex");
      let encryptedText = Buffer.from(textParts.join(":"), "hex");
      let decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(ENCRYPTION_KEY as any, "hex"),
        iv
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    }
  } catch (err) {
    console.log(err);
  }
};
