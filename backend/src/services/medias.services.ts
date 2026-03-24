import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getExtFromFileName, getNameFromFileName, handleUploadSingleImage, handleUploadSingleVideo } from '~/utils/file'
import fs from 'fs'
class MediasServices {
  //
  async uploadSingleImage(req: Request) {
    //xử lý file và lưu vào upload_image_temp
    const file = await handleUploadSingleVideo(req)
    //
    const newFileName = getNameFromFileName(file.newFilename) + '.jpg'
    file.newFilename = newFileName
    const newPath = UPLOAD_IMAGE_DIR + '/' + newFileName
    // xử lý bằng sharp để nén file lại
    // sharp nhận vào đường link dẫn đến file cần xử lý
    const infor = await sharp(file.filepath).jpeg().toFile(newPath)

    //xóa file trong temp
    fs.unlinkSync(file.filepath)
    //
    return `http://localhost:4115/static/image/${newFileName}`
  }

  //
  async uploadSingleVideo(req: Request) {
    const file = await handleUploadSingleVideo(req)
    const ext = getExtFromFileName(file.originalFilename as string)
    // fs.renameSync(file.filepath, file.filepath + '.' + ext)

    return `http://localhost:4115/static/video/${file.newFilename}`
  }
}

const mediasServices = new MediasServices()
export default mediasServices
