/**
 * A Backbone view for displaying a d3 chart of food history.
 */
'use strict';
var d3 = require('d3');
var days = require('../collections/days');
var util = require('../lib/util.js');
var authController = require('../controllers/auth.js');
var ChartView = Backbone.View.extend({
    el: '#chart',

    events: {
        'click #chart-cancel': 'close',
    },

    initialize: function() {
        this.$container = this.$('#chart-container');
        this.collection = days;
        this.listenTo(this.collection, 'update', this.render);

        // Make responsive.
        $(window).on('resize', this.render.bind(this));

        this.render();
    },

    render: function() {
        this.$container.empty();
        var chart = d3.select(this.$container.get(0));

        var margin = {top: 0, right: 65, bottom: 35, left: 0};
        var height = parseFloat(chart.style('height')) - margin.top - margin.bottom;
        var width = parseFloat(chart.style('width')) - margin.left - margin.right;

        // Set minimum to 100 if no data.
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

        // y-axis d3 scale.
        var yScale = d3.scaleLinear()
            .domain([yMax * 1.5, 0])
            .range([0, height]);
        var yAxis = d3.axisRight(yScale);

        // Calculate days range for x-axis.
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

        // SVG element containing scrolling elements.
        var scrollGrp = chart.append('svg')
            .attr('width', width)
            .attr('height', height + margin.bottom + margin.top)
            .append('g');

        /*
         * Scrolling controller.
         */
        // Variables to handle offsets from scrolling outside bounds.
        var previousXPos = 0;
        var previousXTrans = 0;
        var zoom = d3.zoom()
            .on('zoom', function() {
                var transform = d3.event.transform;
                var x = previousXPos + (transform.x - previousXTrans);
                // Bound scrolling area to limits of the axis.
                if (x < 0) {
                    x = 0;
                } else if (x > xScaleWidth-width) {
                    x = xScaleWidth-width;
                }
                scrollGrp.attr('transform', 'translate(' + x + ',' + 0 + ')');
                previousXTrans = transform.x;
                previousXPos = x;
            });

        // Add scroller to chart.
        chart.call(zoom);

        // Background box for chart.
        scrollGrp.append('rect')
            .classed('chart-rect', true)
            .attr('width', xScaleWidth)
            .attr('height', height)
            .attr('transform', 'translate(' + (width-xScaleWidth) + ',' + (0) + ')');

        // Add y-axis.
        var yAxisEle = chart.append('svg')
            .attr('width', margin.right)
            .attr('height', height + margin.top + margin.bottom);
        yAxisEle.append('g')
                .attr('class', 'axis')
                .attr('height', height + margin.top + margin.bottom)
                .attr('width', margin.right)
                .call(yAxis);
        yAxisEle.append('text')
            .classed('chart__axis--label', true)
            .attr('dx', '-120')
            .attr('dy', '55')
            .attr('transform', 'rotate(-90)')
            .text('Total Calories');

        // Add x-axis.
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

        // Add columns.
        var colWidth = 10;
        scrollGrp.selectAll('rect.chart__col')
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
                // Y scale is reversed, to translate down from top by differnce
                // between area height and bar height.
                var horizOffset = width - xScaleWidth - colWidth/2;
                var vertOffset = height + margin.top - (height - yScale(d.getTotalCalories()));
                return 'translate(' + horizOffset + ',' +  vertOffset + ')';
            });
    },

    close: function() {
        this.trigger('close');
    }
});

module.exports = ChartView;
