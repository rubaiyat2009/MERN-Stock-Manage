import { Box, CircularProgress, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/dashboard/Header';
import PageTitle from '../components/dashboard/PageTitle';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
// import { getCurrentUserOutlets, getDashboardConsumptionChart, getDashboardConsumptionStats, getDashboardPurchaseStats, getDashboardSalesStats, getDashboardStats } from '../redux/dashboard/dashboardSlice';
// import MyOutlets from '../components/dashboard/Dashboard/MyOutlets';
// import DashboardItemChart from '../components/dashboard/Charts/DashboardItemChart';
import QuickLinks from '../components/dashboard/Dashboard/QuickLinks';
// import ConsumptionChart from '../components/dashboard/Charts/ConsumptionChart';
import currency from '../utils/currencyFormat';

const AnalyticsCard = ({ title, amount, color = "primary.main", isLoading, stats }) => {
    const getPercentage = (previous, current) => {
        const percentage = (current / previous) * 100;
        return percentage || 0
    }

    return (
        <Paper sx={{ px: 2, py: "12px", boxShadow: "0px 0px 51px 5px rgba(0, 0, 0, 0.04)", borderRadius: "10px", display: "flex", alignItems: "center" }}>
            <AnalyticsRoundedIcon sx={{ color, fontSize: { lg: 70, md: 50, xs: 40 } }} />
            <Box ml={1}>
                <Typography variant='h5' sx={{ fontSize: { xl: 20, lg: 18, md: 16, xs: 15 } }}>{title}</Typography>
                {
                    isLoading ? <Box sx={{ textAlign: "center" }}><CircularProgress /></Box> :
                        <>
                            {title === "Total Consumptions" ?
                                <Typography variant='h3' sx={{ fontSize: { xl: 36, xs: 28 }, color: "#000", my: "3px" }}>
                                    {getPercentage(stats.consumption?.currentMonth || 0, stats?.purchase?.currentMonth || 0).toFixed(2)}%
                                </Typography> :
                                <Typography variant='h3' sx={{ fontSize: { xl: 36, xs: 28 }, color: "#000", my: "3px" }}>
                                    RM{currency.format(amount?.currentMonth || 0)}
                                </Typography>
                            }
                            <Typography>{getPercentage(amount?.previousMonth || 0, amount?.currentMonth || 0).toFixed(title === "Total Consumptions" ? 1 : 0)}% this month</Typography>
                        </>
                }
            </Box>
        </Paper>
    )
}


const Dashboard = () => {
    const { currentUser } = useSelector(state => state.auth);
    const { stats, isLoading } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    // const [currentChart, setCurrentChart] = useState("Sales");
    // const [currentOutlet, setCurrentOutlet] = useState("All")
    const [chartData, setChartData] = useState([]);

    // const canViewAllOutlets = currentUser?.role !== "admin"

    useEffect(() => {
        // if (currentChart === "Sales") {
        //     setChartData(salesStats)
        // } else if (currentChart === "Purchase") {
        //     setChartData(purchaseStats)

        // } else if (currentChart === "Consumption") {
        //     setChartData(consumptionStats)
        // }
    })

    // const handleChangeChart = (e) => {
    //     setCurrentChart(e.target.value);
    // }

    // const handleChangeOutlet = (e) => {
    //     setCurrentOutlet(e.target.value);
    //     getData(e.target.value)
    // }

    // useEffect(() => {
    //     dispatch(getCurrentUserOutlets())
    // }, [dispatch])

    // useEffect(() => {
    //     if (currentUser && outlets.length > 0) {
    //         const outletId = outlets[0]._id
    //         getData(outletId)
    //         if (currentUser?.role !== "admin") setCurrentOutlet(outletId)
    //     }
    // }, [currentUser, outlets])


    // const getData = (outletId) => {
    //     if (outletId == "All") outletId = null
    //     dispatch(getDashboardStats({ outletId }))
    //     dispatch(getDashboardSalesStats({ outletId }))
    //     dispatch(getDashboardPurchaseStats({ outletId }))
    //     dispatch(getDashboardConsumptionStats({ outletId }))
    //     dispatch(getDashboardConsumptionChart())
    // }

    return (
        <Box>
            <Header>
                <PageTitle>Welcome {currentUser?.firstName || ""} {currentUser?.lastName || ""}</PageTitle>
            </Header>

        </Box>
    );
};

export default Dashboard;