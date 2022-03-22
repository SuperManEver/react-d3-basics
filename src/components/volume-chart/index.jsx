import React, { Component } from "react";
import * as d3 from "d3";

import { points } from "./points";

const WIDTH = 650;
const HEIGHT = 400;

class VolumeChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let rect_width = 18;

    const svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);

    svg
      .selectAll("rect")
      .data(this.bars)
      .enter()
      .append("rect")
      .attr("x", (d, i) => d.x + (i * rect_width) / 1.2)
      .attr("y", (d) => d.y)
      .attr("width", rect_width)
      .attr("height", (d) => d.height)
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "red")
      .attr("stroke-width", 2);
  }

  get points() {
    return points.map((t) => ({
      ...t,
      timestamp: new Date(t.timestamp * 1000),
    }));
  }

  get bars() {
    /**
     * 1. map date to x-position
     */
    const extent = d3.extent(this.points, (t) => t.timestamp);
    const xScale = d3.scaleTime().domain(extent).range([0, WIDTH]);

    /**
     * 2. map volume to y-position
     */
    const [min, max] = d3.extent(this.points, (t) => t.volume);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([HEIGHT, 0]);

    return this.points.map((t) => ({
      x: xScale(t.timestamp),
      y: yScale(t.volume),
      height: yScale(t.volume),
    }));
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}

export default VolumeChart;
