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
    .component('slideShowImage', {
        bindings: {
            pic: '='
        },
        templateUrl: 'slide-show/views/slide-show-image.html'
    })
    .component('slideShowPreviews', {
        bindings: {
            pics: '=',
            current: '='
        },
        controller: function () {
            this.percent = 100 / this.pics.length;
            this.isCurrent = function(_ind) {
                return parseInt(this.current) === parseInt(_ind+1);
            };
            this.setCurrent = function(_ind) {
                this.current = parseInt(_ind+1);
            };
        },
        templateUrl: 'slide-show/views/slide-show-previews.html'
    })
    .component('slideShowPreview', {
        bindings: {
            pic: '='
        },
        templateUrl: 'slide-show/views/slide-show-preview.html'
    })
    .component('slideShowControl', {
        bindings: {
            current: '=',
            maximum: '='
        },
        controller: function () {
            console.log('maximum : ',this.maximum);
        },
        templateUrl: 'slide-show/views/slide-show-control.html'
    });

document.addEventListener('DOMContentLoaded', function () {
    angular.bootstrap(document, ['SlideShow']);
});