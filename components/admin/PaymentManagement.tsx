'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  IndianRupee,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { mockTransactions } from '@/lib/data/mockData'
import { Transaction } from '@/lib/types/admin'

const PaymentManagement = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)

  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)

  const refundedAmount = transactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + t.amount, 0)

  const stats = [
    {
      label: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'Pending Payments',
      value: `₹${pendingAmount.toLocaleString('en-IN')}`,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      label: 'Refunded',
      value: `₹${refundedAmount.toLocaleString('en-IN')}`,
      icon: RefreshCw,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      label: 'Total Transactions',
      value: transactions.length,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <XCircle className="w-4 h-4" />
      case 'refunded':
        return <RefreshCw className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'failed':
        return 'bg-red-500/20 text-red-400'
      case 'refunded':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const exportTransactions = () => {
    // Mock export functionality
    alert('Exporting transactions to CSV...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Payment Management</h2>
          <p className="text-text-secondary mt-1">Track and manage all transactions</p>
        </div>
        <button
          onClick={exportTransactions}
          className="btn-primary-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6 hover:shadow-xl hover:border-accent-blue/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glow w-full pl-12"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-glow w-full md:w-48"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-dark-card/50 backdrop-blur-xl border border-dark-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-secondary/50 border-b border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Student</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Course</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Payment Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-dark-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-accent-blue">{transaction.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{transaction.userName}</p>
                      <p className="text-xs text-text-muted">{transaction.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-text-primary">{transaction.courseTitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-text-primary">₹{transaction.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{transaction.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="capitalize">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>{transaction.transactionDate.toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentManagement
