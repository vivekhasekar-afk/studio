"use client";

import type { Doctor } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DialogClose } from "@/components/ui/dialog";

export default function ConsultationView({ doctor }: { doctor: Doctor }) {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <>
      <div className="relative flex-1 bg-black rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-2 p-2">
        <div className="relative col-span-1 md:col-span-3 h-full">
            <Image
                src={doctor.avatarUrl}
                alt={`Dr. ${doctor.name}`}
                fill
                className="object-cover"
                data-ai-hint="doctor"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg">
                <h2 className="font-bold">{doctor.name}</h2>
                <p className="text-sm">{doctor.specialty}</p>
            </div>
        </div>
        <div className="relative md:h-auto h-32 bg-gray-800 rounded-md overflow-hidden">
             <Image
                src="https://picsum.photos/seed/user/300/400"
                alt="Patient View"
                fill
                className="object-cover"
                data-ai-hint="patient"
            />
             <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-lg">
                <p className="text-sm font-bold">You</p>
            </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 pt-4">
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12" onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
        </Button>
        <Button variant="secondary" size="icon" className="rounded-full h-12 w-12" onClick={() => setIsVideoOff(!isVideoOff)}>
          {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
          <span className="sr-only">{isVideoOff ? "Start Video" : "Stop Video"}</span>
        </Button>
         <DialogClose asChild>
            <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
                <PhoneOff className="h-6 w-6" />
                <span className="sr-only">End Call</span>
            </Button>
        </DialogClose>
      </div>
    </>
  );
}
