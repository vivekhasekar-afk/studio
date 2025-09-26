"use client";

import { useState } from "react";
import { Loader2, AlertTriangle, ScrollText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  predictRisk,
  PredictRiskOutput,
} from "@/ai/flows/predict-risk-from-patient-data";
import {
  summarizePatientRecord,
  SummarizePatientRecordOutput,
} from "@/ai/flows/summarize-patient-records";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Patient } from "@/lib/data";

export function PatientActions({ patient }: { patient: Patient }) {
  const [riskResult, setRiskResult] = useState<PredictRiskOutput | null>(null);
  const [summaryResult, setSummaryResult] = useState<SummarizePatientRecordOutput | null>(null);
  const [isRiskLoading, setIsRiskLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const handlePredictRisk = async () => {
    setIsRiskLoading(true);
    setRiskResult(null);
    try {
      const result = await predictRisk({ patientData: patient.medicalRecord });
      setRiskResult(result);
    } catch (error) {
      console.error("Error predicting risk:", error);
    } finally {
      setIsRiskLoading(false);
    }
  };
  
  const handleSummarizeRecord = async () => {
    setIsSummaryLoading(true);
    setSummaryResult(null);
    try {
      const result = await summarizePatientRecord({ patientRecord: patient.medicalRecord });
      setSummaryResult(result);
    } catch (error) {
      console.error("Error summarizing record:", error);
    } finally {
      setIsSummaryLoading(false);
    }
  };


  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handlePredictRisk} variant="outline">
            {isRiskLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <AlertTriangle className="mr-2 h-4 w-4" />
            )}
            Analyze Health Risks
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> AI Risk Analysis</DialogTitle>
            <DialogDescription>
              Potential health risks based on patient data analysis.
            </DialogDescription>
          </DialogHeader>
          {isRiskLoading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing patient data...</span>
            </div>
          )}
          {riskResult && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-md">Risk Factors</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {riskResult.riskFactors.map((factor) => (
                      <Badge key={factor} variant="destructive">{factor}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-md">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{riskResult.recommendations}</p>
                </CardContent>
              </Card>

              <div>
                <label className="text-sm font-medium">Confidence Level</label>
                <Progress value={riskResult.confidenceLevel * 100} className="w-full mt-2" />
                <p className="text-right text-sm text-muted-foreground mt-1">{(riskResult.confidenceLevel * 100).toFixed(0)}%</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleSummarizeRecord}>
             {isSummaryLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ScrollText className="mr-2 h-4 w-4" />
            )}
            Summarize Record
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> AI Record Summary</DialogTitle>
             <DialogDescription>
              A concise summary of the patient's record.
            </DialogDescription>
          </DialogHeader>
           {isSummaryLoading && (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating summary...</span>
            </div>
          )}
          {summaryResult && (
             <div className="prose prose-sm max-h-[60vh] overflow-y-auto rounded-lg border bg-secondary/50 p-4">
                <p>{summaryResult.summary}</p>
             </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
