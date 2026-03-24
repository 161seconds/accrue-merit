//hàm mã hóa nội dung bất kỳ thành SHA256

import { createHash } from 'crypto'
import dotenv from 'dotenv'
dotenv.config()
function SHA256(content: string) {
  return createHash('SHA256').update(content).digest('hex') //16
}

// hàm mã hóa mật khẩu theo tiêu chuẩn SHA256
export function hashPassword(password: string) {
  return SHA256(password + process.env.PASSWORD_SECRET)
}
