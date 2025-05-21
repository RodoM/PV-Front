import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SalesStall = ({ stall }) => {
  const navigate = useNavigate();

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <CardTitle>{stall.name}</CardTitle>
        <CardDescription>{stall.location}</CardDescription>
      </CardHeader>
      <CardContent>
        {stall.enabled ? (
          <span className="text-green-600 font-medium">Activo</span>
        ) : (
          <span className="text-red-600 font-medium">Inactivo</span>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => navigate(`/puestos/${stall.id}`)}
          className="transition-all duration-200 hover:scale-105 hover:bg-primary/90 w-full max-w-[200px] cursor-pointer"
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SalesStall;
