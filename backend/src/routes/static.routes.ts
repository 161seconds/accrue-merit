import express from 'express'
import { serveImageController, serveVideoController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handler'
//
const staticRouter = express.Router()

// routes chia sẽ ảnh
staticRouter.get(
  '/image/:filename', //
  wrapAsync(serveImageController)
)
//
staticRouter.get(
  '/video/:filename', //
  wrapAsync(serveVideoController)
)
export default staticRouter
