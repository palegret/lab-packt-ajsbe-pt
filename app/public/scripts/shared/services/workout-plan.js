'use strict';

+function (window, angular, app) {
	'use strict';

    app.factory('WorkoutPlan', function () {
        function WorkoutPlan(args) {
            this.exercises = [];
            this.name = args.name;
            this.title = args.title;
            this.description = args.description;
            this.restBetweenExercise = args.restBetweenExercise;
        };
        
        WorkoutPlan.prototype.totalWorkoutDuration = function () {
            if (this.exercises.length === 0) 
                return 0;
            
            var total = 0;
            
            angular.forEach(this.exercises, function (exercise) {
                total = total + (exercise.duration || 0);
            });
            
            return (this.restBetweenExercise || 0) * (this.exercises.length - 1) + total;
        }
        
        return WorkoutPlan;
    });
}(this, this.angular, this.app);
