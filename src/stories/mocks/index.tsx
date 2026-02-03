
const SkeletonContainer = ({ children, className = "", innerClassName = "" }: { children: React.ReactNode, className?: string, innerClassName?: string }) => (
  <div
    className={`relative w-full aspect-video bg-muted/20 rounded-lg overflow-hidden border border-border isolate ${className}`}
    style={{ transform: 'translateZ(0)' }}
  >
    <div className={`absolute inset-0 flex flex-col items-center justify-center ${innerClassName}`}>
        {children}
    </div>
  </div>
);

export const FolderSkeleton = () => (
  <SkeletonContainer>
    <div className="relative w-1/2 h-1/2 mt-4 translate-y-2 pointer-events-none">
      <div className="absolute top-[-5%] left-[10%] w-[30%] h-[15%] bg-muted/40 rounded-t-md border-t border-x border-border/50" />
      <div className="absolute inset-0 bg-background-secondary border border-border rounded-lg shadow-sm" />
      {[...Array(3)].map((_, i) => (
        <div key={i.toString()}
             className="absolute left-1/2 -translate-x-1/2 bg-background-secondary border border-border rounded shadow-sm w-[60%] h-[90%]"
             style={{
               top: `${-15 - i * 4}%`,
               zIndex: 10 + i,
               transform: `translateX(-50%) rotate(${(i - 1) * 3}deg) translateY(${i * 2}px)`
             }}>
          <div className="w-full h-1/2 bg-muted/10" />
          <div className="p-2 space-y-1">
            <div className="w-3/4 h-[10%] bg-muted/30 rounded-full" />
            <div className="w-1/2 h-[8%] bg-muted/20 rounded-full" />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 top-[8%] bg-background-secondary/90 backdrop-blur-[1px] border border-border rounded-lg shadow-md z-30 flex items-center justify-center">
        <div className="w-[30%] aspect-square rounded-full border-2 border-muted/30 flex items-center justify-center">
           <div className="w-[50%] h-[50%] bg-muted/20 rounded-sm rotate-45" />
        </div>
      </div>
    </div>
    <div className="mt-8 flex flex-col items-center gap-1 pointer-events-none">
      <div className="w-24 h-2 bg-muted/40 rounded-full" />
      <div className="w-16 h-1.5 bg-muted/20 rounded-full" />
    </div>
  </SkeletonContainer>
);

export const GallerySkeleton = () => (
    <SkeletonContainer>
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div className="grid grid-cols-4 gap-3 w-[115%] h-[115%] -rotate-1 shrink-0">
                {[...Array(12)].map((_, i) => (
                    <div key={i.toString()}
                         className="bg-background-secondary border-6 border-b-16 border-border/20 shadow-lg rounded-sm flex flex-col aspect-3/4"
                         style={{ transform: `rotate(${(i % 3 - 1) * 1.5}deg)` }}>
                        <div className="flex-1 bg-muted/5" />
                        <div className="h-3 bg-muted/10 mt-auto flex items-center px-1">
                            <div className="w-2/3 h-0.5 bg-muted/30 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </SkeletonContainer>
);

export const FacetCardsSkeleton = () => (
    <SkeletonContainer innerClassName="p-3 sm:p-4">
        <div className="w-full h-full grid grid-cols-2 gap-2 sm:gap-3 pointer-events-none min-w-0">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-background-secondary border border-border rounded shadow-sm flex flex-col min-w-0 overflow-hidden">
                    <div className="w-full h-[35%] bg-muted/10 shrink-0" />
                    <div className="p-1.5 sm:p-2 flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1">
                        <div className="w-3/4 h-2 bg-muted/40 rounded-full shrink-0" />
                        <div className="space-y-1 mt-0.5 min-w-0 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-center gap-1">
                                <div className="w-2/5 h-0.5 bg-muted/20 shrink-0" />
                                <div className="w-1/4 h-0.5 bg-muted/30 shrink-0" />
                            </div>
                            <div className="flex justify-between items-center gap-1">
                                <div className="w-1/3 h-0.5 bg-muted/20 shrink-0" />
                                <div className="w-1/3 h-0.5 bg-muted/30 shrink-0" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </SkeletonContainer>
);

export const CarouselSkeleton = () => (
    <SkeletonContainer innerClassName="justify-start items-stretch gap-3 sm:gap-4 p-4 sm:p-6 text-left">
        <div className="flex flex-col gap-1 px-1 pointer-events-none w-full">
            <div className="w-32 h-4 bg-muted/40 rounded-full" />
            <div className="w-48 h-2 bg-muted/20 rounded-full" />
        </div>
        <div className="relative flex-1 overflow-hidden pointer-events-none w-full">
            <div className="flex gap-4 w-full h-full">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-background-secondary border border-border rounded-xl shadow-md shrink-0 w-[42%] h-full flex flex-col overflow-hidden">
                        <div className="w-full h-3/5 bg-muted/10" />
                        <div className="p-3 mt-auto">
                            <div className="w-3/4 h-2.5 bg-muted/40 rounded-full mb-2" />
                            <div className="w-1/2 h-1.5 bg-muted/20 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Improved button positioning - fully contained */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-border shadow-md flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-muted-foreground rotate-45 -translate-x-0.5" />
            </div>
        </div>
    </SkeletonContainer>
);

export const ThreeDCarouselSkeleton = () => (
    <SkeletonContainer>
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px] pointer-events-none overflow-hidden">
            {[-1.2, 0, 1.2].map((pos, i) => (
                <div key={i.toString()} className="absolute bg-background-secondary border border-border rounded-xl shadow-xl aspect-3/4 h-4/5"
                style={{
                    transform: `translateX(${pos * 100}px) scale(${1 - Math.abs(pos) * 0.25}) rotateY(${pos * 35}deg)`,
                    zIndex: 10 - Math.abs(pos * 10),
                    opacity: 1 - Math.abs(pos) * 0.4,
                    backfaceVisibility: 'hidden'
                }}>
                    <div className="w-full h-3/4 bg-muted/10" />
                    <div className="p-4 mt-auto">
                        <div className="w-3/4 h-2 bg-muted/40 rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    </SkeletonContainer>
);

export const LinearCalendarSkeleton = () => (
    <SkeletonContainer innerClassName="p-3">
        <div className="w-full h-full flex flex-col bg-background-secondary/30 border border-border/40 rounded-md overflow-hidden pointer-events-none">
            <div className="flex h-6 border-b border-border/50 bg-muted/5">
              {[...Array(6)].map((_, i) => (
                <div key={i.toString()} className="flex-1 border-r border-border/30 flex items-center justify-center">
                    <div className="w-1/2 h-1 bg-muted/30 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex-1 relative p-2 space-y-3">
                <div className="relative h-4 bg-primary/20 rounded-sm border-l-2 border-primary w-2/3 translate-x-4 flex items-center px-1">
                    <div className="w-1/4 h-0.5 bg-primary/30 rounded-full" />
                </div>
                <div className="relative h-4 bg-accent/20 rounded-sm border-l-2 border-accent w-1/2 translate-x-12 flex items-center px-1">
                    <div className="w-1/3 h-0.5 bg-accent/30 rounded-full" />
                </div>
                <div className="relative h-4 bg-secondary/20 rounded-sm border-l-2 border-secondary w-3/4 translate-x-2 flex items-center px-1">
                    <div className="w-1/5 h-0.5 bg-secondary/30 rounded-full" />
                </div>
            </div>
        </div>
    </SkeletonContainer>
);

export const HeatmapSkeleton = () => (
    <SkeletonContainer innerClassName="p-4">
        <div className="flex flex-col gap-1 w-full h-full pointer-events-none overflow-hidden">
            <div className="flex justify-end gap-1 mb-1">
                <div className="w-6 h-1 bg-muted/20 rounded-full" />
                <div className="w-6 h-1 bg-muted/40 rounded-full" />
                <div className="w-6 h-1 bg-muted/60 rounded-full" />
            </div>
            <div className="grid grid-cols-13 grid-rows-7 gap-1 flex-1">
                {[...Array(91)].map((_, i) => (
                    <div key={i.toString()} className="aspect-square rounded-[1px] transition-colors"
                    style={{
                        backgroundColor: (i*7+3)%10 > 7 ? 'var(--color-primary)' : (i*3)%11 > 8 ? 'var(--interactive-accent)' : 'var(--muted)' ,
                        opacity: (i*13)%100/100 * 0.8 + 0.2
                    }} />
                ))}
            </div>
        </div>
    </SkeletonContainer>
);
