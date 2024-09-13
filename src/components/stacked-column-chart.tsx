import { colors } from "@mui/material";
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface StackedColumnChartProps {
  fullDay: number[];
  lunch: number[];
  dinner: number[];
  visitor: number[];
  fullDayC: number[];
  lunchC: number[];
  dinnerC: number[];
  visitorC: number[];
}
interface StackedColumnChartState {
  options: ApexOptions;
  series: ApexAxisChartSeries;
}
class StackedColumnChart extends React.Component<
  StackedColumnChartProps,
  StackedColumnChartState
> {
  constructor(props: StackedColumnChartProps) {
    super(props);
    this.state = {
      series: [
        {
          name: "Full Day",
          group: "budget",
          data: this.props.fullDay,
        },
        {
          name: "Full Day Children",
          group: "actual",
          data: this.props.fullDayC,
        },
        {
          name: "Lunch",
          group: "budget",
          data: this.props.lunch,
        },
        {
          name: "Lunch Children",
          group: "actual",
          data: this.props.lunchC,
        },
        {
          name: "Dinner",
          group: "budget",
          data: this.props.dinner,
        },
        {
          name: "Dinner Children",
          group: "actual",
          data: this.props.dinnerC,
        },
        {
          name: "Visitor",
          group: "budget",
          data: this.props.visitor,
        },
        {
          name: "Visitor Children",
          group: "actual",
          data: this.props.visitorC,
        },
      ],

      options: {
        chart: {
          type: "bar",
          height: 350,
          stacked: true,
          toolbar: { show: true },
          zoom: { enabled: true },
        },
        colors: [
          colors.blue[600],
          colors.lime[800],
          colors.green[600],
          colors.cyan[300],
          colors.deepPurple[600],
          colors.deepOrange[600],
          colors.cyan[600],
          colors.amber[400],
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            // borderRadius: 10,
            // borderRadiusApplication: "end", // 'around', 'end'
            // borderRadiusWhenStacked: "last", // 'all', 'last'
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 15,
                offsetY: -15,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "datetime",
          categories: [
            "10/09/2024 GMT",
            "10/10/2024 GMT",
            "10/11/2024 GMT",
            "10/12/2024 GMT",
            "10/13/2024 GMT",
          ],
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  componentDidUpdate(prevProps: Readonly<StackedColumnChartProps>): void {
    const currentFullDay = this.props.fullDay;
    const isSame =
      prevProps.fullDay.length === currentFullDay.length &&
      prevProps.fullDay.every(function (element, index) {
        return element === currentFullDay[index];
      });

    if (!isSame) {
      console.log(this.props);
      this.setState({
        options: this.state.options,

        series: [
          {
            name: "Full Day",
            group: "budget",
            data: this.props.fullDay,
          },
          {
            name: "Full Day Children",
            group: "actual",
            data: this.props.fullDayC,
          },
          {
            name: "Lunch",
            group: "budget",
            data: this.props.lunch,
          },
          {
            name: "Lunch Children",
            group: "actual",
            data: this.props.lunchC,
          },
          {
            name: "Dinner",
            group: "budget",
            data: this.props.dinner,
          },
          {
            name: "Dinner Children",
            group: "actual",
            data: this.props.dinnerC,
          },
          {
            name: "Visitor",
            group: "budget",
            data: this.props.visitor,
          },
          {
            name: "Visitor Children",
            group: "actual",
            data: this.props.visitorC,
          },
        ],
      });
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}

export default StackedColumnChart;
