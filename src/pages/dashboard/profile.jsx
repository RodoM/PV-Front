import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import UserForm from "@/components/dashboard/profile/user-form";
import { toast } from "sonner";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/user/data")
      .then((res) => {
        const { data } = res.data;
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar los datos del usuario");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !user) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return <UserForm userData={user} />;
}

export default Profile;
