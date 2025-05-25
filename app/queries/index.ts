import { albumQueries } from "./albums";
import { artistQueries } from "./artists";
import { playlistQueries } from "./playlists";
import { userQueries } from "./users";

export const query = {
  playlists: playlistQueries,
  users: userQueries,
  artists: artistQueries,
  albums: albumQueries,
};
