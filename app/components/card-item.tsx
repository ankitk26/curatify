import { Link } from "@tanstack/react-router";
import CardItemContent from "./card-item-content";

type Props = {
  item: {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    type: string;
  };
};

export default function CardItem({ item }: Props) {
  const content = <CardItemContent item={item} />;

  if (item.type === "categories") {
    return content;
  }

  if (item.type === "artists") {
    return (
      <Link to="/artists/$artistId" params={{ artistId: item.id }}>
        {content}
      </Link>
    );
  }

  if (item.type === "albums") {
    return (
      <Link to="/albums/$albumId" params={{ albumId: item.id }}>
        {content}
      </Link>
    );
  }

  return (
    <Link to="/playlists/$playlistId" params={{ playlistId: item.id }}>
      {content}
    </Link>
  );
}
