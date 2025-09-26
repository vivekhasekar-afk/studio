import { Header } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { doctors } from "@/lib/data";
import { Video } from "lucide-react";
import ConsultationView from "./_components/consultation-view";

export default function TelemedicinePage() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4">
      <Header pageTitle="Telemedicine" />
      <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Doctor Consultations</CardTitle>
            <CardDescription>
              Connect with healthcare professionals remotely.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="flex flex-col">
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription>{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Badge variant={doctor.availability === 'Online' ? 'default' : 'secondary'} className="capitalize">
                            <span className={`mr-2 h-2 w-2 rounded-full ${doctor.availability === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            {doctor.availability}
                        </Badge>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full" disabled={doctor.availability === 'Offline'}>
                                <Video className="mr-2 h-4 w-4" />
                                Start Consultation
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
                           <ConsultationView doctor={doctor} />
                        </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
