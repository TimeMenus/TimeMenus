'use strict';
angular.module('directives', [])
        .directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="bckgrndloadgif" style="display: none">\n\
                        <div class="centerloadgif">\n\
                              <a href="#/"><img alt="" src="images/loadingGif.gif"></a>\n\
                        </div>\n\
                   </div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(".bckgrndloadgif").show();
                  else
                      $(".bckgrndloadgif").hide();
              });
        }
      }
  });