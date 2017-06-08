var ChatBotApp = angular.module('ChatBotApp',
    [function() {}]
);

ChatBotApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);