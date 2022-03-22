import React, { Component } from "react";
import * as d3 from "d3";

import { points } from "./points";

const WIDTH = 500;
const HEIGHT = 400;

/**
 * https://d3-graph-gallery.com/graph/line_basic.html
 */

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    svg
      .append("path")
      .datum(this.points)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", this.chartLine);
  }

  get points() {
    return points.map((t) => ({
      ...t,
      timestamp: new Date(t.timestamp),
    }));
  }

  get chartLine() {
    const xExtent = d3.extent(this.points, (p) => p.timestamp);
    const xScale = d3.scaleTime().domain(xExtent).range([0, WIDTH]);

    const yExtent = d3.extent(this.points, (p) => p.price);
    const yScale = d3.scaleLinear().domain(yExtent).range([0, HEIGHT]);

    const path = d3
      .line()
      .x((d) => xScale(d.timestamp))
      .y((d) => yScale(d.price));

    return path;
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default LineChart;
