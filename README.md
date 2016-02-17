Angular 1.5 components reviewed
====================

Angular 1.5 finally is in stable.

I would like to review one of his core features : Components.

Components, also known as 'Web Components', are a main part (if not to say the main part) of Angular 2. They are an encapsulated module which contains the logic (controller) and the view (template) - they are like directives.

I created a simple app using Angular 1.5 components

Github : https://github.com/marek1/angular-1-5-slide-show
DEMO : http://marek-sonnabend.de/demos/angular-1-5-slide-show

Using the ControllerAs syntax I create a controller (SlideShowCtrl) :

JS :

    angular
    .module('SlideShow', [])
    .controller('SlideShowCtrl', function AlbumCtrl() {
        this.pics = [];
        this.current = 1;
        var nameOfPicFolder = 'slide-show/images';
        var noOfPics = 17;
        var counter = 1;
        while (counter <= noOfPics) {
            this.pics.push(nameOfPicFolder+'/Bild_'+counter+'_sm.JPG');
            counter++;
        }
    })

HTML :

    <div ng-controller="SlideShowCtrl as slideShow">
        <slide-show-control class="control" current="slideShow.current"></slide-show-control>
        <slide-show-images pics="slideShow.pics" current="slideShow.current"></slide-show-images>
        <slide-show-previews pics="slideShow.pics" current="slideShow.current"></slide-show-previews>
    </div>

The *this* variables (in the controller) are referenced by *slideshow* in the template and can be passed to the components, i.e. *current* (which keeps track of the current selected picture).

I can access the variable (*current*) in the component using *bindings*

    .component('slideShowControl', {
        bindings: {
            current: '='
        },
        templateUrl: 'slide-show/views/slide-show-control.html'
    });

There are two kind of bindings :

    bindings: {
	    oneWay: '<',
	    twoWay: '='
    }

Instead of using the *templateUrl* I could also use *template*.

I can use *controller* to define further local properties and/or methods, i.e.

JS :

    .component('slideShowImages', {
        bindings: {
            pics: '=',
            current: '='
        },
        controller: function () {
            this.isCurrent = function(_ind) {
                return parseInt(this.current) === parseInt(_ind+1);
            }
        },
        templateUrl: 'slide-show/views/slide-show-images.html'
    })


HTML :

    <div ng-repeat="pic in $ctrl.pics">
        <slide-show-image pic="pic" class="full-image" ng-class="{ 'active' : $ctrl.isCurrent($index) }"></slide-show-image>
    </div>

Any (component) controller variables are accessed through *$ctrl*.

A component can contain another component, and you can inherit the parents properties and methods through *require*. Read about it : https://toddmotto.com/directive-to-directive-communication-with-require/

