import React, { Component } from "react";
import * as d3 from "d3";

import { temperatures } from "./data";

import css from "./styles.module.css";

const WIDTH = 650;
const HEIGHT = 400;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.dataset = [100, 200, 300, 400, 500];
  }

  get data() {
    return temperatures.map((t) => ({
      ...t,
      date: new Date(t.date),
    }));
  }

  calculatePoints() {
    /**
     * 1. map date to x-position
     */
    const extent = d3.extent(this.data, (t) => t.date);
    const xScale = d3.scaleTime().domain(extent).range([0, WIDTH]);

    /**
     * 2. map high temp to y-position
     */
    const [min, max] = d3.extent(this.data, (t) => t.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([HEIGHT, 0]);

    /**
     * 3. map avg temp to color
     */
    const colorExtent = d3.extent(this.data, (d) => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    return this.data.map((t) => ({
      x: xScale(t.date),
      y: yScale(t.high),
      height: yScale(t.low) - yScale(t.high),
      fill: colorScale(t.avg),
    }));
  }

  componentDidMount() {
    let size = 500;

    const points = this.calculatePoints();

    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", size)
      .attr("height", size);

    let rect_width = 2;

    svg
      .selectAll("rect")
      .data(points)
      .enter()
      .append("rect")
      .attr("x", (d, i) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", rect_width)
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.fill);
  }

  render() {
    this.calculatePoints();

    return <div ref={this.myRef} className={css.root}></div>;
  }
}

export default Chart;
