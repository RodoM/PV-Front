import SalesStall from "@/components/employee-dashboard/sales-stall";

const SalesStallsList = ({ stalls }) => {
  if (!stalls) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {stalls.map((stall) => (
        <SalesStall key={stall.id} stall={stall} />
      ))}
    </div>
  );
};

export default SalesStallsList;
