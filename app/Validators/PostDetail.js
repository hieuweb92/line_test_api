'use strict';

const Constants = use('App/Constants');

class ClassDetail {
  get rules() {
    return {
      id: 'required|integer'
    };
  }

  get messages() {
    return {
      'id.required': 'Post id cannot be empty',
      'id.integer': 'Post id must be an integer'
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

module.exports = ClassDetail;
