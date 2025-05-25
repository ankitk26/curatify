import { queryOptions } from "@tanstack/react-query";
import { getAuthUser } from "~/lib/get-auth-user";

export const userQueries = {
  me: queryOptions({
    queryKey: ["me"],
    queryFn: async () => {
      const auth = await getAuthUser();
      return auth;
    },
  }),
};
