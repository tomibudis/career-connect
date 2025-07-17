import { GalleryVerticalEnd } from 'lucide-react';

export const CareerConnectLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
        <GalleryVerticalEnd className="size-5" />
      </div>
      <span className="font-semibold text-lg tracking-tight">
        CareerConnect
      </span>
    </div>
  );
};
