function HeroListController($scope, $element, $attrs, heroFactory) {
    var ctrl = this;
    ctrl.list = heroFactory.getHeros().query(
            function (response) {
                ctrl.list = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
    );

    ctrl.updateHero = function (hero, prop, value) {
        hero[prop] = value;
    };

    ctrl.deleteHero = function (hero) {
        var idx = ctrl.list.indexOf(hero);
        if (idx >= 0) {
            ctrl.list.splice(idx, 1);
        }
    };
}

function HeroDetailController(baseURL) {
    var ctrl = this;

    ctrl.baseURL = baseURL;

    ctrl.delete = function () {
        ctrl.onDelete({hero: ctrl.hero});
    }

    ctrl.update = function (prop, value) {
        ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
    }
}

function EditableFieldController() {
    var ctrl = this;
    ctrl.editMode = false;

    ctrl.handleModeChange = function () {
        if (ctrl.editMode) {
            ctrl.onUpdate({value: ctrl.fieldValue});
            ctrl.fieldValueCopy = ctrl.fieldValue;
        }
        ctrl.editMode = !ctrl.editMode;
    };

    ctrl.reset = function () {
        ctrl.fieldValue = ctrl.fieldValueCopy;
    };

    ctrl.$onInit = function () {
        // Make a copy of the initial value to be able to reset it later
        ctrl.fieldValueCopy = ctrl.fieldValue;

        // Set a default fieldType
        if (!ctrl.fieldType) {
            ctrl.fieldType = 'text';
        }
    };
}

function heroFactory($resource, baseURL) {
    var heroFac = {};
    heroFac.getHeros = function () {
        return $resource(baseURL + "heros/:id", null, {'update': {method: 'PUT'}});
    }
    return heroFac;
}

angular.module('my-heros', [])
        // should be overridden within application's main module to provide app-specific service
        .constant("baseURL", "http://localhost:3000/")
        .factory('heroFactory', heroFactory)
        .component('heroList', {
            templateUrl: '../bower_components/hero-component/views/heroList.html',
            controller: HeroListController
        })
        .component('heroDetail', {
            templateUrl: '../bower_components/hero-component/views/heroDetails.html',
            controller: HeroDetailController,
            bindings: {
                hero: '<',
                onDelete: '&',
                onUpdate: '&'
            }
        })
        .component('editableField', {
            templateUrl: '../bower_components/hero-component/views/editableField.html',
            controller: EditableFieldController,
            bindings: {
                fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
            }
        })
;
