import { Paper } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import currency from '../../../utils/currencyFormat';

const ConsumptionChart = ({ data }) => {
    console.log("data", data);
    const chartLabels = [
        { label: "Sales", id: "totalSales" },
        { label: "Purchase", id: "totalPurchase" },
        { label: "Out", id: "totalOut" },
        { label: "Consumption", id: "totalConsumption" }]

    const getSeriesData = (chartLabels, stats) => {
        return chartLabels.map(({ label, id }) => {
            if (stats.length > 0) {
                const result = stats.map((item) => item[id])
                return { name: label, data: result }
            } else {
                return { name: label, data: [] }
            }
        })

    }

    const state = {

        // series: [{
        //     name: 'Sales',
        //     data: [44, 55, 41, 37, 22, 43, 21]
        // },{
        //     name: 'Consumption',
        //     data: [25, 12, 19, 32, 25, 24, 10]
        // }],
        series: getSeriesData(chartLabels, data) || [],
        options: {
            chart: {
                type: 'bar',
                height: 300,
                stacked: true,
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        total: {
                            enabled: false,
                            offsetX: 0,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Consumption Overview'
            },
            xaxis: {
                categories: data?.map(({ name }) => name),
                tickAmount: 3,
                labels: {
                    formatter: function (val) {
                        if (val === 0) {
                            return "RM " + val
                        }
                        return currency.format(val || 0)
                    },
                    style: {
                        fontSize: '9px',
                    }
                }
            },
            // yaxis: {
            //     title: {
            //         text: undefined
            //     },
            // },
            yaxis: {
                labels: {
                    show: false
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                },
                x: {
                    formatter: (outlet) => "Outlet: " + outlet,
                },
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                offsetX: 0,
                fontSize: '10px',
                markers: {
                    width: 8,
                    height: 8,
                    radius: 0,
                },
            }
        },

    }


    return (
        <Paper sx={{ p: 2, boxShadow: "0px 0px 51px 5px rgba(0, 0, 0, 0.04)", borderRadius: "10px" }}>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={250} />
        </Paper>
    );
};

export default ConsumptionChart;