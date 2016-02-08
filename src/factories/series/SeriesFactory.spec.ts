/// <reference path='../../test.spec.ts' />

describe('n3Charts.Factory.Series.SeriesFactory', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var seriesFactory: n3Charts.Factory.Series.SeriesFactory = undefined;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();
    elem.append('svg');

    seriesFactory = new n3Charts.Factory.Series.SeriesFactory();
  });

  describe('createContainer()', () => {

    it('should create a svg container', () => {

      var dataContainer: D3.Selection;
      var parentContainer = elem.select('svg');

      seriesFactory.createContainer(parentContainer);
      dataContainer = elem.select('g');

      expect(dataContainer).not.to.equal(undefined);
      expect(dataContainer[0][0].tagName).to.equal('g');
    });

    it('should provide a svg property', () => {

      var parentContainer = elem.select('svg');
      var svgProp: SVGElement = undefined;

      expect(seriesFactory.svg).to.equal(undefined);

      seriesFactory.createContainer(parentContainer);

      expect(seriesFactory.svg[0][0]).to.not.equal(undefined);
      expect(seriesFactory.svg[0][0].tagName).to.equal('g');
    });
  });
});
