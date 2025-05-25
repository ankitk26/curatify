import { MusicIcon } from "lucide-react";

type Props = {
  item: {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    type: string;
  };
};

export default function CardItemContent({ item }: Props) {
  return (
    <div className="h-full p-4 transition duration-300 rounded-lg cursor-pointer hover:bg-secondary bg-input/30">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          height={160}
          width={160}
          className={`aspect-square object-cover w-full ${
            item.type === "artists" ? "rounded-full" : "rounded-md"
          }`}
        />
      ) : (
        <div className="w-full h-40">
          <MusicIcon className="w-full h-full rounded-md" />
        </div>
      )}
      <h3 className="mt-5 font-bold truncate">{item.title}</h3>
      {item.subtitle && (
        <h6 className="mt-1 text-xs font-semibold truncate text-muted-foreground">
          {item.subtitle}
        </h6>
      )}
    </div>
  );
}
