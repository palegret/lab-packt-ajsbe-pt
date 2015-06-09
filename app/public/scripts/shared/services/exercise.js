'use strict';

+function (window, angular, app) {
	'use strict';

	app.factory('Exercise', function () {
        function Exercise(args) {
            this.name = args.name;
            this.title = args.title;
            this.description = args.description;
            this.image = args.image;
            this.related = {};
            this.related.videos = args.videos;
            this.nameSound = args.nameSound;
            this.procedure = args.procedure;
        }
        
        return Exercise;
    });
}(this, this.angular, this.app);
