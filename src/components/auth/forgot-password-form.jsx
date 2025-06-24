import { useState } from "react";
import api from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Email no válido"),
});

function ForgotPasswordForm({ closeModal }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onClose = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = (data) => {
    setLoading(true);
    api
      .post("auth/forgot-password", data.email)
      .then(() => {
        toast.success("Se ha enviado un mail con las instrucciones para recuperar su contraseña");
        onClose();
      })
      .catch((error) => {
        const { message } = error.response?.data || "Error al enviar el mail";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
            Confirmar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
