'use strict';

const Constants = use('App/Constants');

class PostCreate {
  get rules() {
    return {
      type: 'required|regex:^[A-Z]+$',
      status: 'required|regex:^[A-Z]+$',
      scheduledTime: 'integer',
      imagesId: 'array',
      videoId: 'integer',
      createdAt: 'integer'
    };
  }

  get messages() {
    return {
      'type.required': 'Post type cannot be empty',
      'type.regex': 'Post type is invalid',
      'status.required': 'Post status cannot be empty',
      'status.regex': 'Post status is invalid',
      'scheduledTime.integer': 'Scheduled Time must be an integer',
      'imagesId.array': 'Images id must be an array',
      'videoId.integer': 'Video id must be an integer',
      'createdAt.integer': 'Created at must be an integer'
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

module.exports = PostCreate;
