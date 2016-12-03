angular.module('app')

.controller('DashboardCtrl', ['$scope', '$timeout',
	function($scope, $timeout) {
		$scope.gridsterOptions = {
			margins: [2, 2],
			columns: 100,
			minSizeX: 10, // minimum column width of an item
			minSizeY: 5, // minumum row height of an item
			outerMargin: false,
			pushing: false,
			floating: false,
			draggable: {
				handle: 'arrastrar'
			}
		};

		
		$scope.dashboards = {
			'1': {
				id: '1',
				name: 'Home',
				widgets: [/*{
					col: 0,
					row: 10,
					sizeY: 0,
					sizeX: 0,
					type: 'default',
				    name: 'Default'
				},
				{
					col: 0,
					row: 0,
					sizeY: 8,
					sizeX: 21,
					type: 'title',
				    name: 'Titulo'
				}*/]
			}
		};
		
		$scope.max_row = function(){
			

			 $scope.i = 0;
			angular.forEach($scope.dashboards, function(value, key) {
				
				angular.forEach(value.widgets, function(value2, key2) {
					
					if ((value2.row + value2.sizeY ) > $scope.i){
						
						$scope.i = (value2.row + value2.sizeY+2);
					}

				});
				
			});
			console.log($scope.i);

			
			return $scope.i;
		};

		$scope.clear = function() {
			$scope.dashboard.widgets = [];
		};

		$scope.addWidget = function() {
			$scope.dashboard.widgets.push({
				col: 0,
				row: $scope.max_row(),
				sizeY: 0,
				sizeX: 0,
				type: 'default',
			    name: 'Vacio'
			});
		};
		
		$scope.addWidgetTitulo = function() {
			console.log('titulo');
			$scope.dashboard.widgets.push({
			    col: 0,
				row: $scope.max_row(),
				sizeY: 8,
				sizeX: 21,
				type: 'title',
				name: "Titulo",
			});
		};
		
		$scope.addWidgetAkeela = function() {
			console.log('titulo');
			$scope.dashboard.widgets.push({
			    col: 0,
				row: $scope.max_row(),
				sizeY: 8,
				sizeX: 21,
				type: 'akeelaElement',
				name: "Akeela",
			});
		};

		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.dashboard = $scope.dashboards[newVal];
			} else {
				$scope.dashboard = $scope.dashboards[1];
			}
		});

		// init dashboard
		$scope.selectedDashboardId = '1';

	}
])

.controller('CustomWidgetCtrl', ['$scope', '$modal',
	function($scope, $modal) {

		$scope.remove = function(widget) {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
		};

		$scope.openSettings = function(widget) {
			$modal.open({
				scope: $scope,
				templateUrl: 'demo/dashboard/widget_settings.html',
				controller: 'WidgetSettingsCtrl',
				resolve: {
					widget: function() {
						return widget;
					}
				}
			});
		};

	}
])

.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
	function($scope, $timeout, $rootScope, $modalInstance, widget) {
		$scope.widget = widget;

		$scope.form = {
			name: widget.name,
			sizeX: widget.sizeX,
			sizeY: widget.sizeY,
			col: widget.col,
			row: widget.row
		};

		$scope.sizeOptions = [{
			id: '1',
			name: '1'
		}, {
			id: '2',
			name: '2'
		}, {
			id: '3',
			name: '3'
		}, {
			id: '4',
			name: '4'
		}];

		$scope.dismiss = function() {
			$modalInstance.dismiss();
		};

		$scope.remove = function() {
			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
			$modalInstance.close();
		};

		$scope.submit = function() {
			angular.extend(widget, $scope.form);

			$modalInstance.close(widget);
		};

	}
])

// helper code
.filter('object2Array', function() {
	return function(input) {
		var out = [];
		for (i in input) {
			out.push(input[i]);
		}
		return out;
	}
});
