import express from 'express'
import { uploadSingleImageController, uploadSingleVideoController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handler'

const mediasRouter = express.Router()

/**
update-image (single)
path: /medias/update-image
method: post
 */

mediasRouter.post(
  '/upload-image', //
  wrapAsync(uploadSingleImageController)
)

mediasRouter.post(
  '/upload-video', //
  wrapAsync(uploadSingleVideoController)
)

export default mediasRouter
