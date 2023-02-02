import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../utils/api";

export default function ShortUrl() {
  const router = useRouter();

  const fetchLongUrl = api.url.fetchLongUrl.useQuery(
    {
      shortUrl: router.query.url as string,
    },
    {
      enabled: !!router.query.url,
    }
  );
  console.log(fetchLongUrl.data);

  useEffect(() => {
    if (fetchLongUrl.data) return (window.location.href = fetchLongUrl.data);
  }, [fetchLongUrl.data]);

  return <div>Redirecting...</div>;
}
