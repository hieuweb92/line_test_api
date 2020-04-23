'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const Env = use('Env');

const apiPrefix = (group) => {
  group.prefix(Env.get('API_PREFIX'));
  return group;
};

/** Post **/
apiPrefix(Route.group(() => {
  Route.post('create', 'PostController.create').validator('PostCreate');
  Route.get('list', 'PostController.list').validator('PostList');
  Route.get('detail', 'PostController.detail').validator('PostDetail');
  Route.post('update', 'PostController.update').validator('PostUpdate');
}).prefix('post'));

/** Upload **/
apiPrefix(Route.group(() => {
  Route.post('image', 'UploadController.image').validator('UploadImage');
  Route.post('video', 'UploadController.video').validator('UploadVideo');
}).prefix('upload'));

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' };
});
