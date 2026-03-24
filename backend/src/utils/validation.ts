// 1 hàm nhạn vào checkSchema
// chạy checkScheme
// tự khui lỗi
// tự response lỗi luôn

import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

// giúp giảm tải công việc ở controller
// hàm nhận vào validation(kq của checkSchema) sau đó trả ra middleware
// middleware: check validation, khưi lỗi, res lỗi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  // check lỗi bằng validation(kết quả của checkSchema)
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // kiểm tra validation và lưu lỗi vào req
    // khưi lỗi
    const error = validationResult(req)
    // if else
    //nếu không có lỗi thì qua bước tiếp theo
    if (error.isEmpty()) {
      return next()
    }
    //nếu có lỗi thì tổng hợp lỗi lại
    //hầu hết các lỗi là 422
    const errorObject = error.mapped() //đây là thằng lỗi ban đầu xấu quắc
    const entityError = new EntityError({
      errors: {}
    }) //đây là cấu trúc lỗi đẹp mình muốn trả về
    //tí nữa sẽ độ lại errorObject này
    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (
        msg instanceof ErrorWithStatus &&
        msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY //422
      ) {
        return next(msg) //ném cho handler Tổng
      }
      entityError.errors[key] = msg
    }
    return next(entityError)
  } //xử lý
}
