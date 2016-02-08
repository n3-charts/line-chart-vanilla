/// <reference path='../../test.spec.ts' />

describe('n3Charts.Factory.Series.Line', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var lineSeries: n3Charts.Factory.Series.Line = undefined;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();
    elem.append('svg');

    lineSeries = new n3Charts.Factory.Series.Line();
  });

  describe('createSeriesContainer', () => {
    var container: D3.Selection;

    beforeEach(() => {
        container = elem.select('svg');
        lineSeries.createContainer(container);
    });

    it('should create a <g> container', () => {
        var testing = lineSeries.svg[0][0].tagName;
        var expected = 'g';

        expect(testing).to.equal(expected);
    });

    it('should define a proper class', () => {
        var containerSuffix = n3Charts.Factory.Series.SeriesFactory.containerClassSuffix;

        var testing = lineSeries.svg[0][0].getAttribute('class');
        var expected = lineSeries.type + containerSuffix;

        expect(testing).to.equal(expected);
    });
  });
});
