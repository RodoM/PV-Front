import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import api from "@/lib/axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  ventaId: z.number(),
  email: z.string().email(),
});

function TicketForm({ ventaId, closeModal }) {
  const [loading, setLoading] = useState(false);

  const ticketForm = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ventaId: ventaId,
      email: "",
    },
  });

  const onTicketSubmit = (data) => {
    setLoading(true);

    api
      .post("/sale/send-ticket", data)
      .then(() => {
        toast.success("Ticket enviado correctamente");
        closeModal();
      })
      .catch((error) => {
        const { message } = error.response?.data || "Error al enviar el ticket";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...ticketForm}>
      <form className="space-y-4" onSubmit={ticketForm.handleSubmit(onTicketSubmit)}>
        <FormField
          name="email"
          control={ticketForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el mail del cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
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

export default TicketForm;
