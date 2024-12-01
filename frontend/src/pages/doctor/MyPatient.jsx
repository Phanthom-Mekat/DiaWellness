import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPin, Search, Filter } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const SAMPLE_PATIENTS = [
    {
        id: "#apt001",
        name: "Kalasnikobi",
        age: 23,
        gender: "Female",
        bloodType: "AB+",
        image: "https://i.postimg.cc/76JVykGr/image.png",
        lastAppointment: "2024-11-11T10:45:00",
        location: "Rajshahi, BD",
        lastBooking: "2024-02-27",
        status: "active"
    },
    {
        id: "#apt002",
        name: "Kelly Stevens",
        age: 37,
        gender: "Female",
        bloodType: "O+",
        image: "https://i.postimg.cc/52mKPbvP/image.png",
        lastAppointment: "2024-11-05T11:50:00",
        location: "Dhaka, BD",
        lastBooking: "2024-03-20",
        status: "active"
    },
    {
        id: "#apt003",
        name: "Sam ALtman",
        age: 45,
        gender: "Male",
        bloodType: "A-",
        image: "https://i.postimg.cc/QMcHFx2N/image.png",
        lastAppointment: "2024-10-15T09:30:00",
        location: "Chittagong, BD",
        lastBooking: "2024-01-10",
        status: "inactive"
    },
    {
        id: "#apt004",
        name: "Emma Wilson",
        age: 29,
        gender: "Female",
        bloodType: "B+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-03T14:20:00",
        location: "Sylhet, BD",
        lastBooking: "2024-04-15",
        status: "active"
    },
    {
        id: "#apt005",
        name: "Michael Brown",
        age: 52,
        gender: "Male",
        bloodType: "O-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-20T09:00:00",
        location: "Khulna, BD",
        lastBooking: "2024-03-05",
        status: "active"
    },
    {
        id: "#apt006",
        name: "Sophia Lee",
        age: 31,
        gender: "Female",
        bloodType: "A+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-10T11:30:00",
        location: "Barisal, BD",
        lastBooking: "2024-05-01",
        status: "active"
    },
    {
        id: "#apt007",
        name: "David Chen",
        age: 40,
        gender: "Male",
        bloodType: "AB-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-28T15:45:00",
        location: "Rangpur, BD",
        lastBooking: "2024-04-22",
        status: "active"
    },
    {
        id: "#apt008",
        name: "Olivia Taylor",
        age: 27,
        gender: "Female",
        bloodType: "B-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-05T10:15:00",
        location: "Mymensingh, BD",
        lastBooking: "2024-05-10",
        status: "active"
    },
    {
        id: "#apt009",
        name: "William Johnson",
        age: 48,
        gender: "Male",
        bloodType: "A+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-15T13:00:00",
        location: "Comilla, BD",
        lastBooking: "2024-03-28",
        status: "active"
    },
    {
        id: "#apt010",
        name: "Ava Martinez",
        age: 33,
        gender: "Female",
        bloodType: "O+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-08T09:45:00",
        location: "Narayanganj, BD",
        lastBooking: "2024-05-17",
        status: "active"
    },
    {
        id: "#apt011",
        name: "Ethan Thompson",
        age: 55,
        gender: "Male",
        bloodType: "B+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-22T11:15:00",
        location: "Gazipur, BD",
        lastBooking: "2024-04-03",
        status: "active"
    },
    {
        id: "#apt012",
        name: "Isabella Garcia",
        age: 41,
        gender: "Female",
        bloodType: "AB+",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-01T14:30:00",
        location: "Jessore, BD",
        lastBooking: "2024-05-20",
        status: "active"
    },
    {
        id: "#apt013",
        name: "James Wilson",
        age: 39,
        gender: "Male",
        bloodType: "O-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-18T10:00:00",
        location: "Bogra, BD",
        lastBooking: "2024-03-12",
        status: "active"
    },
    {
        id: "#apt014",
        name: "Mia Anderson",
        age: 28,
        gender: "Female",
        bloodType: "A-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-07T16:45:00",
        location: "Savar, BD",
        lastBooking: "2024-05-05",
        status: "active"
    },
    {
        id: "#apt015",
        name: "Benjamin Lee",
        age: 50,
        gender: "Male",
        bloodType: "B-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-11-25T08:30:00",
        location: "Tangail, BD",
        lastBooking: "2024-04-18",
        status: "active"
    },
    {
        id: "#apt016",
        name: "Charlotte Kim",
        age: 35,
        gender: "Female",
        bloodType: "AB-",
        image: "/placeholder.svg?height=50&width=50",
        lastAppointment: "2024-12-12T12:15:00",
        location: "Dinajpur, BD",
        lastBooking: "2024-05-25",
        status: "active"
    },
]

export default function MyPatients() {
    const [activeTab, setActiveTab] = useState("active")
    const [searchQuery, setSearchQuery] = useState("")
    const [dateRange, setDateRange] = useState(null)
    const [filterBy, setFilterBy] = useState("")
    const [patients, setPatients] = useState([])
    const [displayedPatients, setDisplayedPatients] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        // Simulating API call to fetch patients
        const fetchPatients = async () => {
            // In a real app, this would be an API call
            setPatients(SAMPLE_PATIENTS)
            setDisplayedPatients(SAMPLE_PATIENTS.slice(0, 8))
        }
        fetchPatients()
    }, [])

    useEffect(() => {
        if (searchQuery || dateRange || filterBy) {
            const filtered = patients.filter(patient => {
                const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
                const matchesStatus = patient.status === activeTab
                const matchesDateRange = !dateRange || (
                    new Date(patient.lastAppointment) >= dateRange.from &&
                    new Date(patient.lastAppointment) <= (dateRange.to || dateRange.from)
                )
                
                let matchesFilter = true
                if (filterBy) {
                    switch (filterBy) {
                        case "name":
                            matchesFilter = patient.name.toLowerCase().includes(searchQuery.toLowerCase())
                            break
                        case "age":
                            matchesFilter = patient.age.toString().includes(searchQuery)
                            break
                        case "location":
                            matchesFilter = patient.location.toLowerCase().includes(searchQuery.toLowerCase())
                            break
                        default:
                            matchesFilter = true
                    }
                }
                
                return matchesSearch && matchesStatus && matchesDateRange && matchesFilter
            })
            setDisplayedPatients(filtered.slice(0, 8))
            setCurrentPage(1)
        } else {
            setDisplayedPatients(patients.filter(p => p.status === activeTab).slice(0, 8))
            setCurrentPage(1)
        }
    }, [searchQuery, dateRange, filterBy, activeTab, patients])

    const handleLoadMore = () => {
        const nextPage = currentPage + 1
        const startIndex = (nextPage - 1) * 8
        const endIndex = startIndex + 8
        const newPatients = patients
            .filter(p => p.status === activeTab)
            .slice(startIndex, endIndex)
        setDisplayedPatients([...displayedPatients, ...newPatients])
        setCurrentPage(nextPage)
        toast.success(`Loaded page ${nextPage} of patients`)
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Patients</h1>
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search patients..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <Button
                        variant={activeTab === "active" ? "default" : "outline"}
                        onClick={() => setActiveTab("active")}
                    >
                        Active <span className="ml-2 text-xs bg-primary-foreground px-2 py-0.5 rounded-full">{patients.filter(p => p.status === "active").length}</span>
                    </Button>
                    <Button
                        variant={activeTab === "inactive" ? "default" : "outline"}
                        onClick={() => setActiveTab("inactive")}
                    >
                        InActive <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">{patients.filter(p => p.status === "inactive").length}</span>
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-[280px] justify-start text-left font-normal ${!dateRange && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="range"
                                selected={dateRange}
                                onSelect={setDateRange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Select value={filterBy} onValueChange={setFilterBy}>
                        <SelectTrigger className="w-32">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Filter By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="age">Age</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedPatients.map((patient) => (
                    <Link to='treatment' key={patient.id}>
                        <div
                            className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={patient.image} alt={patient.name} />
                                    <AvatarFallback>{patient.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="text-sm text-muted-foreground">{patient.id}</div>
                                    <div className="font-medium">{patient.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        Age: {patient.age} • {patient.gender} • {patient.bloodType}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2">
                                <div className="bg-gray-200/80 rounded-lg p-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="w-4 h-4 mr-2" />
                                        {format(new Date(patient.lastAppointment), "PPp")}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {patient.location}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground px-4">
                                    Last Booking {format(new Date(patient.lastBooking), "PP")}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {displayedPatients.length < patients.filter(p => p.status === activeTab).length && (
                <div className="mt-6 text-center">
                    <Button variant="outline" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </div>
            )}
        </div>
    )
}

