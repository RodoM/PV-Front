import SalesStallsList from "@/components/employee-dashboard/sales-stall-list";
import SalesStall from "@/components/employee-dashboard/sales-stall";

const salesStalls = [
  {
    id: 1,
    name: "Puesto 1",
    location: "Sector A",
    enabled: true,
  },
  {
    id: 2,
    name: "Puesto 2",
    location: "Sector B",
    enabled: false,
  },
  {
    id: 3,
    name: "Puesto 3",
    location: "Sector C",
    enabled: true,
  },
  {
    id: 4,
    name: "Puesto 4",
    location: "Sector A",
    enabled: true,
  },
  {
    id: 5,
    name: "Puesto 5",
    location: "Sector B",
    enabled: false,
  },
  {
    id: 6,
    name: "Puesto 6",
    location: "Sector C",
    enabled: true,
  },
];

function SalesStalls() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Puestos del negocio **********</h1>

      <SalesStallsList data={salesStalls}>
        {(filteredStalls) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStalls.length > 0 ? (
              filteredStalls.map((stall) => <SalesStall key={stall.id} stall={stall} />)
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No se encontraron puestos de venta.</p>
              </div>
            )}
          </div>
        )}
      </SalesStallsList>
    </div>
  );
}

export default SalesStalls;
