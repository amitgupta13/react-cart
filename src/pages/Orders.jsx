import { useGetOrdersQuery } from "../store";
import Card from "../components/ui/Card";

export default function Orders() {
  const { data, isFetching, error } = useGetOrdersQuery();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;
  if (!data?.items?.length) return <div>Orders Empty</div>;

  return (
    <div>
      <Card></Card>
    </div>
  );
}
