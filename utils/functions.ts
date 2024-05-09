import { VisitorPass } from "@/types";

export function generateCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export function isPassExpired(pass: VisitorPass) {
  return new Date(pass.expires_at) < new Date();
}