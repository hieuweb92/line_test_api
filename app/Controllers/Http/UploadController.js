'use strict';

const Image = use('App/Models/Image');
const Helpers = use('Helpers');
const moment = use('moment');
const sharp = use('sharp');
const Constants = use('App/Constants');

class UploadController {
  async image({ request, response }) {
    try {
      const imageFile = request.file('upload');
      const relativePath = 'uploads/' + moment().format('YYYY/MM/DD');
      const path = Helpers.publicPath(relativePath);
      let originalName = moment().unix() + '_' + imageFile.clientName;
      await imageFile.move(path, {
        name: originalName,
        overwrite: true
      });
      if (imageFile.moved()) {
        const sharpFile = sharp(path + '/' + originalName);
        const imageInfo = await sharpFile.metadata();
        let thumbName = 'thumbnail_' + originalName;
        await sharpFile.resize({ width: 150 }).toFile(path + '/' + thumbName);
        const image = new Image();
        image.thumb = relativePath + '/' + thumbName;
        image.original = relativePath + '/' + originalName;
        image.width = imageInfo.width;
        image.height = imageInfo.height;
        image.save();
        return response.send({
          resultCode: Constants.resultCode.success,
          resultData: image,
          errorDisplay: false,
          errorMessage: 'Upload image successful'
        });
      } else {
        throw (imageFile.error().message);
      }
    } catch (error) {
      console.log(error);
      return response.status(500).send({
        resultCode: Constants.resultCode.failed,
        resultData: error,
        errorDisplay: true,
        errorMessage: error.message
      });
    }
  }
}

module.exports = UploadController;
