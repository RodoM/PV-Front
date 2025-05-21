import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SalesStallsList = ({ data, children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(data);
      return;
    }

    const searchLower = searchQuery.toLowerCase();

    const filtered = data.filter((puesto) => {
      return (
        puesto.name.toLowerCase().includes(searchLower) ||
        puesto.location.toLowerCase().includes(searchLower)
      );
    });

    setFilteredData(filtered);
  }, [searchQuery, data]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar puestos..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {children(filteredData)}
    </div>
  );
};

export default SalesStallsList;
