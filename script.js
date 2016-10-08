var app = angular.module('nice', ['nvd3', 'gridster', 'nice.services']);

app
.controller('MainCtrl', function($scope, $timeout, DataService) {
  $scope.gridsterOptions = {
		margins: [20, 20],
		columns: 8,
		mobileModeEnabled: false,
		draggable: {
			handle: 'h3'
		},
		resizable: {
     enabled: true,
     handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

     // optional callback fired when resize is started
     start: function(event, $element, widget) {},

     // optional callback fired when item is resized,
     resize: function(event, $element, widget) {
       if (widget.chart.api) widget.chart.api.update();
     },

      // optional callback fired when item is finished resizing
     stop: function(event, $element, widget) {
       $timeout(function(){
         if (widget.chart.api) widget.chart.api.update();
       },400)
     }
    },
	};

	// $scope.dashboard = {
	// 	widgets: []
	// };

	$scope.dashboard = {
		widgets: [ {
			col: 0,
			row: 0,
			sizeY: 3,
			sizeX: 6,
			name: "Stacked Area Chart Widget",
			type: 'stackedAreaChart',
			chart: {
				options: DataService.stackedAreaChart.options(),
				data: DataService.stackedAreaChart.data(),
				api: {}
			}
		},
		{
		 	col: 7,
		 	row: 0,
		 	sizeY: 3,
		 	sizeX: 2,
		 	name: "Pie Chart Widget",
		 	type: 'pieChart',
		 	chart: {
		 		options: DataService.pieChart.options(),
		 		data: DataService.pieChart.data(),
		 		api: {}
		 	}
		},
		{
			col: 0,
			row: 3,
			sizeY: 2,
			sizeX: 3,
			name: "Spring Campign",
			chart: {
			  options: DataService.discreteBarChart.options(),
			  data: DataService.discreteBarChart.data(),
			  api: {}
			}
		},
		{
			col: 3,
			row: 3,
			sizeY: 2,
			sizeX: 3,
			name: "Line Chart",
			chart: {
			  options: DataService.lineChart.options(),
			  data: DataService.lineChart.data(),
			  api: {}
			}
		}
	]
	};

  // We want to manually handle `window.resize` event in each directive.
  // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
  // Define event handler
  $scope.events = {
    resize: function(e, scope){
      $timeout(function(){
        scope.api.update()
      },200)
    }
  };
  angular.element(window).on('resize', function(e){
    $scope.$broadcast('resize');
  });



	// grid manipulation ========================================================
	// $scope.clear = function() {
	// 	$scope.dashboard.widgets = [];
	// };

	$scope.addWidget = function() {
		$scope.dashboard.widgets.push({
			name: "New DE Chart",
			sizeX: 2,
			sizeY: 2
		});
	};
	//  ========================================================



  // We want to hide the charts until the grid will be created and all widths and heights will be defined.
  // So that use `visible` property in config attribute
  $scope.config = {
    visible: false
  };

  $timeout(function(){
    $scope.config.visible = true;
  }, 200);


});
