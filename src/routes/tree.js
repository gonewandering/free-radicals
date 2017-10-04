require('styles/routes/tree.scss');

import React from 'react';
import Reflux from 'reflux';
import $ from 'jquery';

import Box from '../components/Box';

class AppComponent extends Reflux.Component {

  constructor(props) {
    super(props);

    this.state = {
      tree: {},
      summary: {}
    }
  }

  createTree() {
    var data = Object.values(this.state.tree);

    if (data.length == 0) { return; }

    // ************** Generate the tree diagram	 *****************
    var margin = {top: 20, right: 120, bottom: 20, left: 120},
    	width = window.innerWidth - margin.right - margin.left,
    	height = window.innerHeight - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree()
    	.size([height, width]);

    var diagonal = d3.svg.diagonal()
    	.projection(function(d) { return [d.y, d.x]; });

    d3.select('.Chart svg').remove();

    var svg = d3.select('.Chart').append('svg')
    	.attr('width', width + margin.right + margin.left)
    	.attr('height', height + margin.top + margin.bottom)
      .append('g')
    	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var root = data[0];

    update(root);

    function getStats(d) {
      var s = {
        total: d3.values(d.invites).length,
        sent: d3.values(d.invites).filter(inv => { return !!inv.sent; }).length,
        confirmed: d3.values(d.invites).filter(inv=> { return !!inv.confirmed; }).length
      }

      return 'Tot: ' + s.total + ' Sent: ' + s.sent + ' Conf: ' + s.confirmed;
    }

    function update(source) {

      // Compute the new tree layout.
      var nodes = tree.nodes(source).reverse(),
    	  links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Declare the nodes…
      var node = svg.selectAll('g.node')
    	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter the nodes.
      var nodeEnter = node.enter().append('g')
    	  .attr('class', 'node')
    	  .attr('transform', function(d) {
    		  return 'translate(' + d.y + ',' + d.x + ')'; });

      nodeEnter.append('circle')
    	  .attr('r', 10);

      nodeEnter.append('text')
    	  .attr('x', function(d) {
    		  return d.children || d._children ? -13 : 13; })
    	  .attr('dy', '.35em')
    	  .attr('text-anchor', function(d) {
    		  return d.children || d._children ? 'end' : 'start'; })
    	  .text(function(d) { return d.firstName + ' ' + d.lastName; });

        nodeEnter.append('text')
          .attr('class', 'sub-label')
      	  .attr('x', function(d) {
      		  return d.children || d._children ? -13 : 13; })
      	  .attr('dy', '1.7em')
      	  .attr('text-anchor', function(d) {
      		  return d.children || d._children ? 'end' : 'start'; })
      	  .text(getStats);

      // Declare the links…
      var link = svg.selectAll('path.link')
    	  .data(links, function(d) { return d.target.id; });

      // Enter the links.
      link.enter().insert('path', 'g')
    	  .attr('class', 'link')
    	  .attr('d', diagonal);
    }
  }

  componentDidMount() {
    const self = this;

    $.get('https://us-central1-free-radicals-4ca3a.cloudfunctions.net/tree').then((data) => {
      self.setState(data);
    });
  }

  componentDidUpdate() {
    this.createTree.bind(this)();
  }

  render() {
    return (
      <div className="Tree">
        <div className="Chart" />
        <div className="summary">
          <div className="row">
            <div className="col-sm-3 col-xs-6">
              <h1>{ this.state.summary.total || 0 }</h1>
              <h3>Total</h3>
            </div>
            <div className="col-sm-3 col-xs-6">
              <h1>{ this.state.summary.confirmed || 0 }</h1>
              <h3>Confirmed</h3>
            </div>
            <div className="col-sm-3 col-xs-6">
              <h1>{ this.state.summary.sent || 0 }</h1>
              <h3>Sent</h3>
            </div>
            <div className="col-sm-3 col-xs-6">
              <h1>{ this.state.summary.available || 0 }</h1>
              <h3>Available</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppComponent;
