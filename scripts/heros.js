function HeroListController($scope, $element, $attrs) {
    var ctrl = this;

    // This would be loaded by $http etc.
    ctrl.list = [
        {
            name: 'Superman',
            location: 'Krypton',
            universe: 'DC'
        },
        {
            name: 'Batman',
            location: 'Wayne Manor',
            universe: 'DC'
        },
        {
            name: 'Captain Amarica',
            location: 'US',
            universe: 'Marvel'
        }
    ];

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

function HeroDetailController() {
    var ctrl = this;

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

angular.module('my-heros', [])
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
