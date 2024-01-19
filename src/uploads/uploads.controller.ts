import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('uploads')
export class UploadsController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file) {
    // console.log(file, '-----as-dadsads');
    return { filename: file.filename };
  }
}
