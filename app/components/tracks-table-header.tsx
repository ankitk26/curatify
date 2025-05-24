import { Clock3Icon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";

export default function TracksTableHeader({
  showAlbum,
}: {
  showAlbum: boolean;
}) {
  return (
    <>
      <header className="grid grid-cols-12 gap-2 p-4 pb-1 text-muted-foreground">
        <div className="col-span-1 font-semibold tracking-wider text-left uppercase">
          #
        </div>

        <div
          className={cn(
            "text-sm font-semibold text-left",
            showAlbum ? "col-span-6" : "col-span-10"
          )}
        >
          Title
        </div>

        {showAlbum && (
          <div className="col-span-4 text-sm font-semibold text-left">
            Album
          </div>
        )}

        <div className="col-span-1 font-semibold text-left">
          <Clock3Icon size={16} />
        </div>
      </header>

      {/* Divider */}
      <Separator />
    </>
  );
}
