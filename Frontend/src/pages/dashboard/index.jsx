import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, AlertTriangle, PieChart, DollarSign, Activity, Calendar, CreditCard, Target, Search, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Simulated API functions
const getCurrentAccountAPI = () => Promise.resolve({ data: { totalIncome: 10000, totalExpense: 7000 } });
const getRecentRecordsAPI = () => Promise.resolve({ data: [
        { id: 1, transactionDescription: 'Salary', type: 'Income', amount: 5000 },
        { id: 2, transactionDescription: 'Rent', type: 'Expense', amount: 1500 },
        { id: 3, transactionDescription: 'Groceries', type: 'Expense', amount: 200 },
    ] });
const getSuspiciousTransactionsAPI = () => Promise.resolve({ data: [
        { id: 1, description: 'Large withdrawal', amount: 5000, date: '2023-05-15' },
        { id: 2, description: 'Unusual overseas transfer', amount: 2000, date: '2023-05-14' },
    ] });

const weeklyData = [
    { day: 'Mon', income: 1000, expense: 800 },
    { day: 'Tue', income: 1500, expense: 1000 },
    { day: 'Wed', income: 1200, expense: 1100 },
    { day: 'Thu', income: 1800, expense: 1300 },
    { day: 'Fri', income: 2000, expense: 1500 },
    { day: 'Sat', income: 2200, expense: 1800 },
    { day: 'Sun', income: 1800, expense: 2000 },
];

const transactionTypes = [
    { name: 'Food & Dining', value: 30 },
    { name: 'Transportation', value: 20 },
    { name: 'Shopping', value: 15 },
    { name: 'Utilities', value: 10 },
    { name: 'Entertainment', value: 15 },
    { name: 'Others', value: 10 },
];

const budgetData = [
    { category: 'Food', budget: 500, spent: 450 },
    { category: 'Transport', budget: 300, spent: 280 },
    { category: 'Shopping', budget: 400, spent: 420 },
    { category: 'Utilities', budget: 200, spent: 180 },
];

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B', '#10B981'];

const MotionCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
        className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        {children}
    </motion.div>
);

const BalanceCard = ({ balance, income, expense }) => (
    <MotionCard className="col-span-full md:col-span-2 lg:col-span-1">
        <div className="p-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <Wallet className="w-6 h-6" />
                    <motion.div
                        className="text-2xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                    >
                        ${balance.toLocaleString()}
                    </motion.div>
                </div>
                <div className="text-sm mb-4">Current Balance</div>
            </div>
            <div className="flex justify-between text-sm">
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <TrendingUp className="w-4 h-4 mr-1 text-green-300" />
                    <div>
                        <div>Income</div>
                        <div className="font-semibold">${income.toLocaleString()}</div>
                    </div>
                </motion.div>
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <TrendingDown className="w-4 h-4 mr-1 text-red-300" />
                    <div>
                        <div>Expense</div>
                        <div className="font-semibold">${expense.toLocaleString()}</div>
                    </div>
                </motion.div>
            </div>
        </div>
    </MotionCard>
);

const RecentRecordsList = ({ records }) => (
    <MotionCard delay={0.1} className="col-span-full md:col-span-2 lg:col-span-1 row-span-2">
        <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-purple-500" />
                Recent Records
            </h2>
            <div className="overflow-y-auto flex-grow">
                <ul className="space-y-2">
                    <AnimatePresence>
                        {records.map((record, index) => (
                            <motion.li
                                key={record.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex justify-between items-center border-b border-gray-200 pb-2"
                            >
                                <div>
                                    <div className="font-medium">{record.transactionDescription}</div>
                                    <div className="text-xs text-gray-500">{record.type}</div>
                                </div>
                                <div className={`font-semibold ${record.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                                    {record.type === 'Income' ? '+' : '-'}${Math.abs(record.amount).toLocaleString()}
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    </MotionCard>
);

const WeeklyChart = ({ data }) => (
    <MotionCard delay={0.2} className="col-span-full md:col-span-2 lg:col-span-1 row-span-2">
        <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                Weekly Income/Expense
            </h2>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="day" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: '0.5rem',
                            }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    </MotionCard>
);

const SuspiciousTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [showTransactions, setShowTransactions] = useState(false);

    const checkTransactions = async () => {
        setIsChecking(true);
        setShowTransactions(false);
        try {
            const response = await getSuspiciousTransactionsAPI();
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating delay
            setTransactions(response.data);
            setIsChecking(false);
            setShowTransactions(true);
        } catch (error) {
            console.error('Error fetching suspicious transactions:', error);
            setIsChecking(false);
        }
    };

    return (
        <MotionCard delay={0.3} className="col-span-full md:col-span-2 lg:col-span-1">
            <div className="p-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                        Suspicious Transactions
                    </h2>
                    <motion.button
                        className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                        onClick={checkTransactions}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isChecking}
                    >
                        {isChecking ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </motion.div>
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-1" />
                                Check
                            </>
                        )}
                    </motion.button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <AnimatePresence>
                        {showTransactions && (
                            <motion.ul
                                className="space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {transactions.map((transaction, index) => (
                                    <motion.li
                                        key={transaction.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="flex justify-between items-center border-b border-gray-200 pb-2"
                                    >
                                        <div>
                                            <div className="font-medium">{transaction.description}</div>
                                            <div className="text-xs text-gray-500">Date: {transaction.date}</div>
                                        </div>
                                        <div className="font-semibold text-red-500">${transaction.amount.toLocaleString()}</div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
                {!isChecking && !showTransactions && (
                    <div className="text-center text-gray-500 text-sm mt-4">
                        Click 'Check' to scan for suspicious transactions
                    </div>
                )}
            </div>
        </MotionCard>
    );
};

const TransactionTypesPieChart = ({ data }) => (
    <MotionCard delay={0.4} className="col-span-full md:col-span-2 lg:col-span-1">
        <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-purple-500" />
                Transaction Types
            </h2>
            <div className="flex-grow flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
                {data.map((entry, index) => (
                    <motion.div
                        key={entry.name}
                        className="flex items-center text-xs"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                        <div
                            className="w-3 h-3 rounded-full mr-1"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                            {entry.name}: {entry.value}%
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </MotionCard>
);

const UpcomingPayments = () => (
    <MotionCard delay={0.5} className="col-span-full md:col-span-2 lg:col-span-1">
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Upcoming Payments
            </h2>
            <ul className="space-y-2">
                <li className="flex justify-between items-center">
                    <div>
                        <div className="font-medium">Rent</div>
                        <div  className="text-xs text-gray-500">Due in 5 days</div>
                    </div>
                    <div className="font-semibold">$1,200</div>
                </li>
                <li className="flex justify-between items-center">
                    <div>
                        <div className="font-medium">Electricity Bill</div>
                        <div className="text-xs text-gray-500">Due in 8 days</div>
                    </div>
                    <div className="font-semibold">$85</div>
                </li>
                <li className="flex justify-between items-center">
                    <div>
                        <div className="font-medium">Credit Card Payment</div>
                        <div className="text-xs text-gray-500">Due in 12 days</div>
                    </div>
                    <div className="font-semibold">$500</div>
                </li>
            </ul>
        </div>
    </MotionCard>
);

const CreditScore = () => (
    <MotionCard delay={0.6} className="col-span-full md:col-span-2 lg:col-span-1">
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
                Credit Score
            </h2>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <svg className="w-32 h-32">
                        <circle
                            className="text-gray-200"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                        />
                        <circle
                            className="text-purple-500"
                            strokeWidth="10"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="56"
                            cx="64"
                            cy="64"
                            strokeDasharray="360"
                            strokeDashoffset="90"
                        />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
            750
          </span>
                </div>
            </div>
            <p className="text-center text-sm mt-2">Excellent</p>
        </div>
    </MotionCard>
);

const BudgetOverview = ({ data }) => (
    <MotionCard delay={0.7} className="col-span-full">
        <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-500" />
                Budget Overview
            </h2>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                        <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </MotionCard>
);

const Dashboard = () => {
    const [accountData, setAccountData] = useState(null);
    const [recentRecords, setRecentRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const accountResponse = await getCurrentAccountAPI();
                setAccountData(accountResponse.data);

                const recordsResponse = await getRecentRecordsAPI();
                setRecentRecords(recordsResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
                <motion.div
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
                <motion.div
                    className="bg-white p-6 rounded-lg shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-700">{error}</p>
                </motion.div>
            </div>
        );
    }

    const balance = accountData ? accountData.totalIncome - accountData.totalExpense : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-3xl font-bold text-center text-purple-800 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Financial Dashboard
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BalanceCard
                        balance={balance}
                        income={accountData ? accountData.totalIncome : 0}
                        expense={accountData ? accountData.totalExpense : 0}
                    />
                    <RecentRecordsList records={recentRecords} />
                    <WeeklyChart data={weeklyData} />
                    <SuspiciousTransactions />
                    <TransactionTypesPieChart data={transactionTypes} />
                    <UpcomingPayments />
                    <CreditScore />
                    <BudgetOverview data={budgetData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;