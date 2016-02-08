/// <reference path='../../test.spec.ts' />

describe('n3Charts.Factory.Series.Column', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var columnSeries: n3Charts.Factory.Series.Column = undefined;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();
    elem.append('svg');

    columnSeries = new n3Charts.Factory.Series.Column();
  });

  describe('createSeriesContainer', () => {
    var container: D3.Selection;

    beforeEach(() => {
        container = elem.select('svg');
        columnSeries.createContainer(container);
    });

    it('should create a <g> container', () => {
        var testing = columnSeries.svg[0][0].tagName;
        var expected = 'g';

        expect(testing).to.equal(expected);
    });

    it('should define a proper class', () => {
        var containerSuffix = n3Charts.Factory.Series.SeriesFactory.containerClassSuffix;

        var testing = columnSeries.svg[0][0].getAttribute('class');
        var expected = columnSeries.type + containerSuffix;

        expect(testing).to.equal(expected);
    });
  });
});
