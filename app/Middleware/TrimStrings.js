'use strict';

class TrimStrings {
  async handle({ request }, next) {
    if (Object.keys(request.body).length) {
      request.body = Object.assign(
        ...Object.keys(request.body).map(key => ({
          [key]: typeof request.body[key] === 'string' ? request.body[key].toString().trim() : request.body[key]
        }))
      );
    }
    await next();
  }
}

module.exports = TrimStrings;
