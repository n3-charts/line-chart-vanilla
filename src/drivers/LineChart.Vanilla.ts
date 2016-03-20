/// <reference path='../../typings/jquery/jquery.d.ts' />
/// <reference path='../../typings/d3/d3.d.ts' />

/// <reference path='../options/_index.ts' />
/// <reference path='../utils/_index.ts' />
/// <reference path='../factories/_index.ts' />
/// <reference path='../svg/_index.ts' />

module n3Charts {
  'use strict';

  export class LineChart {

    // public styles;
    // public hoveredCoordinates;
    // public elementDimensions;

    private data;
    private options;
    private element: D3.Selection;
    private eventMgr = new Utils.EventManager();
    private factoryMgr = new Utils.FactoryManager();

    constructor(selector: EventTarget, options?: any, data?: any) {
      this.element = d3.select(selector);
      this
        .setData(data)
        .setOptions(options)
        .init(this.element, this.element[0][0].attributes);
    };

    setData = (data: any): LineChart => {
        this.data = new Utils.Data(Utils.copy(data));
        return this;
    };

    setOptions = (options: any): LineChart => {
        this.options = new Options.Options(Utils.copy(options));
        return this;
    };

    update = () => {
      // Update the eventMgr itself
      this.eventMgr.update(this.data, this.options);

      // Trigger the update event
      this.eventMgr.trigger('update', this.data, this.options);
    };

    init = (element: D3.Selection, attributes: any) => {
      // Initialize global events
      this.eventMgr.init(Utils.EventManager.EVENTS);

      // Register all factories
      // Note: we can apply additional arguments to each factory
      this.factoryMgr.registerMany([
        ['container', Factory.Container, element[0][0]],
        ['tooltip', Factory.Tooltip, element[0][0]],
        ['legend', Factory.Legend, element[0][0]],
        ['transitions', Factory.Transition],
        ['x-axis', Factory.Axis, Options.AxisOptions.SIDE.X],
        ['x2-axis', Factory.Axis, Options.AxisOptions.SIDE.X2],
        ['y-axis', Factory.Axis, Options.AxisOptions.SIDE.Y],
        ['y2-axis', Factory.Axis, Options.AxisOptions.SIDE.Y2],
        ['grid', Factory.Grid],
        ['pan', Factory.Pan],
        ['zoom', Factory.Zoom],

        // This order is important, otherwise it can mess up with the tooltip
        // (and you don't want to mess up with a tooltip, trust me).
        ['series-area', Factory.Series.Area],
        ['series-column', Factory.Series.Column],
        ['series-line', Factory.Series.Line],
        ['series-dot', Factory.Series.Dot]
      ]);

      // Initialize all factories
      this.factoryMgr.all().forEach((f) => f.instance.init(f.key, this.eventMgr, this.factoryMgr));

      // Trigger the create event
      this.eventMgr.trigger('create', new Options.Options(Utils.copy(this.options)));

      this.eventMgr.on('legend-click.directive', (series) => {
        var foundSeries = this.options.series.filter((s) => s.id === series.id)[0];
        foundSeries.visible = series.getToggledVisibility();
      });

      var elementDimensions = {};

      var debounce = (callback, interval) => {
        return (...args) => {
            setTimeout(() => {
                callback.apply(this, args);
            }, interval);
        };
      };

      var resizeCb = debounce((event: UIEvent) => {
        this.eventMgr.trigger('resize', element[0][0].parentElement);
      }, 50);

      d3.select(window).on(<any>'resize', resizeCb);

    //   // Trigger the destroy event
    //   scope.$on('$destroy', () => {
    //     eventMgr.trigger('destroy');
    //     angular.element(this.$window).off('resize', resizeCb);
    //   });
    };
  }
}
