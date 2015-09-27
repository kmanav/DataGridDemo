var app = angular.module('task', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);
 
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/nodes.html',
        controller: 'ListCtrl'
    }).when('/', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
    }).when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl'
    }).when('/load', {
        templateUrl: 'views/load.html',
        controller: 'CreateCtrl'
    }).when('/remove', {
        templateUrl: 'views/remove.html',
        controller: 'CreateCtrl'
    }).when('/search', {
        templateUrl: 'views/search.html',
        controller: 'CreateCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
 
app.controller('ListCtrl', function ($scope, $http) {
    $http.get('/mytodo/rest/tasks').success(function (data) {
        $scope.tasks = data;
    }).error(function (data, status) {
        console.log('Error ' + data);
    });
 
    $scope.taskStatusChanged = function (task) {
        console.log(task);
        if(task.done)
        	task.completedOn = new Date();
        else
        	task.completedOn = null;
        $http.put('/mytodo/rest/tasks/' + task.id, task).success(function (data) {
            console.log('status changed');
        }).error(function (data, status) {
            console.log('Error ' + data);
        });
    };

    $scope.getNode1Entries = function () {     
    	  var res = $http.get($scope.urinode1+'/jolokia/read/jboss.infinispan:type=Cache,name="demoSergio(dist_sync)",manager="clustered",component=Statistics');
          res.success(function(data) {
         	 $scope.node1Rdo = data;
          });
            res.error(function(data) {
             alert( "Impossible to reach node 1");
             $scope.node1Rdo = "not alive";
           });  
          
      	  var res = $http.get($scope.urinode2+'/jolokia/read/jboss.infinispan:type=Cache,name="demoSergio(dist_sync)",manager="clustered",component=Statistics');
          res.success(function(data) {
         	 $scope.node2Rdo = data;
          });
            res.error(function(data) {
             alert( "Impossible to reach node 2");
             $scope.node2Rdo = "not alive";
           });  
      	  var res = $http.get($scope.urinode3+'/jolokia/read/jboss.infinispan:type=Cache,name="demoSergio(dist_sync)",manager="clustered",component=Statistics');
          res.success(function(data) {
         	 $scope.node3Rdo = data;          	 
          });
            res.error(function(data) {
             alert( "Impossible to reach node 3");
             $scope.node3Rdo = "not alive";
           });  

            
            

     };

    

});
 
app.controller('CreateCtrl', function ($scope, $http, $location) {
    $scope.task = {
        done: false
    };
 
    $scope.createTask = function () {
        console.log($scope.task);
        $http.post('/mytodo/rest/tasks', $scope.task).success(function (data) {
            $location.path('/');
        }).error(function (data, status) {
            console.log('Error ' + data);
        });
        
        
    };
    $scope.loadTasks = function () {
        console.log($scope.task);
        $http.post('/mytodo/rest/loadtasks', $scope.quantity).success(function (data) {
            $location.path('/');
            console.log('Loading tasks');
        }).error(function (data, status) {
            console.log('Error ' + data);
        });
    };
    
    $scope.removeTasks = function () {
        console.log($scope.task);
        $http.post('/mytodo/rest/remove', $scope.task).success(function (data) {
            $location.path('/');
            console.log('Removing tasks');
        }).error(function (data, status) {
            console.log('Error ' + data);
        });
    };
    
    $scope.searchTasks = function () {
        console.log($scope.task);
        var dataObj = {
        	    filter : true,
        	    keyword : $scope.keyword        	   
        	}; 
        
        var res = $http.get('/mytodo/rest/search/true/'+$scope.keyword, dataObj);
        res.success(function(data) {
        	 $scope.tasks = data;               
        });
          res.error(function(data) {
           alert( "failure message: " + JSON.stringify({data: data}));
         });  
        
       };

   
          
    
});
