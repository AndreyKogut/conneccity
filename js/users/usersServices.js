angular
  .module('users')
  .factory('getUsers', getUsers);

getUsers.$inject = ['$http'];

function getUsers($http) {
  return {
    get,
  };

  function get() {
    return $http({
      url: `${GOOGLE_IP}users?count=50`,
      method: 'GET',
    });
  }
}
