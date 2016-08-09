'use strict';
var d3 = require('d3');
var authController = require('../auth.js');
var days = require('../collections/days');
var util = require('../util.js');
var chartTemplate = require('../../templates/chart.html');
var ChartView = Backbone.View.extend({
    id: 'chart',
    className: 'chart',

    events: {
        'click': 'close',
    },

    template: chartTemplate,

    initialize: function() {
        this.collection = days;
    },

    update: function() {
        this.$container.empty();

        var chart = d3.select(this.$container.get(0));

        var margin = {top: 0, right: 50, bottom: 35, left: 0};
        var height = parseFloat(chart.style('height')) - margin.top - margin.bottom;
        var width = parseFloat(chart.style('width')) - margin.left - margin.right;

        var yMax;
        if (this.collection.isEmpty()) {
            yMax = 100;
        } else {
            yMax = _.max(this.collection.models, function(model) {
                return model.getTotalCalories();
            }).getTotalCalories();
        }
        if (yMax === 0) {
            yMax = 100;
        }

        var yScale = d3.scaleLinear()
            .domain([yMax * 1.5, 0])
            .range([0, height]);
        var yAxis = d3.axisRight(yScale);

        var firstTime = new Date(this.collection.first().get('date'));
        firstTime.setHours(12);
        var lastTime = new Date(this.collection.last().get('date'));
        lastTime.setHours(-12);
        var totalDays = (firstTime - lastTime)/(24*60*60*1000);
        var xScaleWidth = (width/31)*totalDays;
        var xScale = d3.scaleTime()
            .domain([firstTime, lastTime])
            .range([xScaleWidth, 0]);
        var xAxis = d3.axisBottom(xScale);
        xAxis.tickFormat(d3.timeFormat('%e-%b'))
            .ticks(d3.timeDay, 1)
            .tickSize(-height*1.5);

        var scrollGrp = chart.append('svg')
            .attr('width', width)
            .attr('height', height + margin.bottom + margin.top)
            .append('g');

        var previousXPos = 0;
        var previousXTrans = 0;
        var zoom = d3.zoom()
            .on('zoom', function() {
                var transform = d3.event.transform;
                var x = previousXPos + (transform.x - previousXTrans);
                if (x < 0) {
                    x = 0;
                } else if (x > xScaleWidth-width) {
                    x = xScaleWidth-width;
                }
                scrollGrp.attr('transform', 'translate(' + x + ',' + 0 + ')');
                previousXTrans = transform.x;
                previousXPos = x;
            });

        chart.call(zoom);

        scrollGrp.append('rect')
            .classed('chart-rect', true)
            .attr('width', xScaleWidth)
            .attr('height', height)
            .attr('transform', 'translate(' + (width-xScaleWidth) + ',' + (0) + ')');

        var yAxisEle = chart.append('svg')
            .attr('width', margin.right)
            .attr('height', height + margin.top + margin.bottom);
        yAxisEle.append('g')
                .attr('class', 'axis')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', margin.right)
                .call(yAxis);
        yAxisEle.append('text')
            .attr('dx', '-150')
            .attr('dy', '40')
            .attr('transform', 'rotate(-90)')
            .text('Total Calories');

        var tickWidth = (width + margin.left) / 31;
        var axisWidth = tickWidth * (firstTime - lastTime)/(60*60*24*1000);
        scrollGrp.append('g')
            .attr('class', 'axis')
            .attr('width', axisWidth)
            .attr('height', margin.bottom)
            .attr('transform', 'translate(' + (width-xScaleWidth) + ', ' + (margin.top+height) + ')')
            .call(xAxis)
        .selectAll('text')
            .attr('dy', '0.2em')
            .attr('dx', '-2em')
            .attr('transform', 'rotate(-70)');

        var colWidth = 10;
        scrollGrp.selectAll('rect')
            .data(this.collection.models)
            .enter()
            .append('rect')
            .classed('chart__col', true)
            .attr('x', function(d) {
                return xScale(d.get('date')) + 'px';
            })
            .attr('height', function(d) {
                // Y scale is reversed, so have to subtract from hieght to get
                // positive value for bar height.
                return height - yScale(d.getTotalCalories()) + 'px';
            })
            .attr('width', colWidth + 'px')
            .attr('transform', function(d) {
                // Y scale is revesed, to translate down from top by differnce
                // between area height and bar height.
                return 'translate(' + (width-xScaleWidth-colWidth/2) + ',' +  (height+margin.top-(height-yScale(d.getTotalCalories()))) + ')';
            })
            ;
    },

    // TODO: Call this render and do it in appview & make render update or something
    render: function() {
        this.$el.html(this.template());
        this.$container = this.$('#chart-container');

        this.listenTo(this.collection, 'add', this.update);
        this.update();

        return this.$el;
    },

    close: function() {
        this.trigger('close');
    }
});

module.exports = ChartView;
