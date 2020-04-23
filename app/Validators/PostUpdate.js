'use strict';

const Constants = use('App/Constants');

class PostUpdate {
  get rules() {
    return {
      id: 'required|integer',
      type: 'required|regex:^[A-Z]+$',
      status: 'required|regex:^[A-Z]+$',
      scheduledTime: 'integer',
      imagesId: 'array',
      videoId: 'integer',
      updatedAt: 'integer',
    };
  }

  get messages() {
    return {
      'id.required': 'Post id cannot be empty',
      'id.integer': 'Post id must be an integer',
      'type.required': 'Post type cannot be empty',
      'type.regex': 'Post type is invalid',
      'status.required': 'Post status cannot be empty',
      'status.regex': 'Post status is invalid',
      'scheduledTime.integer': 'Scheduled Time must be an integer',
      'imagesId.array': 'Images id must be an array',
      'videoId.integer': 'Video id must be an integer',
      'updatedAt.integer': 'Updated at must be an integer'
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

module.exports = PostUpdate;
