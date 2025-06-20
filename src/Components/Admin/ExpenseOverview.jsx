import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, CreditCard, PieChart } from 'lucide-react';
import moment from 'moment';

const ExpenseOverview = ({ expenses, onAddExpense }) => {
  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.expense, 0);
  
  // Calculate this month's expenses
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.paymentDate);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.expense, 0);
  
  // Calculate average expense
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  
  // Get most common payment method
  const paymentMethodCounts = expenses.reduce((acc, expense) => {
    acc[expense.paymentMethod] = (acc[expense.paymentMethod] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedPaymentMethod = Object.entries(paymentMethodCounts).reduce(
    (max, [method, count]) => (count > max.count ? { method, count } : max),
    { method: 'N/A', count: 0 }
  );

  // Calculate trend (compare this month vs last month)
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const lastMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.paymentDate);
    return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
  });
  
  const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.expense, 0);
  const trend = lastMonthTotal > 0 ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

  const formatCurrency = (amount) => {
    return `Rs.${amount.toLocaleString('en-IN')}/-`;
  };

  const stats = [
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      title: 'This Month',
      value: formatCurrency(thisMonthTotal),
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: trend,
    },
    {
      title: 'Average Expense',
      value: formatCurrency(averageExpense),
      icon: PieChart,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      title: 'Most Used Method',
      value: mostUsedPaymentMethod.method,
      icon: CreditCard,
      color: 'from-lime-500 to-lime-600',
      bgColor: 'bg-lime-50',
      textColor: 'text-lime-600',
      subtitle: `${mostUsedPaymentMethod.count} transactions`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            {stat.trend !== undefined && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat.trend >= 0 
                  ? 'bg-emerald-100 text-emerald-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {stat.trend >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(stat.trend).toFixed(1)}%
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
            <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseOverview;