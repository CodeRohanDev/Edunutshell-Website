'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Receipt, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Transaction {
  id: string
  date: string
  courseName: string
  paymentType: 'Full' | 'Advance'
  amountPaid: number
  amountDue: number
  status: 'Completed' | 'Pending' | 'Partial'
}

export default function PaymentPage() {
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      date: '2025-10-10',
      courseName: 'Full Stack Web Development',
      paymentType: 'Full',
      amountPaid: 15000,
      amountDue: 0,
      status: 'Completed'
    },
    {
      id: 'TXN002',
      date: '2025-10-08',
      courseName: 'Data Science & Machine Learning',
      paymentType: 'Advance',
      amountPaid: 10000,
      amountDue: 10000,
      status: 'Partial'
    },
    {
      id: 'TXN003',
      date: '2025-10-05',
      courseName: 'Python Programming Masterclass',
      paymentType: 'Full',
      amountPaid: 8000,
      amountDue: 0,
      status: 'Completed'
    },
    {
      id: 'TXN004',
      date: '2025-09-28',
      courseName: 'Advanced React & Next.js',
      paymentType: 'Advance',
      amountPaid: 7500,
      amountDue: 7500,
      status: 'Partial'
    },
    {
      id: 'TXN005',
      date: '2025-09-20',
      courseName: 'UI/UX Design Fundamentals',
      paymentType: 'Advance',
      amountPaid: 5000,
      amountDue: 5000,
      status: 'Partial'
    },
    {
      id: 'TXN006',
      date: '2025-09-15',
      courseName: 'Cloud Computing with AWS',
      paymentType: 'Full',
      amountPaid: 12000,
      amountDue: 0,
      status: 'Completed'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Partial':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'Pending':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case 'Completed':
        return `${baseClasses} bg-green-500/20 text-green-400 border border-green-500/30`
      case 'Partial':
        return `${baseClasses} bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`
      case 'Pending':
        return `${baseClasses} bg-red-500/20 text-red-400 border border-red-500/30`
      default:
        return baseClasses
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Receipt className="w-8 h-8 text-slate-400" />
              <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
                Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">History</span>
              </h1>
            </div>
            <p className="text-text-muted text-base sm:text-lg">
              Track all your course payment transactions and pending dues
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-muted text-sm">Total Paid</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">₹{transactions.reduce((sum, t) => sum + t.amountPaid, 0).toLocaleString()}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-muted text-sm">Total Due</span>
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">₹{transactions.reduce((sum, t) => sum + t.amountDue, 0).toLocaleString()}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-muted text-sm">Transactions</span>
                <Receipt className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary">{transactions.length}</div>
            </motion.div>
          </div>

          {/* Transaction Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-card/30 backdrop-blur-xl border border-dark-border/30 rounded-2xl overflow-hidden"
          >
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border/30">
                    <th className="text-left px-6 py-4 text-text-muted font-medium text-sm">Transaction ID</th>
                    <th className="text-left px-6 py-4 text-text-muted font-medium text-sm">Date</th>
                    <th className="text-left px-6 py-4 text-text-muted font-medium text-sm">Course Name</th>
                    <th className="text-left px-6 py-4 text-text-muted font-medium text-sm">Payment Type</th>
                    <th className="text-right px-6 py-4 text-text-muted font-medium text-sm">Amount Paid</th>
                    <th className="text-right px-6 py-4 text-text-muted font-medium text-sm">Amount Due</th>
                    <th className="text-center px-6 py-4 text-text-muted font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-dark-border/20 hover:bg-dark-secondary/30 transition-colors"
                    >
                      <td className="px-6 py-4 text-text-primary font-mono text-sm">{transaction.id}</td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="px-6 py-4 text-text-primary text-sm font-medium">{transaction.courseName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.paymentType === 'Full' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {transaction.paymentType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-text-primary font-semibold text-sm">₹{transaction.amountPaid.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <span className={transaction.amountDue > 0 ? 'text-yellow-400 font-semibold' : 'text-text-muted'}>
                          ₹{transaction.amountDue.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(transaction.status)}
                          <span className={getStatusBadge(transaction.status)}>
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-dark-border/20">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 sm:p-6 hover:bg-dark-secondary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-text-primary font-mono text-sm mb-1">{transaction.id}</div>
                      <div className="text-text-muted text-xs">{new Date(transaction.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-text-primary font-medium mb-2">{transaction.courseName}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.paymentType === 'Full' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {transaction.paymentType}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dark-border/20">
                    <div>
                      <div className="text-text-muted text-xs mb-1">Amount Paid</div>
                      <div className="text-text-primary font-semibold">₹{transaction.amountPaid.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-text-muted text-xs mb-1">Amount Due</div>
                      <div className={transaction.amountDue > 0 ? 'text-yellow-400 font-semibold' : 'text-text-muted'}>
                        ₹{transaction.amountDue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
