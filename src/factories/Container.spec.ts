/// <reference path='../test.spec.ts' />

describe('n3Charts.Factory.Container', () => {
  var elem: D3.Selection = d3.select(document.body).append('div');
  var container: n3Charts.Factory.Container = undefined;

  beforeEach(() => {
    // Truncate the elem
    elem.selectAll('*').remove();

    container = new n3Charts.Factory.Container(elem[0][0]);
  });

  describe('createRoot()', () => {

    it('should create a svg root node', () => {

      var rootNode: D3.Selection;

      container.createRoot();

      rootNode = elem.select('svg');

      expect(rootNode.attr('class')).to.equal('chart');
    });

    it('should provide a svg property', () => {

      var svgProp: D3.Selection;

      expect(container.svg).to.equal(undefined);

      container.createRoot();

      svgProp = container.svg;

      expect(svgProp.attr('class')).to.equal('chart');
    });

  });

  describe('createContainer()', () => {

    it('should create a vis container', () => {

      var visContainer: D3.Selection;

      container.createRoot();
      container.createContainer();

      visContainer = elem.select('g');

      expect(visContainer.attr('class')).to.equal('container');
    });

    it('should provide a vis property', () => {

      var visProp: D3.Selection;

      expect(container.vis).to.equal(undefined);

      container.createRoot();
      container.createContainer();

      visProp = container.vis;

      expect(visProp.attr('class')).to.equal('container');
    });

    it('should create an axes container', () => {

      var dataContainer: D3.Selection;

      container.createRoot();
      container.createContainer();

      dataContainer = elem.select('.container > g:nth-of-type(1)');

      expect(dataContainer.attr('class')).to.equal('axes');
    });

    it('should create a data container', () => {

      var dataContainer: D3.Selection;

      container.createRoot();
      container.createContainer();

      dataContainer = elem.select('.container > g:nth-of-type(2)');

      expect(dataContainer.attr('class')).to.equal('data');
    });

    it('should provide a data property', () => {

      var dataProp: D3.Selection;

      expect(container.data).to.equal(undefined);

      container.createRoot();
      container.createContainer();

      dataProp = container.data;

      expect(dataProp.attr('class')).to.equal('data');
    });

  });
});
