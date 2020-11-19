import * as d3 from 'react-d3-library';

class AppendingLineChart {
    constructor(container, lineColors) {
        this.data = [];
        this.minY = Number.MAX_VALUE;
        this.maxY = Number.MIN_VALUE;
        this.lineColors = lineColors;
        this.numLines = lineColors.length;
        let node = container.node();
        let totalWidth = node.offsetWidth;
        let totalHeight = node.offsetHeight;
        let margin = { top: 2, right: 0, bottom: 2, left: 2 };
        let width = totalWidth - margin.left - margin.right;
        let height = totalHeight - margin.top - margin.bottom;
        this.xScale = d3.scale.linear()
            .domain([0, 0])
            .range([0, width]);
        this.yScale = d3.scale.linear()
            .domain([0, 0])
            .range([height, 0]);
        this.svg = container.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        this.paths = new Array(this.numLines);
        for (let i = 0; i < this.numLines; i++) {
            this.paths[i] = this.svg.append("path")
                .attr("class", "line")
                .style({
                "fill": "none",
                "stroke": lineColors[i],
                "stroke-width": "1.5px"
            });
        }
    }
    reset() {
        this.data = [];
        this.redraw();
        this.minY = Number.MAX_VALUE;
        this.maxY = Number.MIN_VALUE;
    }
    addDataPoint(dataPoint) {
        if (dataPoint.length !== this.numLines) {
            throw Error("Length of dataPoint must equal number of lines");
        }
        dataPoint.forEach(y => {
            this.minY = Math.min(this.minY, y);
            this.maxY = Math.max(this.maxY, y);
        });
        this.data.push({ x: this.data.length + 1, y: dataPoint });
        this.redraw();
    }
    redraw() {
        // Adjust the x and y domain.
        this.xScale.domain([1, this.data.length]);
        this.yScale.domain([this.minY, this.maxY]);
        // Adjust all the <path> elements (lines).
        let getPathMap = (lineIndex) => {
            return d3.svg.line()
                .x(d => this.xScale(d.x))
                .y(d => this.yScale(d.y[lineIndex]));
        };
        for (let i = 0; i < this.numLines; i++) {
            this.paths[i].datum(this.data).attr("d", getPathMap(i));
        }
    }
}