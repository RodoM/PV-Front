import { useState } from "react";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { useNavigate, Link } from "react-router-dom";
import ForgotPasswordForm from "./forgot-password-form";

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().nonempty("Contraseña es obligatoria"),
});

export function SignInForm() {
  const { setToken, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setError(null);
    api
      .post("/auth/login", data)
      .then((response) => {
        const { token } = response.data.data;
        setToken(token);

        if (user && !user.negocioId) {
          navigate("/registrarse");
        } else if (user.role === "Owner" || user.role === "Admin") {
          navigate("/dashboard/resumen");
        } else {
          navigate("/puestos");
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al iniciar sesión";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>Ingresa tu mail y contraseña para iniciar sesión</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="justify-between">
                      Contraseña
                      <Button
                        type="button"
                        variant="link"
                        className="font-normal h-[14px]"
                        onClick={() => setForgotPassword(true)}
                      >
                        Olvidé mi contraseña
                      </Button>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                Iniciar sesión
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            ¿No tienes cuenta?{" "}
            <Link to="/registrarse" className="underline underline-offset-4">
              Registrarse
            </Link>
          </div>
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
          <ForgotPasswordForm closeModal={() => setForgotPassword(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
