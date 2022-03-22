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

    this.margin = { top: 10, right: 30, bottom: 30, left: 40 };
    this.width = WIDTH - this.margin.left - this.margin.right;
    this.height = HEIGHT - this.margin.top - this.margin.bottom;
  }

  componentDidMount() {
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = WIDTH - margin.left - margin.right,
      height = HEIGHT - margin.top - margin.bottom;

    const svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X axis --> it is a date format
    const xExtent = d3.extent(this.points, (d) => d.timestamp);

    const x = d3.scaleTime().domain(xExtent).range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.points, (d) => d.price)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(this.points)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("d", this.chartLine);
  }

  get points() {
    return points.map((t) => ({
      ...t,
      timestamp: new Date(t.timestamp * 1000),
    }));
  }

  get chartLine() {
    const xExtent = d3.extent(this.points, (p) => p.timestamp);
    const xScale = d3.scaleTime().domain(xExtent).range([0, this.width]);

    const yExtent = d3.extent(this.points, (p) => p.price);
    const yScale = d3.scaleLinear().domain(yExtent).range([0, this.height]);

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
