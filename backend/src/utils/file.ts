// file này dùng để xử lý file
import path, { resolve } from 'path'
import fs from 'fs' //file system(xử lý file)
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Request } from 'express'
import formidable, { File } from 'formidable'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/message'
//
export const initFolder = () => {
  //   không có thì mới cần tạo
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }) //về tìm hiểu recursive
    }
  })
}
//

export const handleUploadSingleImage = (req: Request) => {
  //tạo form để hứng giá trị từ FE gửi lên thông qua <form></form>
  const form = formidable({
    //
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024, //300kb
    //thêm 1 hàm kiểm tra
    filter: function ({ name, originalFilename, mimetype }) {
      // điều kiện để valid
      const valid = name == 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('Not File Type') as any)
      }
      //nếu oke
      return valid // hiện tại là true, còn false là kẹt ở trển
    }
  })
  //
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image[0] as File)
    })
  })
}

export const getNameFromFileName = (fileName: string) => {
  //
  const nameArr = fileName.split('.')
  nameArr.pop()
  return nameArr.join('.')
}
//
export const getExtFromFileName = (fileName: string) => {
  //
  const nameArr = fileName.split('.')
  return nameArr.pop()
}
// abc.png 4:1 jpg

export const handleUploadSingleVideo = (req: Request) => {
  //tạo form để hứng giá trị từ FE gửi lên thông qua <form></form>
  const form = formidable({
    //
    uploadDir: path.resolve(UPLOAD_VIDEO_DIR),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 * 1024, //300kb
    //thêm 1 hàm kiểm tra
    filter: function ({ name, originalFilename, mimetype }) {
      // điều kiện để valid
      const valid = name == 'video' && Boolean(mimetype?.includes('video/'))
      if (!valid) {
        form.emit('error' as any, new Error('Not File Type') as any)
      }
      //nếu oke
      return valid // hiện tại là true, còn false là kẹt ở trển
    }
  })
  //
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.video) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.video[0] as File)
    })
  })
}
