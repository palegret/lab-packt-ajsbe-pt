'use strict';

/* Model classes */

+function (window, angular, sevenMinuteWorkout) {
	'use strict';

    sevenMinuteWorkout.factory('WorkoutPlan', function () {
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
    
	sevenMinuteWorkout.factory('Exercise', function () {
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
}(this, this.angular, this.sevenMinuteWorkout);
