'use strict';

const Constants = use('App/Constants');

class PostList {
  get rules() {
    return {
      page: 'integer',
      limit: 'integer'
    };
  }

  get messages() {
    return {
      'page.integer': 'Page number must be integer',
      'limit.integer': 'Limit number must be integer'
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

module.exports = PostList;
