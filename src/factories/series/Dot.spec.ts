/// <reference path='../../test.spec.ts' />

describe('n3Charts.Factory.Series.Dot', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var dotSeries: n3Charts.Factory.Series.Dot;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();
    elem.append('svg');

    dotSeries = new n3Charts.Factory.Series.Dot();
  });

  describe('createSeriesContainer', () => {
    var container: D3.Selection;

    beforeEach(() => {
      container = elem.select('svg');
      dotSeries.createContainer(container);
    });

    it('should create a <g> container', () => {
      var testing = dotSeries.svg[0][0].tagName;
      var expected = 'g';

      expect(testing).to.equal(expected);
    });

    it('should define a proper class', () => {
        var containerSuffix = n3Charts.Factory.Series.SeriesFactory.containerClassSuffix;

        var testing = dotSeries.svg[0][0].getAttribute('class');
        var expected = dotSeries.type + containerSuffix;

        expect(testing).to.equal(expected);
    });
  });
});
