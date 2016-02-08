/// <reference path='../../test.spec.ts' />

describe('n3Charts.Factory.Series.Area', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var areaSeries: n3Charts.Factory.Series.Area = undefined;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();
    elem.append('svg');

    areaSeries = new n3Charts.Factory.Series.Area();
  });

  describe('createSeriesContainer', () => {
    var container: D3.Selection;

    beforeEach(() => {
        container = elem.select('svg');
        areaSeries.createContainer(container);
    });

    it('should create a <g> container', () => {
        var testing = areaSeries.svg[0][0].tagName;
        var expected = 'g';

        expect(testing).to.equal(expected);
    });

    it('should define a proper class', () => {
        var containerSuffix = n3Charts.Factory.Series.SeriesFactory.containerClassSuffix;

        var testing = areaSeries.svg[0][0].getAttribute('class');
        var expected = areaSeries.type + containerSuffix;

        expect(testing).to.equal(expected);
    });
  });
});
