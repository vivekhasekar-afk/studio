import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { patients } from "@/lib/data";
import { PatientActions } from "./_components/patient-actions";


export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">
      <Header pageTitle="Patient Details" />
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div>
          <Link href="/dashboard/patients" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <span>Back to Patients</span>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={patient.avatarUrl} alt={patient.name} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-2xl">{patient.name}</CardTitle>
                  <CardDescription>{patient.aadhaar}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-semibold text-muted-foreground">Age</div>
                    <div>{patient.age}</div>
                    <div className="font-semibold text-muted-foreground">Gender</div>
                    <div>{patient.gender}</div>
                    <div className="font-semibold text-muted-foreground">Blood Type</div>
                    <div>{patient.bloodType}</div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Allergies</h4>
                     <div className="flex flex-wrap gap-2">
                        {patient.allergies.length > 0 ? (
                            patient.allergies.map(allergy => <Badge key={allergy} variant="secondary">{allergy}</Badge>)
                        ) : (
                            <span className="text-sm text-muted-foreground">None</span>
                        )}
                    </div>
                  </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Medical Record</CardTitle>
                 <CardDescription>Comprehensive medical history and notes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Patient Summary</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {patient.medicalRecord}
                  </p>
                </div>
                <Separator/>
                 <div className="space-y-4">
                  <h4 className="font-semibold">Diagnosed Conditions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {patient.medicalHistory.map(history => (
                        <li key={history.condition}>{history.condition} (Diagnosed: {history.diagnosed})</li>
                    ))}
                  </ul>
                 </div>
                 <Separator/>
                 <div className="space-y-4">
                  <h4 className="font-semibold">AI-Powered Tools</h4>
                  <PatientActions patient={patient} />
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
