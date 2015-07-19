+function (window, angular, workoutBuilder) {
    'use strict';
    
    var workoutBuilderFactory = function (Exercise, WorkoutPlan, WorkoutService) {
        var _service = {},
            _buildingWorkout,
            _newWorkout;
        
        _service.startBuilding = function (name) {
            if (name) {
                _buildingWorkout = WorkoutService.getWorkout(name);
                _newWorkout = false;
            } else {
                _buildingWorkout = new WorkoutPlan({});
                _newWorkout = true;
            }
            
            return _buildingWorkout;
        };

        _service.removeExercise = function (exercise) {
            _buildingWorkout.exercises.splice(_buildingWorkout.exercises.indexOf(exercise), 1);
        };

        _service.addExercise = function (exercise) {
            _buildingWorkout.exercises.push({ 
                details: exercise, 
                duration: WorkoutService.DEFAULT_DURATION 
            });
        };

        _service.moveExerciseTo = function (exercise, toIndex) {
            if (toIndex < 0 || toIndex >= _buildingWorkout.exercises) 
                return;
                
            // Reminder: array.splice(startIndex, numberToDelete[, item1[, item2[, ...]]])
            // * Changes contents of arrays by removing existing and/or adding new elements.
            // * Returns array of deleted elements, or empty array if none.
            // * If numberToDelete is zero, no elements are deleted. Duh.
            // * Parameters item1, item2, etc. can be arrays.
            
            var currentIndex = _buildingWorkout.exercises.indexOf(exercise);
            var exerciseToMove = _buildingWorkout.exercises.splice(currentIndex, 1)[0];
            _buildingWorkout.exercises.splice(toIndex, 0, exerciseToMove);
        };

        _service.save = function () {
            var workout = _newWorkout 
                ? WorkoutService.addWorkout(_buildingWorkout) 
                : WorkoutService.updateWorkout(_buildingWorkout);
            
            _newWorkout = false;
            
            return workout;
        };

        return _service;
    };
    
    workoutBuilder.factory('WorkoutBuilderService', [
        'Exercise', 
        'WorkoutPlan', 
        'WorkoutService', 
        workoutBuilderFactory
    ]);
}(this, this.angular, this.workoutBuilder);
