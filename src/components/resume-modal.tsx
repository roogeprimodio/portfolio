
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ResumePreview } from "./resume-preview";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader2, ZoomIn, ZoomOut, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ResumeModal({ children }: { children: React.ReactNode }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef(0);

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

  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prevScale => {
      const newScale = direction === 'in' ? prevScale * 1.2 : prevScale / 1.2;
      return Math.max(0.5, Math.min(newScale, 3));
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    if (contentRef.current) contentRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.clientX - dragStartPos.current.x;
    const y = e.clientY - dragStartPos.current.y;
    setPosition({ x, y });
  };
  
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    if (contentRef.current) contentRef.current.style.cursor = 'grab';
  };

  const getDistance = (touches: TouchList) => {
    return Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      initialPinchDist.current = getDistance(e.touches);
    } else if (e.touches.length === 1) {
      e.preventDefault();
      setIsDragging(true);
      dragStartPos.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDist = getDistance(e.touches);
      const newScale = scale * (newDist / initialPinchDist.current);
      setScale(Math.max(0.5, Math.min(newScale, 3)));
      initialPinchDist.current = newDist;
    } else if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      const x = e.touches[0].clientX - dragStartPos.current.x;
      const y = e.touches[0].clientY - dragStartPos.current.y;
      setPosition({ x, y });
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    initialPinchDist.current = 0;
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  };

  const fitContent = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const contentWidth = contentRef.current.offsetWidth;
    const contentHeight = contentRef.current.offsetHeight;

    if (contentWidth === 0 || contentHeight === 0) return;

    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;
    
    const initialScale = Math.min(scaleX, scaleY) * 0.9;
    setScale(initialScale > 1 ? 1 : initialScale);
    setPosition({x: 0, y: 0});
  }, []);

  useEffect(() => {
    const timer = setTimeout(fitContent, 100);
    window.addEventListener('resize', fitContent);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', fitContent);
    };
  }, [fitContent, children]);

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <DialogTitle>Resume Preview</DialogTitle>
        </DialogHeader>
        <div
          ref={containerRef}
          className="flex-grow overflow-hidden bg-gray-200 flex justify-center items-center relative touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={contentRef}
            className={cn("origin-center", isDragging ? "" : "transition-transform duration-200 ease-out")}
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <ResumePreview />
          </div>
        </div>
        <DialogFooter className="p-4 border-t bg-background flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleZoom('out')} disabled={scale <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="text-sm font-mono w-16 text-center tabular-nums">{(scale * 100).toFixed(0)}%</div>
            <Button variant="outline" size="icon" onClick={() => handleZoom('in')} disabled={scale >= 3}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Hand className={cn("h-5 w-5 text-muted-foreground ml-2 transition-opacity", scale > 1 ? "opacity-100" : "opacity-0")} />
          </div>
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
