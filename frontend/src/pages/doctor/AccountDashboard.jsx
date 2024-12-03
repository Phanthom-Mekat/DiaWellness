/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Link2, Search, ArrowUpDown } from 'lucide-react'
import Swal from 'sweetalert2';
import {  toast } from 'react-hot-toast';

function StatisticsCard({ statistics, onRequestPayment, lastPaymentDate }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-[#ADD8E6]/10 to-[#ADD8E6]/20 rounded-lg text-gray-800 shadow-lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-4 text-gray-600">Statistics</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Balance', value: statistics.totalBalance, color: 'bg-[#F5C489]' },
              { label: 'Earned', value: statistics.earned, color: 'bg-[#3498db]' },
              { label: 'Requested', value: statistics.requested, color: 'bg-[#ADD8E6]' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <div className={`w-2 h-2 ${stat.color} rounded-full`}></div>
                  {stat.label}
                </div>
                <div className="text-xl font-bold text-gray-800">${stat.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Last Payment request: {lastPaymentDate}
          </div>
          <Button 
            className="mt-4 bg-[#3498db] hover:bg-[#2980b9] transition-colors duration-300 ease-in-out" 
            onClick={onRequestPayment}
          >
            Request Payment
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4 text-gray-600">Bank Details</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          {[
            { label: 'Bank Name', value: statistics.bankDetails.bankName },
            { label: 'Account Number', value: statistics.bankDetails.accountNumber },
            { label: 'Branch Name', value: statistics.bankDetails.branchName },
            { label: 'Account Name', value: statistics.bankDetails.accountName }
          ].map((detail, index) => (
            <div key={index}>
              <div className="text-gray-500">{detail.label}</div>
              <div className="text-gray-800">{detail.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-x-4">
          <Button 
            variant="link" 
            className="text-[#3498db] p-0 hover:text-[#2980b9] transition-colors duration-300"
            onClick={statistics.onEditDetails}
          >
            Edit Details
          </Button>
          <Button 
            variant="link" 
            className="text-[#3498db] p-0 hover:text-[#2980b9] transition-colors duration-300"
            onClick={statistics.onOtherAccounts}
          >
            Other Accounts
          </Button>
        </div>
      </div>
    </div>
  )
}

function TransactionsTable({ transactions, onSort }) {
  return (
    <Table>
      <TableHeader className="bg-[#ADD8E6]/10">
        <TableRow>
          {[
            { label: 'ID', key: 'id' },
            { label: 'Requested Date', key: 'requestedDate' },
            { label: 'Account No', key: null },
            { label: 'Credited On', key: 'creditedOn' },
            { label: 'Amount', key: 'amount' },
            { label: 'Status', key: 'status' },
            { label: 'Action', key: null }
          ].map((header, index) => (
            <TableHead 
              key={index} 
              className={`${header.key ? 'cursor-pointer hover:bg-[#ADD8E6]/20 transition-colors' : ''}`} 
              onClick={() => header.key && onSort(header.key)}
            >
              <div className="flex items-center text-gray-700">
                {header.label}
                {header.key && <ArrowUpDown className="ml-2 h-4 w-4 text-[#3498db]" />}
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id} className="hover:bg-[#ADD8E6]/5 transition-colors">
            <TableCell className="text-[#3498db] font-medium">{transaction.id}</TableCell>
            <TableCell className="text-gray-600">{transaction.requestedDate}</TableCell>
            <TableCell className="text-gray-600">{transaction.accountNo}</TableCell>
            <TableCell className="text-gray-600">{transaction.creditedOn}</TableCell>
            <TableCell className="text-gray-800 font-medium">${transaction.amount}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={`
                  ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  } 
                  rounded-full px-2 py-1 text-xs font-medium
                `}
              >
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-[#3498db]/10 transition-colors"
                onClick={() => handleViewTransaction(transaction.id)}
              >
                <Link2 className="h-4 w-4 text-[#3498db]" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function AccountsDashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [statistics, setStatistics] = useState({
    totalBalance: 900,
    earned: 906,
    requested: 50,
    bankDetails: {
      bankName: 'Citi Bank Inc',
      accountNumber: '5396 5250 1908 XXXX',
      branchName: 'London',
      accountName: 'Darren'
    }
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedBankDetails, setEditedBankDetails] = useState({ ...statistics.bankDetails })

  const [transactions, setTransactions] = useState([
    {
      id: '#AC-1234',
      requestedDate: '24 Mar 2024',
      accountNo: '5396 5250 1908 XXXX',
      creditedOn: '26 Mar 2024',
      amount: '300',
      status: 'Completed'
    },
    {
      id: '#AC-1235',
      requestedDate: '28 Mar 2024',
      accountNo: '8833 8942 9013 XXXX',
      creditedOn: '30 Mar 2024',
      amount: '400',
      status: 'Completed'
    },
    {
      id: '#AC-1236',
      requestedDate: '02 Apr 2024',
      accountNo: '8920 4041 4725 XXXX',
      creditedOn: '04 Apr 2024',
      amount: '350',
      status: 'Cancelled'
    },
    {
      id: '#AC-1237',
      requestedDate: '10 Apr 2024',
      accountNo: '5730 4892 0492 XXXX',
      creditedOn: '12 Apr 2024',
      amount: '220',
      status: 'Pending'
    },
    {
      id: '#AC-1238',
      requestedDate: '16 Apr 2024',
      accountNo: '7922 9024 3824 XXXX',
      creditedOn: '18 Apr 2024',
      amount: '470',
      status: 'Completed'
    }
  ])

  const handleRequestPayment = () => {
    Swal.fire({
      title: 'Confirm Payment Request',
      text: 'Are you sure you want to request a payment of $100?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3498db',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, request it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setStatistics(prev => ({
          ...prev,
          requested: prev.requested + 100,
          totalBalance: prev.totalBalance - 100
        }))
        toast.success('Payment request submitted successfully!', {
          style: {
            background: '#3498db',
            color: '#fff'
          }
        })
      }
    })
  }

  const handleEditDetails = () => {
    setIsEditModalOpen(true)
  }

  const handleSaveDetails = () => {
    setStatistics(prev => ({
      ...prev,
      bankDetails: { ...editedBankDetails }
    }))
    setIsEditModalOpen(false)
    toast.success('Bank details updated successfully!', {
      style: {
        background: '#3498db',
        color: '#fff'
      }
    })
  }

  const handleOtherAccounts = () => {
    alert('Redirecting to Other Accounts page')
  }

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleViewTransaction = (transactionId) => {
    Swal.fire({
      title: 'Transaction Details',
      text: `Viewing details for transaction ${transactionId}`,
      icon: 'info',
      confirmButtonColor: '#3498db'
    })
  }


  const sortedTransactions = useMemo(() => {
    let sortableTransactions = [...transactions]
    if (sortConfig.key !== null) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableTransactions
  }, [transactions, sortConfig])

  const filteredTransactions = sortedTransactions.filter(
    transaction =>
      Object.values(transaction).some(
        value => 
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * 5, currentPage * 5)

  return (
    <div className="container mx-auto p-4" data-aos="fade-up" data-aos-duration="1500" >
      <Card className="shadow-lg border-[#ADD8E6]/30">
        <CardContent className="p-0">
          <StatisticsCard
            statistics={{
              ...statistics,
              onEditDetails: handleEditDetails,
              onOtherAccounts: handleOtherAccounts
            }}
            onRequestPayment={handleRequestPayment}
            lastPaymentDate="24 Mar 2023"
          />
          
          <div className="p-6">
            <Tabs defaultValue="accounts" className="space-y-4">
              <TabsList className="bg-[#ADD8E6]/10">
                <TabsTrigger 
                  value="accounts" 
                  className="data-[state=active]:bg-[#3498db] data-[state=active]:text-white transition-colors"
                >
                  Accounts
                </TabsTrigger>
                <TabsTrigger 
                  value="refund" 
                  className="data-[state=active]:bg-[#3498db] data-[state=active]:text-white transition-colors"
                >
                  Refund Request
                </TabsTrigger>
              </TabsList>

              <div className="mt-6 mb-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions"
                    className="pl-8 border-[#3498db]/30 focus:ring-[#3498db]/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="accounts">
                <div className="rounded-md border border-[#ADD8E6]/30 shadow-sm">
                  <TransactionsTable 
                    transactions={paginatedTransactions} 
                    onSort={handleSort}
                  />
                </div>

                <div className="flex justify-center gap-1 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-[#3498db]/10 transition-colors"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    {'<'}
                  </Button>
                  {[...Array(Math.ceil(filteredTransactions.length / 5))].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      className={
                        currentPage === i + 1 
                          ? "bg-[#3498db] hover:bg-[#2980b9] transition-colors" 
                          : "hover:bg-[#3498db]/10 transition-colors"
                      }
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-[#3498db]/10 transition-colors"
                    onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filteredTransactions.length / 5)))}
                    disabled={currentPage === Math.ceil(filteredTransactions.length / 5)}
                  >
                    {'>'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="refund">
                <div className="text-center py-8 text-gray-500">
                  Refund request content goes here
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* The Dialog and Toaster components remain the same as in the previous implementation */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bank Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bankName" className="text-right">
                Bank Name
              </Label>
              <Input
                id="bankName"
                value={editedBankDetails.bankName}
                onChange={(e) => setEditedBankDetails(prev => ({ ...prev, bankName: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountNumber" className="text-right">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                value={editedBankDetails.accountNumber}
                onChange={(e) => setEditedBankDetails(prev => ({ ...prev, accountNumber: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="branchName" className="text-right">
                Branch Name
              </Label>
              <Input
                id="branchName"
                value={editedBankDetails.branchName}
                onChange={(e) => setEditedBankDetails(prev => ({ ...prev, branchName: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accountName" className="text-right">
                Account Name
              </Label>
              <Input
                id="accountName"
                value={editedBankDetails.accountName}
                onChange={(e) => setEditedBankDetails(prev => ({ ...prev, accountName: e.target.value }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDetails} className="bg-[#3498db] hover:bg-[#2980b9]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}   