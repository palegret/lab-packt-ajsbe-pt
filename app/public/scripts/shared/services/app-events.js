+function (window, angular, app) {
    'use strict';
    
    app.value('appEvents', {
        workout: { 
            exerciseStarted: 'event:workout:exerciseStarted'
        }
    });
}(this, this.angular, this.app);
