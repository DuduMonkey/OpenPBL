app.directive('pageFooter', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/shared/pageFooter/pageFooter.html',
    link: function () {
      console.log('uou');
    }
  }
});
