app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider','OAuthProvider','OAuthTokenProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, OAuthProvider, OAuthTokenProvider) {
    
  $stateProvider
    .state('authorization', {
      url: "/signIn",
      templateUrl: "views/signin.html",
      controller: 'signInController'
    })
    .state('registration', {
      url: "/signUp",
      templateUrl: "views/signup.html",
      controller: 'signUpController'
    })
    .state('app', {
      url: '/',
      views: {
        '': {
          templateUrl: 'views/app.html',
          controller: 'appController'
        },
        'content@app': {
          templateUrl: 'views/map.html'
        }
      }
    })
    .state('app.profile', {
      url: 'profile',
      views: {
        'content@app': {
          templateUrl: 'views/userProfile.html',
          controller: 'signedUserProfile'
        }
      }
    })
    .state('app.users', {
      url: 'users',
      views: {
        'content@app': {
          templateUrl: 'views/users.html',
          controller: 'usersController'
        }
      }
    })
    .state('app.users.id', {
      url: '/{id:int}',
      views: {
        'content@app': {
          templateUrl: 'views/userProfile.html',
          controller: 'userProfileController'
        }
      }
    })
    .state('app.events', {
      url: 'events',
      views: {
        'content@app': {
          templateUrl: 'views/events.html',
          controller: 'eventsController'
        }
      }
    })
    .state('app.eventCreate', {
      url: 'createevent',
      views: {
        'content@app': {
          templateUrl: 'views/createEvent.html',
          controller: 'createEventController'
        }
      }
    })
    .state('app.eventEdit', {
      url: '{{id:int}/eventedit}',
      views: {
        'content@app': {
          templateUrl: 'views/createEvent.html',
          controller: 'createEventController'
        }
      }
    })
    .state('app.events.id', {
      url: '/{id:int}',
      views: {
        'content@app': {
          templateUrl: 'views/eventProfile.html',
          controller: 'eventProfileController'
        }
      }
    })
    .state('app.meetings', {
      url: 'meetings',
      views: {
        'content@app': {
          templateUrl: 'views/meetings.html',
          controller: 'meetingsController'
        }
      }
    })
    .state('app.meetingCreate', {
      url: 'create-meeting',
      views: {
        'content@app': {
          templateUrl: 'views/createMeeting.html',
          controller: 'createMeetingController'
        }
      }
    })
    .state('app.meetingEdit', {
      url: '{{id:int}/meeting-edit}',
      views: {
        'content@app': {
          templateUrl: 'views/createMeeting.html',
          controller: 'createMeetingController'
        }
      }
    })
    .state('app.meetings.id', {
      url: '/{id:int}',
      views: {
        'content@app': {
          templateUrl: 'views/meetingProfile.html',
          controller: 'meetingProfileController'
        }
      }
    })
    .state('app.chat', {
      url: 'chat',
      views: {
        'content@app': {
          templateUrl: 'views/chatList.html',
          controller: 'chatListController'
        }
      }
    })
    .state('app.chat.id', {
      url: '/{id:int}',
      views: {
        'chat@app.chat': {
          templateUrl: 'views/chat.html',
          controller: 'chatController'
        }
      }
    });

  $urlRouterProvider.otherwise("/");

  OAuthProvider.configure({
    baseUrl: GOOGLE_IP,
    clientId: 'clientapp',
    clientSecret: '123456',
    grantPath: '/oauth/token',
    revokePath: '/oauth/token'
  });

  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false
    }
  });
}]);

