'use strict';

const Post = use('App/Models/Post');
const Image = use('App/Models/Image');
const Video = use('App/Models/Video');
const Constants = use('App/Constants');

class PostController {
  async create({ request, response }) {
    try {
      const { images, video } = request.all();
      const post = new Post();
      post.type = request.input('type');
      post.status = request.input('status');
      post.scheduled_time = request.input('scheduledTime');
      post.created_at = request.input('createdAt');
      await post.save();
      if (images.length) {
        post.images = await Image.query()
          .whereIn('id', images.map(image => (image.id)))
          .whereNull('post_id')
          .update({ post_id: post.id });
        post.images = await post.images().fetch();
      }
      if (video) {
        post.video = await Video.query()
          .where('id', video.id)
          .whereNull('post_id')
          .update({ post_id: post.id });
        post.video = await post.video().fetch();
      }

      return response.send({
        resultCode: Constants.resultCode.success,
        resultData: post,
        errorDisplay: false,
        errorMessage: 'Created post successful'
      });
    } catch (error) {
      return response.status(500).send({
        resultCode: Constants.resultCode.failed,
        resultData: error,
        errorDisplay: true,
        errorMessage: error.message
      });
    }
  }

  async list({ request, response }) {
    const { page, limit } = request.all();
    try {
      const query = Post.query();
      query.with('images');
      query.with('video');
      query.with('link');
      query.with('survey');
      query.orderBy('scheduled_time', 'desc');
      query.orderBy('updated_at', 'desc');
      query.orderBy('created_at', 'desc');
      const posts = await query.paginate(page || 1, limit || 10);
      return response.send({
        resultCode: Constants.resultCode.success,
        resultData: posts,
        errorDisplay: false,
        errorMessage: ''
      });
    } catch (error) {
      return response.status(500).send({
        resultCode: Constants.resultCode.failed,
        resultData: error,
        errorDisplay: true,
        errorMessage: error.message
      });
    }
  }

  async detail({ request, response }) {
    try {
      const { id } = request.all();
      const post = await Post.query()
        .where('id', id)
        .with('images')
        .with('video')
        .with('link')
        .with('survey')
        .firstOrFail();
      console.log(post);
      return response.send({
        resultCode: Constants.resultCode.success,
        resultData: post,
        errorDisplay: false,
        errorMessage: ''
      });
    } catch (error) {
      if (error.code === 'E_MISSING_DATABASE_ROW') {
        return response.status(404).send({
          resultCode: Constants.resultCode.failed,
          resultData: error,
          errorDisplay: true,
          errorMessage: 'This post could not be found'
        });
      } else {
        return response.status(500).send({
          resultCode: Constants.resultCode.failed,
          resultData: error,
          errorDisplay: true,
          errorMessage: error.message
        });
      }
    }
  }

  async update({ request, response }) {
    try {
      const { id, images, video } = request.all();
      const post = await Post.findOrFail(id);
      post.type = request.input('type', post.type);
      post.status = request.input('status', post.status);
      post.scheduled_time = request.input('scheduledTime', post.scheduled_time);
      post.updated_at = request.input('updatedAt');
      await post.save();
      await Image.query()
        .where('post_id', id)
        .update({ post_id: null });
      await Video.query()
        .where('post_id', id)
        .update({ post_id: null });
      if (images.length) {
        post.images = await Image.query()
          .whereIn('id', images.map(image => (image.id)))
          .whereNull('post_id')
          .update({ post_id: post.id });
        post.images = await post.images().fetch();
      }
      if (video) {
        post.video = await Video.query()
          .where('id', video.id)
          .whereNull('post_id')
          .update({ post_id: post.id });
        post.video = await post.video().fetch();
      }
      return response.send({
        resultCode: Constants.resultCode.success,
        resultData: post,
        errorDisplay: false,
        errorMessage: 'Updated post successful'
      });
    } catch (error) {
      if (error.code === 'E_MISSING_DATABASE_ROW') {
        return response.status(404).send({
          resultCode: Constants.resultCode.failed,
          resultData: error,
          errorDisplay: true,
          errorMessage: 'This post could not be found'
        });
      } else {
        return response.status(500).send({
          resultCode: Constants.resultCode.failed,
          resultData: error,
          errorDisplay: true,
          errorMessage: error.message
        });
      }
    }
  }
}

module.exports = PostController;
