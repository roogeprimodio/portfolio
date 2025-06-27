
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResumePreview } from "./resume-preview";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';

export function ResumeModal({ children }: { children: React.ReactNode }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = () => {
    const input = document.getElementById('resume-content');
    if (!input) return;

    setIsDownloading(true);

    html2canvas(input, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      
      let imgWidth = pdfWidth;
      let imgHeight = pdfWidth / ratio;

      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * ratio;
      }

      const xOffset = (pdfWidth - imgWidth) / 2;
      
      pdf.addImage(imgData, 'PNG', xOffset, 0, imgWidth, imgHeight);
      pdf.save('JAGDISH_ODEDARA_Resume.pdf');
      setIsDownloading(false);
    }).catch(err => {
      console.error("Error generating PDF", err);
      setIsDownloading(false);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Resume</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-auto bg-gray-200 p-4 flex justify-center">
            <ResumePreview />
        </div>
        <DialogFooter className="p-4 border-t bg-background">
          <Button onClick={handleDownloadPdf} disabled={isDownloading}>
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
