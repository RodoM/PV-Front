import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import api from "@/lib/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import ForgotPasswordForm from "./forgot-password-form";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Email no válido"),
  newPassword: z.string().nonempty("Contraseña es obligatoria"),
});

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email ?? "",
      newPassword: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    api
      .post("/auth/reset-password", { ...data, token })
      .then(() => {
        toast.success("Contraseña actualizada correctamente. Redirigiendo...");
        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 3000);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al actualizar la contraseña";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
          <CardDescription>Ingrese su mail y nueva contraseña para restablecerla</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                Confirmar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={forgotPassword} onOpenChange={setForgotPassword}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Olvidé mi contraseña</DialogTitle>
            <DialogDescription>
              Ingrese su mail para recibir instrucciones para recuperar su contraseña
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onClose={() => setForgotPassword(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
