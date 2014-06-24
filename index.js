'use strict';

var topics = module.parent.require('./topics'),
	db = module.parent.require('./database'),
	user = module.parent.require('./user'),
	plugins = module.parent.require('./plugins');
		

(function (module) {

	module.init = function (app, middleware, controllers) {

		/*app.get('/admin/plugins/webin', middleware.admin.buildHeader, renderAdmin);
		app.get('/api/admin/plugins/webin', renderAdmin);

		app.post('/api/admin/plugins/webin/save', save);*/
	};


}(module.exports));

