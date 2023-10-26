import { Paper } from '@mui/material';
import React from 'react';
import ReactApexChart from "react-apexcharts";
const SalesChart = ({ salesState }) => {
    const state = {
        series: [{
            name: 'Sales',
            data: salesState || []
            // [
            //     { x: new Date(2022, 0, 1), y: 10 },
            //     { x: new Date(2022, 1, 1), y: 15 },
            //     { x: new Date(2022, 2, 1), y: 25 },
            //     { x: new Date(2022, 3, 1), y: 20 },
            //     { x: new Date(2022, 4, 1), y: 30 },
            //     { x: new Date(2022, 5, 1), y: 10 },
            // ]
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Sales',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                // labels: {
                //     formatter: function (val) {
                //         return (val / 1000000).toFixed(0);
                //     },
                // },
                title: {
                    text: 'Price'
                },
            },
            xaxis: {
                type: 'datetime',
            },
            // tooltip: {
            //     shared: false,
            // y: {
            //     formatter: function (val) {
            //         return (val / 1000000).toFixed(0)
            //     }
            // }
            // }
        },


    };
    return (
        <Paper sx={{ p: 2, boxShadow: "0px 0px 51px 5px rgba(0, 0, 0, 0.04)", borderRadius: "10px" }}>
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </Paper>
    );
};

export default SalesChart;