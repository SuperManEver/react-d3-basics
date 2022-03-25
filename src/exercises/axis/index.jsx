import React, { Component } from "react";
import * as d3 from "d3";

import data from "./data";

const WIDTH = 650;
const HEIGHT = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Axis extends Component {
  state = {
    bars: [],
  };

  constructor(props) {
    super(props);
    this.xAxis = React.createRef();
    this.yAxis = React.createRef();
    this.line = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    // 1. map date to x-position
    // get min and max of date
    const extent = d3.extent(data, (d) => d.date);
    const xScale = d3
      .scaleTime()
      .domain(extent)
      .range([margin.left, WIDTH - margin.right]);

    // 2. map high temp to y-position
    // get min/max of high temp
    const [min, max] = d3.extent(data, (d) => d.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([HEIGHT - margin.bottom, margin.top]);

    // 3. map avg temp to color
    // get min/max of avg
    const colorExtent = d3.extent(data, (d) => d.avg).reverse();
    const colorScale = d3
      .scaleSequential()
      .domain(colorExtent)
      .interpolator(d3.interpolateRdYlBu);

    // array of objects: x, y, height
    const bars = data.map((d) => {
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(d.low) - yScale(d.high),
        fill: colorScale(d.avg),
      };
    });

    return { bars, xScale, yScale };
  }

  componentDidMount() {
    this.drawXAxis();
    this.drawYAxis();
  }

  drawLine() {
    const { data } = this.props;

    const lineGenerator = this.chartLine;
    const path = lineGenerator(data);

    return path;
  }

  drawYAxis() {
    const { data } = this.props;

    const [min, max] = d3.extent(data, (d) => d.high);
    const yScale = d3
      .scaleLinear()
      .domain([Math.min(min, 0), max])
      .range([HEIGHT - margin.bottom, margin.top]);

    const axis = d3.axisLeft(yScale);

    if (this.yAxis.current) {
      d3.select(this.yAxis.current).call(axis);
    }
  }

  drawXAxis() {
    const { xScale } = this.state;

    const axis = d3.axisBottom(xScale);

    if (this.xAxis.current) {
      d3.select(this.xAxis.current).call(axis);
    }
  }

  get chartLine() {
    const { data } = this.props;

    const xExtent = d3.extent(data, (p) => p.date);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([2, WIDTH - margin.right]);

    const yExtent = d3.extent(data, (p) => p.avg);
    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([0, HEIGHT - 100]);

    const path = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.avg));

    return path;
  }

  render() {
    return (
      <svg width={WIDTH} height={HEIGHT}>
        <g ref={this.yAxis} transform={`translate(${margin.left}, 0)`} />

        <g
          ref={this.xAxis}
          transform={`translate(0, ${HEIGHT - margin.bottom})`}
        />

        <path
          d={this.drawLine()}
          stroke="red"
          strokeWidth="2"
          fill="none"
          transform={`translate(${margin.left}, ${margin.top})`}
        />
      </svg>
    );
  }
}

export default () => <Axis data={data.data} />;
