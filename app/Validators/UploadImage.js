'use strict';

const Constants = use('App/Constants');

class UploadImage {
  get rules() {
    return {
      upload: 'file|file_types:image',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send({
      resultCode: Constants.resultCode.failed,
      resultData: errorMessages,
      errorDisplay: true,
      errorMessage: errorMessages[0].message
    });
  }
}

module.exports = UploadImage;
