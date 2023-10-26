import { Paper } from '@mui/material';
import React from 'react';
import ReactApexChart from "react-apexcharts";
import currency from '../../../utils/currencyFormat';
const DashboardItemChart = ({ data, name = "" }) => {
    const state = {
        series: [{
            name,
            data: data || []
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
                text: name,
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
                title: {
                    text: 'Price'
                },
                labels: {
                    formatter: (value) => { return currency.format(value || 0) },
                }
            },
            xaxis: {
                type: 'datetime',
            },
        },


    };
    return (
        <Paper sx={{ p: 2, boxShadow: "0px 0px 51px 5px rgba(0, 0, 0, 0.04)", borderRadius: "10px" }}>
            <ReactApexChart options={state.options} series={state.series} type="area" height={300} />
        </Paper>
    );
};

export default DashboardItemChart;