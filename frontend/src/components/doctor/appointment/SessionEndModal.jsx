/* eslint-disable react/prop-types */
import jsPDF from "jspdf";
import { usePatient } from "@/provider/PatientContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { FaDownload, FaHospital, FaUserInjured, FaUserMd, } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

function SessionEndModal({ isOpen, onClose }) {
    const { patientData, medications, tests, advice } = usePatient();
    const [showPrescription, setShowPrescription] = useState(false);

    const handleViewDetails = () => setShowPrescription(true);



    const handleDownload = () => {
        const doc = new jsPDF();

        // Title and header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Health Medical Center", 105, 15, { align: "center" });
        doc.setFontSize(10);
        doc.text("Comprehensive Healthcare Services", 105, 20, { align: "center" });
        doc.line(10, 25, 200, 25); // Horizontal line

        // Prescription details
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${format(new Date(), "dd MMM yyyy")}`, 10, 30);
        doc.text(`Doctor Name: Dr. ${patientData.doctor.name}`, 10, 40);
        doc.text(`Patient Name: ${patientData.patient.name}`, 10, 50);
        doc.text(`Age/Gender: ${patientData.patient.age} / ${patientData.patient.gender}`, 10, 60);
        doc.text(`Contact: ${patientData.patient.email}`, 10, 70);

        // Vital signs
        doc.setFont("helvetica", "bold");
        doc.text("Vital Signs:", 10, 80);
        doc.setFont("helvetica", "normal");
        doc.text(`Heart Rate: ${patientData.patient.heart} bpm`, 10, 90);
        doc.text(`Blood Pressure: ${patientData.patient.bp} mmHg`, 10, 100);
        doc.text(`Glucose Level: ${patientData.patient.glucose}%`, 10, 110);
        doc.text(`SPO2: ${patientData.patient.spo2}%`, 10, 120);
        doc.text(`Temperature: ${patientData.patient.body}°C`, 10, 130);

        // Medications
        doc.setFont("helvetica", "bold");
        doc.text("Prescribed Medications:", 10, 140);
        doc.setFont("helvetica", "normal");
        medications.forEach((med, index) => {
            doc.text(
                `${index + 1}. ${med.name || "N/A"} - ${med.type || "N/A"} - ${med.dosage || "N/A"} - ${med.frequency || "N/A"} - ${med.duration || "N/A"}`,
                10,
                150 + index * 10
            );
        });

        // Tests
        const testsStartY = 160 + medications.length * 10;
        doc.setFont("helvetica", "bold");
        doc.text("Recommended Tests:", 10, testsStartY);
        doc.setFont("helvetica", "normal");
        tests.forEach((test, index) => {
            doc.text(
                `${index + 1}. ${test.name} (${test.date} - ${test.result})`,
                10,
                testsStartY + 10 + index * 10
            );
        });

        // Advice
        const adviceStartY = testsStartY + 20 + tests.length * 10;
        doc.setFont("helvetica", "bold");
        doc.text("Medical Advice:", 10, adviceStartY);
        doc.setFont("helvetica", "normal");
        doc.text(advice || "Follow prescribed medications carefully.", 10, adviceStartY + 10);

        // Save the PDF
        doc.save(`Prescription_${patientData.patient.name}_${format(new Date(), "yyyy-MM-dd")}.pdf`);
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {!showPrescription ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Session Ended</DialogTitle>
                        <p>The appointment session has ended. What would you like to do next?</p>
                    </DialogHeader>
                    <DialogFooter>
                        <Link to='/doctor/appointments' >
                            <Button variant="outline" onClick={onClose}>
                                Go to Appointments
                            </Button>
                        </Link>
                        <Button onClick={handleViewDetails}>View Details</Button>
                    </DialogFooter>
                </DialogContent>
            ) : (
                <DialogContent className="max-w-4xl mx-auto p-0 h-[100vh] overflow-hidden">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Prescription Header */}
                        <div className="bg-secondary text-white p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <FaHospital className="text-4xl" />
                                <div>
                                    <h2 className="text-2xl font-bold">Health Medical Center</h2>
                                    <p className="text-sm opacity-80">Comprehensive Healthcare Services</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold">Prescription</p>
                                <p className="text-xs opacity-80">{format(new Date(), "dd MMM yyyy")}</p>
                            </div>
                        </div>

                        {/* Doctor and Patient Details */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <FaUserMd className="text-blue-600" />
                                    <h3 className="font-semibold">Doctor Details</h3>
                                </div>
                                <p className="text-sm"><strong>Name:</strong> Dr. {patientData.doctor.name}</p>
                                <p className="text-sm"><strong>Email:</strong> {patientData.doctor.email}</p>
                                <p className="text-sm"><strong>Specialization:</strong> General Practitioner</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <FaUserInjured className="text-blue-600" />
                                    <h3 className="font-semibold">Patient Details</h3>
                                </div>
                                <p className="text-sm"><strong>Name:</strong> {patientData.patient.name}</p>
                                <p className="text-sm"><strong>Age/Gender:</strong> {patientData.patient.age} / {patientData.patient.gender}</p>
                                <p className="text-sm"><strong>Contact:</strong> {patientData.patient.email}</p>
                            </div>
                        </div>

                        {/* Vitals and Medical Information */}
                        <div className="p-4">
                            <div className="grid grid-cols-5 gap-4 mb-4">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h4 className="text-xs font-semibold text-blue-600 mb-2">Heart Rate</h4>
                                    <p className="text-lg font-bold">{patientData.patient.heart} bpm</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h4 className="text-xs font-semibold text-blue-600 mb-2">Blood Pressure</h4>
                                    <p className="font-bold">{patientData.patient.bp} mmHg</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h4 className="text-xs font-semibold text-blue-600 mb-2">GLucose Level</h4>
                                    <p className="text-lg font-bold">{patientData.patient.glucose} %</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h4 className="text-xs font-semibold text-blue-600 mb-2">SPO2</h4>
                                    <p className="text-lg font-bold">{patientData.patient.spo2} %</p>
                                </div>
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <h4 className="text-xs font-semibold text-blue-600 mb-2">Temperature</h4>
                                    <p className="text-lg font-bold">{patientData.patient.body} °C</p>
                                </div>
                            </div>

                            {/* Medications */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Prescribed Medications</h3>
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="p-2 text-left">Medication</th>
                                            <th className="p-2 text-left">Type</th>
                                            <th className="p-2 text-left">Dosage</th>
                                            <th className="p-2 text-left">Frequency</th>
                                            <th className="p-2 text-left">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medications.map((med, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="p-2">{med.name || "N/A"}</td>
                                                <td className="p-2">{med.type || "N/A"}</td>
                                                <td className="p-2">{med.dosage || "N/A"}</td>
                                                <td className="p-2">{med.frequency || "N/A"}</td>
                                                <td className="p-2">{med.duration || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Lab Tests */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Recommended Tests</h3>
                                <ul className="space-y-2">
                                    {tests.map((test, index) => (
                                        <li key={index} className="flex justify-between text-sm">
                                            <span>{test.name}</span>
                                            <span className="text-gray-600">{test.date} ({test.result})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Advice */}
                            <div>
                                <h3 className="text-lg font-semibold border-b-2 border-blue-600 pb-2 mb-3">Medical Advice</h3>
                                <p className="text-sm leading-relaxed">
                                    {advice || "Follow prescribed medications carefully. Schedule a follow-up consultation in 2 weeks. Maintain a balanced diet and regular exercise."}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-200  p-4 flex justify-between items-center">
                            <p className="text-xs text-black opacity-80">© 2024 Health Medical Center. All rights reserved.</p>
                            <div className="flex space-x-2">
                                <Button className="btn btn-sm" onClick={() => setShowPrescription(false)}>
                                    Back
                                </Button>
                                <Link to='/doctor/appointments' >
                                    <Button variant="ghost" onClick={handleDownload} className=" btn-outline btn  btn-sm hover:bg-gray-100">
                                        <FaDownload className="mr-2 text-blue-500" /> Download Prescription
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
export default SessionEndModal;