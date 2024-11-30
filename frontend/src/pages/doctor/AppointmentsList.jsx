import { useState, useEffect } from "react";
import {
    Search,
    Calendar,
    Video,
    Phone,
    MessageCircle,
    Building,
    Mail,
    MoreVertical,
    LayoutGrid,
    List,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const appointments = [
    {
        id: 1,
        name: "Adrian",
        date: "2024-11-11",
        time: "10:45 AM",
        email: "adrian@example.com",
        phone: "+1 555 888 9272",
        type: "General Visit",
        communicationType: "Video Call",
        avatar: "https://i.postimg.cc/x8rPf4MJ/image.png",
    },
    {
        id: 2,
        name: "Kelly",
        date: "2024-11-05",
        time: "11:00 AM",
        email: "kelly@example.com",
        phone: "+1 522 849 8493",
        type: "General Visit",
        communicationType: "Audio Call",
        avatar: "https://i.postimg.cc/76JVykGr/image.png",
    },
    {
        id: 3,
        name: "Samuel",
        date: "2024-10-27",
        time: "09:30 AM",
        email: "samuel@example.com",
        phone: "+1 755 554 8287",
        type: "General Visit",
        communicationType: "Video Call",
        avatar: "https://i.postimg.cc/50XPNzrG/image.png",
    },
    {
        id: 4,
        name: "Catherine",
        date: "2024-10-18",
        time: "02:20 PM",
        email: "catherine@example.com",
        phone: "+1 844 662 7153",
        type: "General Visit",
        communicationType: "Chat",
        avatar: "https://i.postimg.cc/k511msTK/image.png",
    },
    {
        id: 5,
        name: "Robert",
        date: "2024-10-15",
        time: "03:00 PM",
        email: "robert@example.com",
        phone: "+1 833 555 6789",
        type: "Follow-up",
        communicationType: "Clinic Visit",
        avatar: "https://i.postimg.cc/52mKPbvP/image.png",
    },
    {
        id: 6,
        name: "Emily",
        date: "2024-10-20",
        time: "11:30 AM",
        email: "emily@example.com",
        phone: "+1 777 123 4567",
        type: "Consultation",
        communicationType: "Video Call",
        avatar: "https://i.postimg.cc/QMcHFx2N/image.png",
    },
    {
        id: 7,
        name: "Sara",
        date: "2024-10-25",
        time: "10:15 AM",
        email: "john@example.com",
        phone: "+1 555 888 9272",
        type: "General Visit",
        communicationType: "Video Call",
        avatar: "https://i.postimg.cc/6qp3bVyT/image.png",
    },
    {
        id: 8,
        name: "John",
        date: "2024-11-05",
        time: "11:00 AM",
        email: "john@example.com",
        phone: "+1 555 888 9272",
        type: "General Visit",
        communicationType: "Video Call",
        avatar: "https://i.postimg.cc/Y930xD2J/image.png",
    },
];

function AppointmentsList() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [selectedDate, setSelectedDate] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAppointments, setFilteredAppointments] = useState(appointments);

    const appointmentsPerPage = 5;
    const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

    useEffect(() => {
        const filtered = appointments.filter((appointment) => {
            const matchesSearch =
                appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                appointment.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = filter === "all" || appointment.communicationType === filter;
            const matchesDate =
                !selectedDate || appointment.date === format(selectedDate, "yyyy-MM-dd");
            return matchesSearch && matchesFilter && matchesDate;
        });
        setFilteredAppointments(filtered);
        setCurrentPage(1);
    }, [searchQuery, filter, selectedDate]);

    const paginatedAppointments = filteredAppointments.slice(
        (currentPage - 1) * appointmentsPerPage,
        currentPage * appointmentsPerPage
    );

    return (
        <div className="container mx-auto p-6 " data-aos="fade-up" data-aos-duration="1200" >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Appointments</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="pl-10 w-[300px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <ToggleGroup
                        type="single"
                        value={viewMode}
                        onValueChange={(value) => value && setViewMode(value)}
                        className="flex"
                    >
                        <ToggleGroupItem
                            value="list"
                            aria-label="List view"
                            className="p-2 rounded-md data-[state=on]:bg-secondary"
                        >
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="grid"
                            aria-label="Grid view"
                            className="p-2 rounded-md data-[state=on]:bg-secondary"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>

                </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-4">
                    <Button
                        variant={activeTab === "upcoming" ? "default" : "outline"}
                        onClick={() => setActiveTab("upcoming")}
                        className={`gap-2 ${activeTab === "upcoming" ? "bg-secondary text-white hover:bg-blue-600" : ""}`}
                    >
                        Upcoming <Badge variant="secondary">{filteredAppointments.length}</Badge>
                    </Button>
                    <Button
                        variant={activeTab === "cancelled" ? "default" : "outline"}
                        onClick={() => setActiveTab("cancelled")}
                        className={`gap-2 ${activeTab === "cancelled" ? "bg-secondary text-white hover:bg-blue-600" : ""}`}
                    >
                        Cancelled <Badge variant="secondary">0</Badge>
                    </Button>
                    <Button
                        variant={activeTab === "completed" ? "default" : "outline"}
                        onClick={() => setActiveTab("completed")}
                        className={`gap-2 ${activeTab === "completed" ? "bg-secondary text-white hover:bg-blue-600" : ""}`}
                    >
                        Completed <Badge variant="secondary">214</Badge>
                    </Button>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Calendar className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <CalendarComponent
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all"><Filter className="h-4 inline mr-2 w-4" /> All Types</SelectItem>
                            <SelectItem value="Video Call">
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 text-red-500 w-4" />
                                    Video Call
                                </div>
                            </SelectItem>
                            <SelectItem value="Audio Call">
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 text-green-500 w-4" />
                                    Audio Call
                                </div>
                            </SelectItem>
                            <SelectItem value="Chat">
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="h-4 text-blue-500 w-4" />
                                    Chat
                                </div>
                            </SelectItem>
                            <SelectItem value="Clinic Visit">
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 text-gray-700 w-4" />
                                    Clinic Visit
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {/* grid mode */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}  >
                {paginatedAppointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className={`bg-white rounded-lg border shadow-sm ${viewMode === "grid" ? "p-4" : "p-4 flex items-center justify-between"
                            }`}
                    >
                        {viewMode === "grid" ? (
                            // Grid View
                            <div className="space-y-4" >
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <img src={appointment.avatar} alt={appointment.name} className="rounded-full" />
                                    </Avatar>
                                    <div>
                                        <h3 className="h-font font-medium">{appointment.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(appointment.date), "dd MMM yyyy")} {appointment.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail className="h-4 text-orange-500 w-4" />
                                            {appointment.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone className="h-4 text-green-500 w-4" />
                                            {appointment.phone}
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">{appointment.type}</div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            {appointment.communicationType === "Video Call" && <Video className="h-4 text-red-500 w-4" />}
                                            {appointment.communicationType === "Chat" && <MessageCircle className="h-4 w-4 text-blue-500 " />}
                                            {appointment.communicationType === "Audio Call" && <Phone className="h-4 w-4 text-green-500 " />}
                                            {appointment.communicationType === "Clinic Visit" && <Building className="h-4 w-4 text-cyan-800" />}
                                            {appointment.communicationType}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <Link to='treatment'>
                                        <Button variant="outline" size="sm" className="text-sm bg-secondary text-white " >
                                            Start Now
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // List View
                            <>
                                <div className="flex items-center gap-4"  >
                                    <Avatar className="h-14 w-14">
                                        <img src={appointment.avatar} alt={appointment.name} className="rounded-full" />
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{appointment.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 text-blue-700" />
                                            {format(new Date(appointment.date), "dd MMM yyyy")} {appointment.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-32">
                                    <div className="text-sm">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail className="h-4 text-red-500 w-4" />
                                            {appointment.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Phone className="h-4 text-green-600 w-4" />
                                            {appointment.phone}
                                        </div>
                                    </div>

                                    <div className="text-sm">
                                        <div className="font-medium">{appointment.type}</div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            {appointment.communicationType === "Video Call" && <Video className="h-4 text-red-500 w-4" />}
                                            {appointment.communicationType === "Chat" && <MessageCircle className="h-4 w-4 text-blue-600 " />}
                                            {appointment.communicationType === "Audio Call" && <Phone className="h-4 w-4 text-green-500 " />}
                                            {appointment.communicationType === "Clinic Visit" && <Building className="h-4 w-4 text-cyan-900 " />}
                                            {appointment.communicationType}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link to='treatment'>
                                            <Button variant="outline" size="sm" className="text-sm bg-secondary text-white " >
                                                Start Now
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </Button>
            </div>
        </div>
    );
}
export default AppointmentsList;
